// Who the user is, from Supabase Auth, asked server side: Apple or Google
// through Supabase's own OAuth with PKCE, or a code sent to an email. The
// Supabase session that proves it is ended at once; it never reaches the
// browser or the phone.
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { required } from "./supabase.ts";

// The sign-in providers, enabled in Supabase. The only list: the app and its
// home name a provider, and anything else gets the sign-in page.
export const providers = ["apple", "google"] as const;
export type Provider = (typeof providers)[number];

export const isProvider = (name: string | undefined): name is Provider =>
  (providers as readonly (string | undefined)[]).includes(name);

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

// Whether Supabase has `provider` on, from its public settings, so a provider
// that's off never shows the user Supabase's raw error. Kept a minute; a
// failure to ask isn't kept.
let settings: { external: Record<string, boolean>; until: number } | undefined;

export async function providerEnabled(provider: Provider): Promise<boolean> {
  if (settings === undefined || settings.until < Date.now()) {
    const answer = await fetch(`${auth()}/settings`, {
      headers: { apikey: required("SUPABASE_PUBLISHABLE_KEY") },
    }).catch(() => undefined);
    if (answer?.ok !== true) {
      return false;
    }
    const { external } = (await answer.json()) as {
      external: Record<string, boolean>;
    };
    settings = { external, until: Date.now() + 60_000 };
  }
  return settings.external[provider] === true;
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

// Emails a six-digit code to `email`, making the account if it's new. False
// if Supabase wouldn't (its limits, per user).
export async function sendCode(
  email: string,
  ip: string | undefined,
): Promise<boolean> {
  const answer = await fetch(`${auth()}/otp`, {
    method: "POST",
    headers: { ...headers(ip), "content-type": "application/json" },
    body: JSON.stringify({ email, create_user: true }),
  }).catch(() => undefined);
  return answer?.ok === true;
}

// The user behind an emailed code, or nothing.
export function userFromEmailCode(
  email: string,
  code: string,
  ip: string | undefined,
): Promise<string | undefined> {
  return userFromSession("verify", { type: "email", email, token: code }, ip);
}

// The user behind `email`, sending nothing: for the review account, whose
// fixed code this server checks itself. Asked with the secret key (Supabase's
// admin API); the link it makes is never used.
export async function userOfEmail(email: string): Promise<string | undefined> {
  const answer = await fetch(`${auth()}/admin/generate_link`, {
    method: "POST",
    headers: { ...headers(undefined), "content-type": "application/json" },
    body: JSON.stringify({ type: "magiclink", email }),
  }).catch(() => undefined);
  if (answer?.ok !== true) {
    return undefined;
  }
  return ((await answer.json()) as { id?: string }).id;
}

async function userFromSession(
  grant: "pkce" | "verify",
  body: Record<string, string>,
  ip: string | undefined,
): Promise<string | undefined> {
  const path = grant === "verify" ? "verify" : `token?grant_type=${grant}`;
  const answer = await fetch(`${auth()}/${path}`, {
    method: "POST",
    headers: { ...headers(ip), "content-type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => undefined);
  if (answer?.ok !== true) {
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

// What the browser carries between steps: the app's request, and the
// Supabase PKCE verifier (a provider's redirect and return) or the email a
// code went to. Signed so it can't be changed, and good for ten minutes, as
// long as a code. In an HttpOnly cookie on this host only.
export const pendingCookie = "__Host-backtick-sign-in";
export const pendingSeconds = 10 * 60;

export type Pending = {
  request: Record<string, string>;
} & ({ verifier: string } | { email: string });

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
    if (pending.exp <= Date.now()) {
      return undefined;
    }
    const { exp: _, ...rest } = pending;
    return rest;
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
