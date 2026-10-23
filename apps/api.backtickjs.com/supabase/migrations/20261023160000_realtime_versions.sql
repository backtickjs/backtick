-- The Backtick app hears each new version of the app it has open, and reloads
-- the screen. Realtime checks the row against "Owners read their apps'
-- versions", so a phone hears only its user's apps.
alter publication supabase_realtime add table public.versions;
