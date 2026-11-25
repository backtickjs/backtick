-- Disconnecting an assistant, from the phone's Assistants screen: what
-- Supabase's `revokeGrant` does, which needs the user's own Supabase session,
-- for the home's server, which has only the user's id. Its consents are
-- revoked, so `assistants_of` no longer lists it, and its sessions end, their
-- refresh tokens with them (`on delete cascade`). By the name it registered
-- with, as `assistants_of` lists it.
create function public.disconnect_assistant(owner uuid, assistant text)
  returns void
  language sql
  security definer
  set search_path = ''
as $$
  update auth.oauth_consents
  set revoked_at = now()
  where user_id = owner
    and revoked_at is null
    and client_id in (
      select id from auth.oauth_clients where client_name = assistant
    );
  delete from auth.sessions
  where user_id = owner
    and oauth_client_id in (
      select id from auth.oauth_clients where client_name = assistant
    );
$$;
revoke execute on function public.disconnect_assistant(uuid, text) from public, anon, authenticated;
grant execute on function public.disconnect_assistant(uuid, text) to service_role;
