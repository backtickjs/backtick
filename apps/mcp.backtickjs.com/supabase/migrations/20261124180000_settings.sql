-- What each user chooses for themselves, one row per user, written the first
-- time they choose: for now, the assistant New and Edit open on the phone
-- (null: none chosen, so the latest connected). An assistant by its id, which
-- the home's server checks, so a new assistant needs no migration. Gone with
-- the user. The home's server only, with the service role: no policies.
create table public.settings (
  user_id uuid primary key references auth.users on delete cascade,
  assistant text,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;
