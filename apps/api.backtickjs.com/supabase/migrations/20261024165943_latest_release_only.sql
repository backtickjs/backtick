-- Only an app's latest version keeps its release: an older one would no longer
-- match the phone's modules, and restoring a version saves its source again.
-- Each save clears its app's older releases.
grant update (compiled) on public.versions to service_role;

update public.versions as old
set compiled = null
where compiled is not null
  and exists (
    select from public.versions as newer
    where newer.app_id = old.app_id and newer.version > old.version
  );

-- The Vercel Sandbox snapshot that checked and compiled the version, which
-- pins its toolchain. Empty for versions saved before it was recorded.
alter table public.versions add column snapshot_id text;
