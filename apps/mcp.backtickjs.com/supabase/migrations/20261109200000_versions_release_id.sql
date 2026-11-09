-- Each version's release has its own id, random and never reused. The
-- Worker keys a release's isolate and cached code by it, not by app id and
-- version: an app id freed by an erase can be claimed again, and its
-- versions start back at 1, so <id>@<version> could bring back the old
-- owner's code. Existing versions get one each.
alter table public.versions
  add column release_id uuid not null default gen_random_uuid();

create unique index versions_release_id on public.versions (release_id);
