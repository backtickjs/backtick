// Who's asking, and the account's data. The phone's access token must be one
// auth.backtickjs.com issued for this origin (signed with the key it
// publishes, not expired: RFC 9068, section 4); the home then reads and
// changes the user's apps with its own key, always filtered by that user.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createRemoteJWKSet, jwtVerify } from "jose";

let keys: ReturnType<typeof createRemoteJWKSet> | undefined;

export async function userOf(
  authorization: string | undefined,
): Promise<string | undefined> {
  const token = /^Bearer (\S+)$/.exec(authorization ?? "")?.[1];
  if (token === undefined) {
    return undefined;
  }
  const issuer = required("BACKTICK_AUTH_ORIGIN");
  keys ??= createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer,
      audience: required("BACKTICK_HOME_ORIGIN"),
      typ: "at+jwt",
      algorithms: ["ES256"],
    });
    return typeof payload.sub === "string" ? payload.sub : undefined;
  } catch {
    return undefined;
  }
}

let client: SupabaseClient | undefined;

export function supabase(): SupabaseClient {
  client ??= createClient(
    required("SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  return client;
}

// Supabase's error isn't an `Error`, so its message would be lost.
export function failed(error: { message: string }): Error {
  return new Error(`Supabase: ${error.message}`, { cause: error });
}

function required(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Set ${name}.`);
  }
  return value;
}
