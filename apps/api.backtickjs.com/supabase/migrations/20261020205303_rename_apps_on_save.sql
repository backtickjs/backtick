-- An app is created by its first `save_app`, and each save may rename it: the
-- function upserts its row, which needs `update`.
grant update on public.apps to service_role;
