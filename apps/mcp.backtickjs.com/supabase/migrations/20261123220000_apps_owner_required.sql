-- Every app has an owner: apps are made only by a signed-in user.
alter table public.apps alter column owner_id set not null;
