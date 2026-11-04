-- Each app's preview: its first screen, captured on its owner's phone when it
-- opens, at `<owner id>/<app id>.jpg`. Private, as it can show what the user
-- typed in the app: the phone writes it, and the home shows it through
-- signed URLs, both as the user, each only in their own folder.
insert into storage.buckets (id, name, public)
values ('previews', 'previews', false)
on conflict (id) do nothing;

create policy "Owners read their previews"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'previews'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Owners add their previews"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'previews'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- A new capture replaces the last (an upsert).
create policy "Owners replace their previews"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'previews'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'previews'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
