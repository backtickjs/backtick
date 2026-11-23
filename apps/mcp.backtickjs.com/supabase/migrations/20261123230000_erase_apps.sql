-- Erasing, for app.backtickjs.com's daily cron (`eraseDeletedApps`), once it
-- has removed their previews: a function rather than a delete grant, so a bug
-- in the cron can't erase an app deleted under 30 days ago, or a live one.
-- Their versions go with them (`on delete cascade`). How many it erased.
create function public.erase_apps(ids uuid[]) returns integer
  language sql
  security definer
  set search_path = ''
as $$
  with erased as (
    delete from public.apps
    where id = any(ids) and deleted_at < now() - interval '30 days'
    returning 1
  )
  select count(*)::integer from erased;
$$;
revoke execute on function public.erase_apps(uuid[]) from public, anon, authenticated;
grant execute on function public.erase_apps(uuid[]) to service_role;
