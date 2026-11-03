// Who the sign-in page signed in with Supabase, from its session's access
// token, checked against Supabase's public keys: the user, their email, and how
// they signed in (`amr`). Never an assistant's token (`client_id`): an
// assistant can't start a phone's session.
import { createRemoteJWKSet, jwtVerify } from "jose";

const issuer = `${process.env.SUPABASE_URL}/auth/v1`;
const keys = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

export async function browserUser(
  authorization: string | undefined,
): Promise<{ id: string; email: string; methods: string[] } | undefined> {
  const token = /^Bearer (\S+)$/.exec(authorization ?? "")?.[1];
  if (token === undefined) {
    return undefined;
  }
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer,
      audience: "authenticated",
    });
    if (
      payload.client_id !== undefined ||
      typeof payload.session_id !== "string" ||
      typeof payload.sub !== "string"
    ) {
      return undefined;
    }
    const amr = Array.isArray(payload.amr) ? payload.amr : [];
    return {
      id: payload.sub,
      email:
        typeof payload.email === "string" ? payload.email.toLowerCase() : "",
      methods: amr.flatMap((entry) =>
        typeof entry === "object" && entry !== null && "method" in entry
          ? [String(entry.method)]
          : [],
      ),
    };
  } catch {
    return undefined;
  }
}
