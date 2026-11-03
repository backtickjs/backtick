// Who the user is, from Supabase Auth, asked server side: Apple or Google
// through Supabase's own OAuth with PKCE, or an email and password. The
// Supabase session that proves it is ended at once; it never reaches the
// browser or the phone.
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { required } from "./supabase.ts";

export type Provider = "apple" | "google";

const auth = () => `${required("SUPABASE_URL")}/auth/v1`;

// Supabase counts sign-ins per IP. Asked from this server, every user would
// share its IP, so each request names the user's own (`Sb-Forwarded-For`),
// which Supabase honours only with a secret key and the project's IP
// forwarding on.
function headers(ip: string | undefined): Record<string, string> {
  return {
    apikey: required("SUPABASE_SERVICE_ROLE_KEY"),
    ...(ip === undefined ? {} : { "sb-forwarded-for": ip }),
  };
}

// Where to send the browser to sign in with `provider`, returning to
// `callback` with a code only `verifier` can redeem.
export function providerUrl(
  provider: Provider,
  callback: string,
  verifier: string,
): string {
  const url = new URL(`${auth()}/authorize`);
  url.search = new URLSearchParams({
    provider,
    redirect_to: callback,
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "s256",
  }).toString();
  return url.href;
}

// The user behind a provider's code, or nothing. `ip` is the user's.
export function userFromCode(
  code: string,
  verifier: string,
  ip: string | undefined,
): Promise<string | undefined> {
  return userFromSession(
    "pkce",
    { auth_code: code, code_verifier: verifier },
    ip,
  );
}

export function userFromPassword(
  email: string,
  password: string,
  ip: string | undefined,
): Promise<string | undefined> {
  return userFromSession("password", { email, password }, ip);
}

async function userFromSession(
  grant: "pkce" | "password",
  body: Record<string, string>,
  ip: string | undefined,
): Promise<string | undefined> {
  const answer = await fetch(`${auth()}/token?grant_type=${grant}`, {
    method: "POST",
    headers: { ...headers(ip), "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!answer.ok) {
    return undefined;
  }
  const session = (await answer.json()) as {
    access_token?: string;
    user?: { id?: string };
  };
  // Only needed to learn who signed in: ended on Supabase's side now.
  if (session.access_token !== undefined) {
    await fetch(`${auth()}/logout?scope=local`, {
      method: "POST",
      headers: {
        ...headers(ip),
        authorization: `Bearer ${session.access_token}`,
      },
    }).catch(() => {});
  }
  return session.user?.id;
}

// What the browser carries between the provider's redirect and its return:
// the app's request and the Supabase PKCE verifier, signed so it can't be
// changed, and good for ten minutes. In an HttpOnly cookie on this host only.
export const pendingCookie = "__Host-backtick-sign-in";
export const pendingSeconds = 10 * 60;

export type Pending = {
  request: Record<string, string>;
  verifier: string;
};

export function sealPending(pending: Pending, secret: string): string {
  const body = Buffer.from(
    JSON.stringify({ ...pending, exp: Date.now() + pendingSeconds * 1000 }),
  ).toString("base64url");
  return `${body}.${mac(secret, body)}`;
}

export function openPending(
  value: string | undefined,
  secret: string,
): Pending | undefined {
  const [body, tag] = (value ?? "").split(".");
  if (body === undefined || tag === undefined) {
    return undefined;
  }
  const expected = Buffer.from(mac(secret, body));
  const given = Buffer.from(tag);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return undefined;
  }
  try {
    const pending = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as Pending & { exp: number };
    return pending.exp > Date.now()
      ? { request: pending.request, verifier: pending.verifier }
      : undefined;
  } catch {
    return undefined;
  }
}

export function newVerifier(): string {
  return randomBytes(32).toString("base64url");
}

function mac(secret: string, body: string): string {
  return createHmac("sha256", `sign-in:${secret}`)
    .update(body)
    .digest("base64url");
}
