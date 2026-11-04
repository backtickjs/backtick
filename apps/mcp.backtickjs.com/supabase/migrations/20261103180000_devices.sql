-- The Backtick app's sessions: OAuth 2.1 with PKCE and
-- DPoP. Only the function reads and writes them, with the service role.

-- An authorization code: one use, two minutes, bound to the PKCE challenge and
-- the app's DPoP key. Redeemed twice, the device it made is revoked (OAuth 2.1,
-- section 4.1.3). Only the code's hash is kept.
create table public.authorization_codes (
  code_hash text primary key,
  user_id uuid not null references auth.users on delete cascade,
  code_challenge text not null,
  dpop_jkt text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  device_id uuid
);

-- A phone signed in: its refresh token (hashed), bound to its key's thumbprint,
-- so only that phone can use it. Revoked, it gets no new access tokens.
create table public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  refresh_token_hash text not null unique,
  dpop_jkt text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index devices_user_id on public.devices (user_id);

-- DPoP proofs already used, so none is replayed (RFC 9449, section 11.1),
-- kept as long as their nonce is good.
create table public.dpop_proofs (
  jti_hash text primary key,
  expires_at timestamptz not null
);

alter table public.authorization_codes enable row level security;
alter table public.devices enable row level security;
alter table public.dpop_proofs enable row level security;
grant select, insert, update on public.authorization_codes to service_role;
grant select, insert, update on public.devices to service_role;
grant insert on public.dpop_proofs to service_role;

select cron.schedule(
  'delete-old-authorization-codes',
  '15 4 * * *',
  $$delete from public.authorization_codes where expires_at < now() - interval '1 day'$$
);
select cron.schedule(
  'delete-old-dpop-proofs',
  '*/15 * * * *',
  $$delete from public.dpop_proofs where expires_at < now()$$
);
