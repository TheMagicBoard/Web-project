import { RealtimeChannel, SupabaseClient, User } from "@supabase/supabase-js";

export interface Room {
    id: string,
    owner: string,
    name: string,
    created_at: string,
}

class BroadClient {
    supabase: SupabaseClient;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async getAllRooms(): Promise<Room[]> {
        let user = this.userOrError();
        let response = await this.supabase.from("rooms").select("id, owner, name, created_at").eq("owner", user.id);
        if (response.error) {
            throw response.error;
        }
        return response.data;
    }

    /// Find the room and return the room infomation.
    async findRoomById(id: string): Promise<Room | null> {
        let rooms = await this.supabase.rpc("find_room_by_id", {target_id: id});
        if (rooms.error) {
            throw rooms.error;
        } else {
            if (rooms.count && rooms.count > 0) {
                return rooms.body[0];
            } else {
                return null;
            }
        }
    }

    /// Return user or throw an error.
    userOrError(): User {
        let user = this.supabase.auth.user();
        if (user) {
            return user;
        } else {
            throw new Error("login required");
        }
    }

    /// Join the room as current user.
    async joinRoomById(id: string): Promise<Room | null> {
        let room = await this.findRoomById(id);
        if (room) {
            let user = this.userOrError();
            let q = await this.supabase.from("room_joint").insert({
                room_id: room.id,
                user_id: user.id,
            });
            if (q.error) {
                throw q.error;
            }
            return null;
        } else {
            return null;
        }
    }

    /// Check if current user joint to the room.
    /// Return false if the user joint the room or the room not exists.
    async isJointRoomById(id: string): Promise<boolean> {
        let user = this.userOrError();
        let q = await this.supabase.from("room_joint").select("*").eq("room_id", id).eq("user_id", user.id);
        if (q.error) {
            throw q.error;
        } else {
            if (q.count && q.count > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /// Send a message to room message queue with open a channel.
    /// It is recommended to use the channel to push message (see `openRoomMessageQueueChannel`).
    async sendMessageTo(room_id: string, message: object): Promise<void> {
        let q = await this.supabase.from("room_message_queue").insert({
            room: room_id,
            message: message,
        });
        if (q.error) {
            throw q.error;
        }
    }

    /// Open a room message queue channel using supabse realtime.
    /// Your server must correctly configured: https://github.com/supabase/realtime#server .
    /// And you must use `setAuth` to set token on the realtime client manually
    /// to ensure you have permission to the rows: https://github.com/supabase/realtime#realtime-rls .
    async openRoomMessageQueueChannel(room_id: string): Promise<RealtimeChannel> {
        let room = await this.findRoomById(room_id);
        if (!room) {
            throw Error("Room not found");
        }
        return this.supabase.channel("realtime:public:room_message_queue:room=eq."+room.id, {
            selfBroadcast: false,
        });
    }

    async createRoom(name: string): Promise<Room> {
        let user = this.userOrError();
        let {data, error} = await this.supabase.from("rooms").insert({
            name: name,
            owner: user.id,
        });
        if (error){
            throw error;
        }
        return (data as Room[])[0];
    }
}

export default BroadClient;
