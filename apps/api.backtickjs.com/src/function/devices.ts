// Authorization codes, devices and used DPoP proofs, in Supabase, with the
// service role.
import { codeSeconds } from "./oauth.ts";
import { failed, supabase } from "./supabase.ts";

export async function saveCode(code: {
  hash: string;
  userId: string;
  codeChallenge: string;
  dpopJkt: string;
}): Promise<void> {
  const { error } = await supabase.from("authorization_codes").insert({
    code_hash: code.hash,
    user_id: code.userId,
    code_challenge: code.codeChallenge,
    dpop_jkt: code.dpopJkt,
    expires_at: new Date(Date.now() + codeSeconds * 1000).toISOString(),
  });
  if (error) {
    throw failed(error);
  }
}

// Redeems a code once, marked used in the same statement so two requests can't
// both have it. A code used before revokes the device it made: someone else
// has the code.
export async function redeemCode(
  hash: string,
): Promise<
  { userId: string; codeChallenge: string; dpopJkt: string } | undefined
> {
  const { data, error } = await supabase
    .from("authorization_codes")
    .update({ used_at: new Date().toISOString() })
    .eq("code_hash", hash)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .select("user_id, code_challenge, dpop_jkt")
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  if (data !== null) {
    return {
      userId: data.user_id,
      codeChallenge: data.code_challenge,
      dpopJkt: data.dpop_jkt,
    };
  }
  const used = await supabase
    .from("authorization_codes")
    .select("device_id")
    .eq("code_hash", hash)
    .not("used_at", "is", null)
    .maybeSingle();
  if (used.error) {
    throw failed(used.error);
  }
  if (used.data?.device_id) {
    await revokeDevice(used.data.device_id);
  }
  return undefined;
}

// A phone signed in: its refresh token's hash, bound to its key.
export async function addDevice(device: {
  codeHash: string;
  userId: string;
  refreshTokenHash: string;
  dpopJkt: string;
}): Promise<void> {
  const { data, error } = await supabase
    .from("devices")
    .insert({
      user_id: device.userId,
      refresh_token_hash: device.refreshTokenHash,
      dpop_jkt: device.dpopJkt,
    })
    .select("id")
    .single();
  if (error) {
    throw failed(error);
  }
  const code = await supabase
    .from("authorization_codes")
    .update({ device_id: data.id })
    .eq("code_hash", device.codeHash);
  if (code.error) {
    throw failed(code.error);
  }
}

// The device a refresh token belongs to, if it isn't revoked or idle.
export async function deviceOf(
  refreshTokenHash: string,
): Promise<{ id: string; userId: string; dpopJkt: string } | undefined> {
  const { data, error } = await supabase
    .from("devices")
    .select("id, user_id, dpop_jkt")
    .eq("refresh_token_hash", refreshTokenHash)
    .is("revoked_at", null)
    // Unused for 90 days, a device is signed out.
    .gt("last_used_at", new Date(Date.now() - 90 * 86_400_000).toISOString())
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  return data === null
    ? undefined
    : { id: data.id, userId: data.user_id, dpopJkt: data.dpop_jkt };
}

export async function touchDevice(id: string): Promise<void> {
  const { error } = await supabase
    .from("devices")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", id);
  if (error) {
    throw failed(error);
  }
}

export async function revokeDevice(id: string): Promise<void> {
  const { error } = await supabase
    .from("devices")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", id)
    .is("revoked_at", null);
  if (error) {
    throw failed(error);
  }
}

// Records a proof's `jti`; false if it was used before.
export async function firstUseOf(
  jtiHash: string,
  expiresAt: Date,
): Promise<boolean> {
  const { error } = await supabase
    .from("dpop_proofs")
    .insert({ jti_hash: jtiHash, expires_at: expiresAt.toISOString() });
  if (error?.code === "23505") {
    return false;
  }
  if (error) {
    throw failed(error);
  }
  return true;
}
