// The Backtick app's authorization server, to the
// standards: OAuth 2.1 for a native app (RFC 8252) with PKCE (RFC 7636), a
// DPoP-bound refresh token (RFC 9449), and access tokens for one origin each
// (resource indicators, RFC 8707; JWT access tokens, RFC 9068), its tokens
// signed with its own key and read by Backtick's hosts only. Pure
// functions, tested without Supabase; the routes are in src/index.ts.
import {
  createHash,
  createHmac,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import {
  calculateJwkThumbprint,
  EmbeddedJWK,
  type JWK,
  importJWK,
  jwtVerify,
  SignJWT,
} from "jose";

// The one client: the Backtick app, a public client, and where its sign-in
// returns (a universal link and App Link only the app can receive).
export const client = {
  id: "backtick-app",
  redirectUri: "https://app.backtickjs.com/signed-in",
};

export const issuer = "https://auth.backtickjs.com";
export const accessTokenSeconds = 5 * 60;
export const codeSeconds = 2 * 60;
// A proof is as fresh as its nonce: the phone's clock isn't trusted for it
// (RFC 9449, section 11.1), so a phone set minutes off still signs in.
export const nonceSeconds = 5 * 60;

// The origins Backtick serves, so the ones a token can be for: its home, and
// each app at <id>.<apps domain>. Configuration, not code: moving home is a
// setting.
export type Origins = { home: string; appsDomain: string };

// The origin a `resource` names, exactly: HTTPS, no path, no port, and one
// Backtick serves. Hostnames compare lowercased, as URL makes them.
export function originOf(
  resource: string,
  origins: Origins,
): string | undefined {
  let url: URL;
  try {
    url = new URL(resource);
  } catch {
    return undefined;
  }
  if (
    url.protocol !== "https:" ||
    url.port !== "" ||
    url.pathname !== "/" ||
    url.search !== "" ||
    url.hash !== "" ||
    url.username !== "" ||
    url.password !== ""
  ) {
    return undefined;
  }
  if (url.origin === new URL(origins.home).origin) {
    return url.origin;
  }
  const app = url.hostname.endsWith(`.${origins.appsDomain}`)
    ? url.hostname.slice(0, -origins.appsDomain.length - 1)
    : undefined;
  return app !== undefined &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(app)
    ? url.origin
    : undefined;
}

// PKCE, S256 only.
export function pkceMatches(verifier: string, challenge: string): boolean {
  if (!/^[A-Za-z0-9._~-]{43,128}$/.test(verifier)) {
    return false;
  }
  return safeEqual(
    createHash("sha256").update(verifier).digest("base64url"),
    challenge,
  );
}

// An authorization request's parameters, checked before anyone signs in and
// again before a code is made.
export function authorizeError(params: {
  responseType: unknown;
  clientId: unknown;
  redirectUri: unknown;
  codeChallenge: unknown;
  codeChallengeMethod: unknown;
  state: unknown;
  dpopJkt: unknown;
}): string | undefined {
  if (
    params.clientId !== client.id ||
    params.redirectUri !== client.redirectUri
  ) {
    return "Open sign-in from the Backtick app.";
  }
  if (params.responseType !== "code") {
    return "unsupported_response_type";
  }
  if (
    params.codeChallengeMethod !== "S256" ||
    typeof params.codeChallenge !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(params.codeChallenge)
  ) {
    return "PKCE with S256 is required.";
  }
  // The code is bound to the app's key (RFC 9449, section 10), so only the
  // phone that started the sign-in can redeem it.
  if (
    typeof params.dpopJkt !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(params.dpopJkt)
  ) {
    return "dpop_jkt is required.";
  }
  if (
    typeof params.state !== "string" ||
    params.state.length < 16 ||
    params.state.length > 256
  ) {
    return "state is required.";
  }
  return undefined;
}

export function newSecret(): string {
  return randomBytes(32).toString("base64url");
}

export function hashOf(value: string): string {
  return createHash("sha256").update(value).digest("base64url");
}

// A DPoP proof (RFC 9449, section 4.3): a JWT of type `dpop+jwt`, ES256,
// signed by the public key in its own header, for this method and URL, now,
// with the server's nonce. Returns the key's thumbprint and the proof's `jti`,
// or why it's refused: `use_dpop_nonce` asks the client to retry with the nonce
// in the `DPoP-Nonce` header.
export async function verifyProof(
  proof: string | undefined,
  request: { method: string; url: string; nonceSecret: string },
  now = Date.now(),
): Promise<
  | { jkt: string; jti: string }
  | { error: "invalid_dpop_proof" | "use_dpop_nonce" }
> {
  if (proof === undefined || proof.includes(",")) {
    return { error: "invalid_dpop_proof" };
  }
  try {
    const { payload, protectedHeader } = await jwtVerify(proof, EmbeddedJWK, {
      typ: "dpop+jwt",
      algorithms: ["ES256"],
      currentDate: new Date(now),
      // `iat` is required, but not compared with this server's clock.
      clockTolerance: 365 * 86_400,
    });
    const jwk = protectedHeader.jwk!;
    // Only the public key: a private part in the header means a broken client.
    if (jwk.kty !== "EC" || jwk.crv !== "P-256" || "d" in jwk) {
      return { error: "invalid_dpop_proof" };
    }
    const htu = new URL(request.url);
    htu.search = "";
    htu.hash = "";
    if (
      payload.htm !== request.method ||
      payload.htu !== htu.href ||
      typeof payload.jti !== "string" ||
      payload.jti.length < 16 ||
      typeof payload.iat !== "number"
    ) {
      return { error: "invalid_dpop_proof" };
    }
    if (
      typeof payload.nonce !== "string" ||
      !nonceIsFresh(request.nonceSecret, payload.nonce, now)
    ) {
      return { error: "use_dpop_nonce" };
    }
    return {
      jkt: await calculateJwkThumbprint(jwk, "sha256"),
      jti: payload.jti,
    };
  } catch {
    return { error: "invalid_dpop_proof" };
  }
}

// The server's DPoP nonce: the time and a random part, with their HMAC. Proofs
// can't be made ahead of time, and no state is kept for it.
export function newNonce(secret: string, now = Date.now()): string {
  const body = `${Math.floor(now / 1000)}.${randomBytes(12).toString("base64url")}`;
  return `${body}.${mac(secret, body)}`;
}

export function nonceIsFresh(
  secret: string,
  nonce: string,
  now = Date.now(),
): boolean {
  const [time, random, tag, ...rest] = nonce.split(".");
  if (
    time === undefined ||
    random === undefined ||
    tag === undefined ||
    rest.length > 0
  ) {
    return false;
  }
  if (!safeEqual(mac(secret, `${time}.${random}`), tag)) {
    return false;
  }
  const age = Math.floor(now / 1000) - Number(time);
  return age >= 0 && age <= nonceSeconds;
}

// An access token for one origin (RFC 9068), signed with this server's own
// key, published at /.well-known/jwks.json. Only Backtick's hosts read it:
// each checks the signature, `iss`, `typ`, expiry and that `aud` is its own
// origin, then acts with its own credentials. It never reaches Supabase, and
// carries nothing about the user but their ID.
export async function mintAccessToken(
  signingKey: JWK,
  claims: { user: string; origin: string },
  now = Date.now(),
): Promise<{ token: string; expiresIn: number }> {
  const key = await importJWK(signingKey, "ES256");
  const issuedAt = Math.floor(now / 1000);
  const token = await new SignJWT({ client_id: client.id })
    .setProtectedHeader({ alg: "ES256", kid: signingKey.kid, typ: "at+jwt" })
    .setIssuer(issuer)
    .setSubject(claims.user)
    .setAudience(claims.origin)
    .setJti(randomUUID())
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + accessTokenSeconds)
    .sign(key);
  return { token, expiresIn: accessTokenSeconds };
}

// The public half of the signing key, for /.well-known/jwks.json.
export function publicJwk(signingKey: JWK): JWK {
  const { kty, crv, x, y, kid } = signingKey;
  return { kty, crv, x, y, kid, alg: "ES256", use: "sig" };
}

// A request that names a parameter twice is refused (OAuth 2.1, section 3.1).
export function single(
  params: Record<string, string | File | (string | File)[]>,
): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(params)) {
    if (typeof value !== "string") {
      return undefined;
    }
    out[name] = value;
  }
  return out;
}

function mac(secret: string, body: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
