-- The home's server reads the user's settings and writes them, an upsert.
grant select, insert, update on public.settings to service_role;
