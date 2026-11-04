-- Whose check it was. The monthly build cap counts these.
alter table public.checks
  add column owner_id uuid references auth.users on delete cascade;
