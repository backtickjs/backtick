-- The Backtick app reads its user's apps and their versions directly, signed in
-- as that user: each user sees only their own.
grant select on public.apps, public.versions to authenticated;

create policy "Owners read their apps"
  on public.apps for select to authenticated
  using (owner_id = (select auth.uid()));

create policy "Owners read their apps' versions"
  on public.versions for select to authenticated
  using (
    exists (
      select 1 from public.apps
      where apps.id = versions.app_id and apps.owner_id = (select auth.uid())
    )
  );
