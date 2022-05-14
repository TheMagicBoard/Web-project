-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.get_room_by_id(
	room_id uuid)
    RETURNS SETOF rooms 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
select id, owner, name, created_at from rooms where id = room_id;
$BODY$;

ALTER FUNCTION public.get_room_by_id(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.get_room_by_id(uuid) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_room_by_id(uuid) TO anon;

GRANT EXECUTE ON FUNCTION public.get_room_by_id(uuid) TO authenticated;

GRANT EXECUTE ON FUNCTION public.get_room_by_id(uuid) TO postgres;

GRANT EXECUTE ON FUNCTION public.get_room_by_id(uuid) TO service_role;

CREATE TABLE IF NOT EXISTS public.rooms
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    owner uuid NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT rooms_pkey PRIMARY KEY (id),
    CONSTRAINT rooms_owner_fkey FOREIGN KEY (owner)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms
    OWNER to postgres;

ALTER TABLE IF EXISTS public.rooms
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.rooms TO anon;

GRANT ALL ON TABLE public.rooms TO authenticated;

GRANT ALL ON TABLE public.rooms TO postgres;

GRANT ALL ON TABLE public.rooms TO service_role;
CREATE POLICY "users can see and operate rooms they own"
    ON public.rooms
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.uid() = owner));