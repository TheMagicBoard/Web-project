-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.room_opts
(
    room_id uuid NOT NULL,
    size_x integer,
    size_y integer,
    CONSTRAINT room_opts_pkey PRIMARY KEY (room_id),
    CONSTRAINT room_opts_room_id_fkey FOREIGN KEY (room_id)
        REFERENCES public.rooms (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.room_opts
    OWNER to postgres;

ALTER TABLE IF EXISTS public.room_opts
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.room_opts TO anon;

GRANT ALL ON TABLE public.room_opts TO authenticated;

GRANT ALL ON TABLE public.room_opts TO postgres;

GRANT ALL ON TABLE public.room_opts TO service_role;
CREATE POLICY "Only the owner can delete the room options."
    ON public.room_opts
    AS PERMISSIVE
    FOR DELETE
    TO anon, authenticated
    USING ((EXISTS ( SELECT rooms.id,
    rooms.owner,
    rooms.name,
    rooms.created_at
   FROM rooms
  WHERE ((rooms.owner = auth.uid()) AND (rooms.id = room_opts.room_id)))));

CREATE POLICY "Users can change the options of the room they parted"
    ON public.room_opts
    AS PERMISSIVE
    FOR UPDATE
    TO anon, authenticated
    USING ((EXISTS ( SELECT room_joint.room_id,
    room_joint.user_id,
    room_joint.created_at
   FROM room_joint
  WHERE ((room_joint.room_id = room_opts.room_id) AND (room_joint.user_id = auth.uid())))));

CREATE POLICY "Users can insert options for the room they parted"
    ON public.room_opts
    AS PERMISSIVE
    FOR INSERT
    TO anon, authenticated
    WITH CHECK ((EXISTS ( SELECT room_joint.room_id,
    room_joint.user_id,
    room_joint.created_at
   FROM room_joint
  WHERE ((room_joint.room_id = room_opts.room_id) AND (room_joint.user_id = auth.uid())))));

CREATE POLICY "Users can query the options of the room they parted"
    ON public.room_opts
    AS PERMISSIVE
    FOR SELECT
    TO anon, authenticated
    USING ((EXISTS ( SELECT room_joint.room_id,
    room_joint.user_id,
    room_joint.created_at
   FROM room_joint
  WHERE ((room_joint.room_id = room_opts.room_id) AND (room_joint.user_id = auth.uid())))));