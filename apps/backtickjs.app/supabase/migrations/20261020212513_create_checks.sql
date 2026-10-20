-- One row per `save_app`: what its check found and how long it took. A check
-- that passed names the version it became, whose row has the source; one that
-- failed keeps the source it checked, to reproduce it.
create table public.checks (
  id uuid primary key default gen_random_uuid(),
  -- Not a foreign key: an app that has never passed has no `apps` row.
  app_id uuid not null,
  version integer,
  source text,
  errors text[] not null default '{}',
  warnings text[] not null default '{}',
  duration_ms integer not null,
  created_at timestamptz not null default now(),
  check ((version is null) = (source is not null))
);

create index checks_app_id_created_at on public.checks (app_id, created_at);

alter table public.checks enable row level security;
grant select, insert on public.checks to service_role;

-- A failed check is for learning and debugging, and holds code the user never
-- saved: it's deleted after 30 days, nightly.
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule(
  'delete-old-failed-checks',
  '0 4 * * *',
  $$delete from public.checks
    where version is null and created_at < now() - interval '30 days'$$
);
