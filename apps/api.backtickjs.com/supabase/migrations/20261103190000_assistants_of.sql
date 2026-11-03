-- The assistants a user connected, for Backtick's home, which reads with the
-- service role for the user its access token names, so `auth.uid()` isn't
-- theirs: the same as assistants(), for a given user, to the service role
-- only.
create function public.assistants_of(owner uuid)
  returns table (name text, connected_at timestamptz)
  language sql
  stable
  security definer
  set search_path = ''
as $$
  select clients.client_name, max(consents.granted_at)
  from auth.oauth_consents as consents
  join auth.oauth_clients as clients on clients.id = consents.client_id
  where consents.user_id = owner
    and consents.revoked_at is null
    and clients.deleted_at is null
  group by clients.client_name;
$$;
revoke execute on function public.assistants_of(uuid) from public, anon, authenticated;
grant execute on function public.assistants_of(uuid) to service_role;
