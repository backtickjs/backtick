-- An app, made by `create_app`. Its saved code is in `versions`: an app with
-- none is at version 0, still the starter.
create table public.apps (
  id uuid primary key default gen_random_uuid(),
  -- Empty until users sign in.
  owner_id uuid references auth.users on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

-- One row per clean `update_app`, numbered from 1, never edited.
create table public.versions (
  app_id uuid not null references public.apps on delete cascade,
  version integer not null check (version > 0),
  source text not null,
  created_at timestamptz not null default now(),
  primary key (app_id, version)
);

-- Only the function reads and writes them, with the service role. With no
-- policies, the phone's roles see nothing until one is added.
alter table public.apps enable row level security;
alter table public.versions enable row level security;
grant select, insert on public.apps, public.versions to service_role;
