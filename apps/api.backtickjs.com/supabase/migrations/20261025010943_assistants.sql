-- The assistants a user connected Backtick to: Claude or ChatGPT register as
-- OAuth clients when the user adds the connector, and the user's approval is
-- a consent. Supabase keeps both in `auth`, which the phone can't read; this
-- answers for the calling user only. An assistant can stop using the
-- connector without revoking it, so this says "was connected", not "is on".
create function public.assistants()
  returns table (name text, connected_at timestamptz)
  language sql
  stable
  security definer
  set search_path = ''
as $$
  select clients.client_name, max(consents.granted_at)
  from auth.oauth_consents as consents
  join auth.oauth_clients as clients on clients.id = consents.client_id
  where consents.user_id = (select auth.uid())
    and consents.revoked_at is null
    and clients.deleted_at is null
  group by clients.client_name;
$$;
revoke execute on function public.assistants() from public, anon;
grant execute on function public.assistants() to authenticated;
