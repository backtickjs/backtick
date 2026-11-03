// api.backtickjs.com's Vercel Function, where Vercel looks for it: the MCP
// endpoint the hosts connect to, and sign-in for it. Apps are answered at
// their own hosts, <id>.backtickjs.app, by apps/backtickjs.app.
import {
  createMcpHandler,
  getOAuthProtectedResourceMetadataUrl,
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
  type OAuthMetadata,
  oauthMetadataResponse,
  requireBearerAuth,
} from "@modelcontextprotocol/server";
import { type Context, Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { JWK } from "jose";
import { browserUser, ownerOf, verifier } from "./function/auth.ts";
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
import { tools } from "./function/tools.ts";
// Compiled by `tspc` first: the pages are Backtick scripts.
import { consentPage, signInPage } from "../web/dist/index.js";

const mcp = createMcpHandler((context) => tools(ownerOf(context.authInfo)));

// This machine, the project's domains and the deployment's own hostnames: a
// page in the browser can't reach the endpoint by pointing another domain at
// it.
const hostnames = [
  ...localhostAllowedHostnames(),
  "api.backtickjs.com",
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].filter((hostname) => hostname !== undefined);

const app = new Hono();

// The keys Backtick's hosts check access tokens with (RFC 7517). Before the
// MCP discovery documents below, which answer the rest of /.well-known/.
app.get("/.well-known/jwks.json", (c) =>
  c.json({ keys: [publicJwk(signingKey())] }, 200, {
    "cache-control": "public, max-age=300",
  }),
);

// Where a host finds out how to sign in: this endpoint is a resource whose
// tokens Supabase's OAuth server issues.
app.get(
  "/.well-known/*",
  async (c) =>
    oauthMetadataResponse(c.req.raw, {
      oauthMetadata: await authorizationServer(),
      resourceServerUrl: new URL("/mcp", c.req.url),
      resourceName: "Backtick",
    }) ?? c.notFound(),
);

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

// The pages can't be framed by another site, so they can't be clicked through.
const pageHeaders = secureHeaders({
  xFrameOptions: "DENY",
  contentSecurityPolicy: { frameAncestors: ["'none'"] },
});

// Where Supabase sends a user to allow a host: Authentication → OAuth Server →
// Authorization Path.
app.get("/oauth/consent", pageHeaders, async (c) =>
  c.html(await consentPage()),
);

// The Backtick app's authorization server (docs/security-model.md): the
// sign-in page, which the app opens in the system's sign-in browser with an
// OAuth authorization request (PKCE, and `dpop_jkt`, its key's thumbprint).
app.get("/authorize", pageHeaders, async (c) => {
  const query = c.req.queries();
  const error = Object.values(query).some((values) => values.length > 1)
    ? "A parameter appears twice."
    : authorizeError(authorizeParams(c.req.query()));
  return error === undefined
    ? c.html(await signInPage())
    : c.text(error, 400, noStore);
});

// The sign-in page, signed in with Supabase in the browser, turns that into an
// authorization code for the app that asked, sent to the app's own redirect
// URI with the request's `state` and this server as `iss` (RFC 9207).
app.post("/authorize", async (c) => {
  const user = await browserUser(c.req.header("authorization"));
  const params = authorizeParams(
    await c.req.json<Record<string, unknown>>().catch(() => ({})),
  );
  if (user === undefined) {
    return c.json({ error: "Sign in first." }, 401, noStore);
  }
  // Email and password is for App Review's account only: anyone else signs in
  // with Apple or Google, so a password set by someone else on an account (an
  // assistant's token can change it) opens no phone session.
  if (
    user.methods.includes("password") &&
    !passwordAccounts().includes(user.email)
  ) {
    return c.json({ error: "Sign in with Apple or Google." }, 403, noStore);
  }
  const error = authorizeError(params);
  if (error !== undefined) {
    return c.json({ error }, 400, noStore);
  }
  const code = newSecret();
  await saveCode({
    hash: hashOf(code),
    userId: user.id,
    codeChallenge: params.codeChallenge as string,
    dpopJkt: params.dpopJkt as string,
  });
  const redirect = new URL(client.redirectUri);
  redirect.search = new URLSearchParams({
    code,
    state: params.state as string,
    iss: issuer,
  }).toString();
  return c.json({ redirect: redirect.href }, 200, noStore);
});

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

// Each request carries the user's access token. Without a valid one, a 401
// that points at the documents above.
app.all("/mcp", async (c) => {
  const rejected = hostHeaderValidationResponse(c.req.raw, hostnames);
  if (rejected !== undefined) {
    return rejected;
  }
  const auth = await requireBearerAuth({
    verifier,
    resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(
      new URL("/mcp", c.req.url),
    ),
  })(c.req.raw);
  return auth instanceof Response
    ? auth
    : mcp.fetch(c.req.raw, { authInfo: auth });
});

// Supabase's OAuth server's own discovery document, fetched once per instance.
let metadata: Promise<OAuthMetadata> | undefined;
function authorizationServer(): Promise<OAuthMetadata> {
  metadata ??= fetch(
    `${process.env.SUPABASE_URL}/.well-known/oauth-authorization-server/auth/v1`,
  ).then(async (response) => {
    if (!response.ok) {
      metadata = undefined;
      throw new Error(`Supabase's OAuth server answered ${response.status}.`);
    }
    return (await response.json()) as OAuthMetadata;
  });
  return metadata;
}

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

// The accounts that may sign in with email and password: App Review's.
function passwordAccounts(): string[] {
  return (process.env.BACKTICK_PASSWORD_ACCOUNTS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default app;
