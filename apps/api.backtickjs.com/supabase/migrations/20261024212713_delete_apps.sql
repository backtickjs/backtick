-- An app its owner deletes: hidden at once, its link gone, and erased after
-- 30 days, until when it can be restored by clearing `deleted_at`.
alter table public.apps add column deleted_at timestamptz;

-- The phone reads as the user, so a deleted app leaves the home list and its
-- host answers 404 with no query changing.
drop policy "Owners read their apps" on public.apps;
create policy "Owners read their apps"
  on public.apps for select to authenticated
  using (owner_id = (select auth.uid()) and deleted_at is null);

drop policy "Owners read their apps' versions" on public.versions;
create policy "Owners read their apps' versions"
  on public.versions for select to authenticated
  using (
    exists (
      select 1 from public.apps
      where apps.id = versions.app_id
        and apps.owner_id = (select auth.uid())
        and apps.deleted_at is null
    )
  );

-- Deleting, for the phone: a function rather than an update policy, since the
-- deleted row no longer passes the read policy above, which Postgres would
-- refuse. True if the user's app was deleted.
create function public.delete_app(app uuid) returns boolean
  language sql
  security definer
  set search_path = ''
as $$
  with deleted as (
    update public.apps
    set deleted_at = now()
    where id = app and owner_id = (select auth.uid()) and deleted_at is null
    returning 1
  )
  select exists (select 1 from deleted);
$$;
revoke execute on function public.delete_app(uuid) from public, anon;
grant execute on function public.delete_app(uuid) to authenticated;

select cron.schedule(
  'erase-deleted-apps',
  '30 4 * * *',
  $$delete from public.apps where deleted_at < now() - interval '30 days'$$
);

-- Each app's screenshot, public as its card shows it: for now the one
-- placeholder, `placeholder.png`, until saves render them.
insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', true)
on conflict (id) do nothing;
