-- Replaced by `packages` (the previous migration), which the service writes
-- now: a snapshot's id named the machine, not what the app was built with.
alter table public.versions drop column snapshot_id;
