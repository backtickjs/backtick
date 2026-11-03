// auth.backtickjs.com's Vercel Function: the Backtick app's authorization
// server, OAuth 2.1 for a native app (RFC 8252) with PKCE (RFC 7636), a
// DPoP-bound refresh token (RFC 9449), access tokens for one origin each
// (RFC 8707, RFC 9068) signed with its own key, and revocation (RFC 7009).
// The app is its one client. Backtick's hosts check its tokens against
// /.well-known/jwks.json; they never reach Supabase.
import { type Context, Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { JWK } from "jose";
import {
  addDevice,
  deviceOf,
  firstUseOf,
  redeemCode,
  revokeDevice,
  saveCode,
  touchDevice,
} from "./function/devices.ts";
import {
  authorizeError,
  client,
  hashOf,
  issuer,
  mintAccessToken,
  newNonce,
  newSecret,
  nonceSeconds,
  originOf,
  type Origins,
  pkceMatches,
  publicJwk,
  single,
  verifyProof,
} from "./function/oauth.ts";
import { required } from "./function/supabase.ts";
import {
  newVerifier,
  openPending,
  pendingCookie,
  pendingSeconds,
  type Provider,
  isProvider,
  providers,
  providerUrl,
  sealPending,
  userFromCode,
  userFromPassword,
} from "./function/supabaseAuth.ts";
// Compiled by `tspc` first; its script is built into public/ (scripts/page.ts).
import { signInHtml } from "../web/dist/html.js";

const app = new Hono();

// The keys Backtick's hosts check access tokens with (RFC 7517).
app.get("/.well-known/jwks.json", (c) =>
  c.json({ keys: [publicJwk(signingKey())] }, 200, {
    "cache-control": "public, max-age=300",
  }),
);

// This server's metadata (RFC 8414), with `iss` in authorization responses
// (RFC 9207) and DPoP (RFC 9449).
app.get("/.well-known/oauth-authorization-server", (c) =>
  c.json(
    {
      issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      revocation_endpoint: `${issuer}/revoke`,
      jwks_uri: `${issuer}/.well-known/jwks.json`,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code", "refresh_token"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
      dpop_signing_alg_values_supported: ["ES256"],
      authorization_response_iss_parameter_supported: true,
    },
    200,
    { "cache-control": "public, max-age=3600" },
  ),
);

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

// The sign-in page's own policy: its script from this origin only, its form
// only to this server (and the app's callback it redirects to), and no
// framing by another site.
const pageHeaders = {
  "cache-control": "no-store",
  "content-security-policy": [
    "default-src 'none'",
    "script-src 'self'",
    "style-src 'unsafe-inline'",
    "img-src 'self'",
    `form-action 'self' ${new URL(client.redirectUri).origin}`,
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join("; "),
  "x-frame-options": "DENY",
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
};

// The sign-in page, which the app opens in the system's sign-in browser with
// an OAuth authorization request (PKCE, and `dpop_jkt`, its key's thumbprint).
// Its buttons and form come back here with the same request. With `provider`
// (a hint like Auth0's `connection`), the app already chose: straight to that
// provider, no page. A provider this server doesn't know gets the page.
app.get("/authorize", async (c) => {
  const request = requestOf(c.req.queries());
  const error =
    request === undefined
      ? "A parameter appears twice."
      : authorizeError(authorizeParams(request));
  if (error !== undefined) {
    return c.text(error, 400, noStore);
  }
  const provider = c.req.query("provider");
  if (!isProvider(provider)) {
    return c.html(signInHtml, 200, pageHeaders);
  }
  return c.redirect(
    `/authorize/${provider}?${new URLSearchParams(request!)}`,
    302,
  );
});

// Apple or Google, through Supabase's own sign-in, returning to
// /authorize/callback. The request and the Supabase PKCE verifier wait in a
// signed cookie on this host meanwhile.
app.get(`/authorize/:provider{${providers.join("|")}}`, (c) => {
  const request = requestOf(c.req.queries());
  if (request === undefined || authorizeError(authorizeParams(request))) {
    return c.text("Open sign-in from the Backtick app.", 400, noStore);
  }
  const verifier = newVerifier();
  setCookie(
    c,
    pendingCookie,
    sealPending({ request, verifier }, cookieSecret()),
    {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "Lax",
      maxAge: pendingSeconds,
    },
  );
  return c.redirect(
    providerUrl(
      c.req.param("provider") as Provider,
      `${issuer}/authorize/callback`,
      verifier,
    ),
    302,
  );
});

app.get("/authorize/callback", async (c) => {
  const pending = openPending(getCookie(c, pendingCookie), cookieSecret());
  deleteCookie(c, pendingCookie, { path: "/", secure: true });
  const code = c.req.query("code");
  if (pending === undefined || code === undefined) {
    return c.text("Open sign-in from the Backtick app.", 400, noStore);
  }
  const user = await userFromCode(code, pending.verifier, clientIp(c));
  return user === undefined
    ? backToSignIn(c, pending.request, "sign-in")
    : signedIn(c, pending.request, user);
});

// Email and password, for App Review's accounts only: anyone else signs in
// with Apple or Google, so a password set by someone else on an account (an
// assistant's token can change it) opens no phone session.
app.post("/authorize/password", async (c) => {
  const form = await c.req.parseBody({ all: true }).catch(() => ({}));
  const fields = single(form);
  const request = fields === undefined ? undefined : requestOf(fields);
  if (request === undefined || authorizeError(authorizeParams(request))) {
    return c.text("Open sign-in from the Backtick app.", 400, noStore);
  }
  const email = (fields!.email ?? "").trim().toLowerCase();
  if (!passwordAccounts().includes(email)) {
    return backToSignIn(c, request, "password-account");
  }
  const user = await userFromPassword(
    email,
    fields!.password ?? "",
    clientIp(c),
  );
  return user === undefined
    ? backToSignIn(c, request, "password")
    : signedIn(c, request, user);
});

// Signed in: an authorization code for the app that asked, sent to the app's
// own redirect URI with the request's `state` and this server as `iss` (RFC
// 9207).
async function signedIn(
  c: Context,
  request: Record<string, string>,
  user: string,
): Promise<Response> {
  const code = newSecret();
  await saveCode({
    hash: hashOf(code),
    userId: user,
    codeChallenge: request.code_challenge!,
    dpopJkt: request.dpop_jkt!,
  });
  const redirect = new URL(client.redirectUri);
  redirect.search = new URLSearchParams({
    code,
    state: request.state!,
    iss: issuer,
  }).toString();
  return c.redirect(redirect.href, 303);
}

// The sign-in page again, with why.
function backToSignIn(
  c: Context,
  request: Record<string, string>,
  error: "sign-in" | "password" | "password-account",
): Response {
  return c.redirect(
    `/authorize?${new URLSearchParams({ ...request, error })}`,
    303,
  );
}

// The user's IP, as Vercel's edge writes it: it replaces any
// `x-forwarded-for` the client sent, so it can't be made up.
function clientIp(c: Context): string | undefined {
  return c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

// The authorization request's own parameters, each once (OAuth 2.1, section
// 3.1), from a query or a form.
function requestOf(
  params: Record<string, string | string[]>,
): Record<string, string> | undefined {
  const request: Record<string, string> = {};
  for (const name of [
    "response_type",
    "client_id",
    "redirect_uri",
    "code_challenge",
    "code_challenge_method",
    "state",
    "dpop_jkt",
  ]) {
    const value = params[name];
    if (Array.isArray(value) && value.length > 1) {
      return undefined;
    }
    const one = Array.isArray(value) ? value[0] : value;
    if (one !== undefined) {
      request[name] = one;
    }
  }
  return request;
}

// The token endpoint, for the Backtick app only, every request with a DPoP
// proof by its key and a `resource`: the origin the access token is for.
//   authorization_code: the code, its PKCE verifier and the key it was bound
//     to give the phone its refresh token, bound to that key.
//   refresh_token: an access token for `resource`, for five minutes.
app.post("/token", async (c) => {
  const form = single(await c.req.parseBody({ all: true }).catch(() => ({})));
  const nonceSecret = required("BACKTICK_DPOP_NONCE_SECRET");
  const nonce = { "dpop-nonce": newNonce(nonceSecret), ...noStore };
  // `htu` is the public URL, not the one behind Vercel's proxy.
  const proof = await verifyProof(c.req.header("dpop"), {
    method: "POST",
    url: `${issuer}/token`,
    nonceSecret,
  });
  if ("error" in proof) {
    return oauthError(c, proof.error, nonce);
  }
  if (form === undefined) {
    return oauthError(c, "invalid_request", nonce);
  }
  if (form.client_id !== client.id) {
    return oauthError(c, "invalid_client", nonce);
  }
  const origin =
    form.resource === undefined
      ? undefined
      : originOf(form.resource, origins());
  if (origin === undefined) {
    return oauthError(c, "invalid_target", nonce);
  }
  // Last of the checks before any grant, so a request refused for anything
  // else costs no write.
  if (!(await firstUseOf(hashOf(proof.jti), proofExpiry()))) {
    return oauthError(c, "invalid_dpop_proof", nonce);
  }

  let device: { userId: string };
  let refreshToken: string | undefined;
  if (form.grant_type === "authorization_code") {
    if (
      typeof form.code !== "string" ||
      typeof form.code_verifier !== "string" ||
      form.redirect_uri !== client.redirectUri
    ) {
      return oauthError(c, "invalid_request", nonce);
    }
    const codeHash = hashOf(form.code);
    const code = await redeemCode(codeHash);
    if (
      code === undefined ||
      code.dpopJkt !== proof.jkt ||
      !pkceMatches(form.code_verifier, code.codeChallenge)
    ) {
      return oauthError(c, "invalid_grant", nonce);
    }
    refreshToken = newSecret();
    await addDevice({
      codeHash,
      userId: code.userId,
      refreshTokenHash: hashOf(refreshToken),
      dpopJkt: proof.jkt,
    });
    device = code;
  } else if (form.grant_type === "refresh_token") {
    const found =
      typeof form.refresh_token === "string"
        ? await deviceOf(hashOf(form.refresh_token))
        : undefined;
    // Bound to its key: a refresh token used with another key is refused.
    if (found === undefined || found.dpopJkt !== proof.jkt) {
      return oauthError(c, "invalid_grant", nonce);
    }
    await touchDevice(found.id);
    device = found;
  } else {
    return oauthError(c, "unsupported_grant_type", nonce);
  }

  const access = await mintAccessToken(signingKey(), {
    user: device.userId,
    origin,
  });
  return c.json(
    {
      access_token: access.token,
      token_type: "Bearer",
      expires_in: access.expiresIn,
      ...(refreshToken === undefined ? {} : { refresh_token: refreshToken }),
      // The origins the app gets tokens for, as patterns, so the native
      // module never carries a list of its own.
      backtick_origins: [origins().home, `https://*.${origins().appsDomain}`],
    },
    200,
    nonce,
  );
});

// Sign out (RFC 7009): the refresh token stops working, with a DPoP proof by
// its key, so only the phone holding both can. Any access token it has expires
// within five minutes.
app.post("/revoke", async (c) => {
  const form = single(await c.req.parseBody({ all: true }).catch(() => ({})));
  const nonceSecret = required("BACKTICK_DPOP_NONCE_SECRET");
  const nonce = { "dpop-nonce": newNonce(nonceSecret), ...noStore };
  const proof = await verifyProof(c.req.header("dpop"), {
    method: "POST",
    url: `${issuer}/revoke`,
    nonceSecret,
  });
  if ("error" in proof) {
    return oauthError(c, proof.error, nonce);
  }
  if (form === undefined) {
    return oauthError(c, "invalid_request", nonce);
  }
  if (form.client_id !== client.id) {
    return oauthError(c, "invalid_client", nonce);
  }
  if (!(await firstUseOf(hashOf(proof.jti), proofExpiry()))) {
    return oauthError(c, "invalid_dpop_proof", nonce);
  }
  const device =
    typeof form.token === "string"
      ? await deviceOf(hashOf(form.token))
      : undefined;
  if (device !== undefined && device.dpopJkt === proof.jkt) {
    await revokeDevice(device.id);
  }
  // As RFC 7009 says: the same answer whether or not the token was valid.
  return c.body(null, 200, nonce);
});

function authorizeParams(params: Record<string, unknown>) {
  return {
    responseType: params.response_type,
    clientId: params.client_id,
    redirectUri: params.redirect_uri,
    codeChallenge: params.code_challenge,
    codeChallengeMethod: params.code_challenge_method,
    state: params.state,
    dpopJkt: params.dpop_jkt,
  };
}

// An OAuth error from the authorization server (RFC 6749, section 5.2): a
// 400, DPoP problems included (RFC 9449, section 5), with the next nonce.
// Never Supabase's own error, never more than the client needs.
function oauthError(
  c: Context,
  error: string,
  headers: Record<string, string>,
) {
  return c.json({ error }, 400, headers);
}

// How long a proof's `jti` is remembered: past its nonce's life, after which
// the proof is refused anyway.
function proofExpiry(): Date {
  return new Date(Date.now() + 2 * nonceSeconds * 1000);
}

const noStore = { "cache-control": "no-store" };

// Where Backtick serves: settings, so moving home changes no code.
function origins(): Origins {
  return {
    home: required("BACKTICK_HOME_ORIGIN"),
    appsDomain: required("BACKTICK_APPS_DOMAIN"),
  };
}

// This server's signing key for access tokens: a private ES256 JWK with its
// `kid`. Its public half is at /.well-known/jwks.json.
let key: JWK | undefined;
function signingKey(): JWK {
  key ??= JSON.parse(required("BACKTICK_SIGNING_JWK")) as JWK;
  return key;
}

// What signs the sign-in cookie: the nonce secret, under its own label.
function cookieSecret(): string {
  return required("BACKTICK_DPOP_NONCE_SECRET");
}

// The accounts that may sign in with email and password: App Review's.
function passwordAccounts(): string[] {
  return (process.env.BACKTICK_PASSWORD_ACCOUNTS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default app;
