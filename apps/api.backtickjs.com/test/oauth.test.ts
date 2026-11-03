import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, randomUUID } from "node:crypto";
import { describe, it } from "node:test";
import {
  calculateJwkThumbprint,
  exportJWK,
  importJWK,
  jwtVerify,
  SignJWT,
} from "jose";
import {
  accessTokenSeconds,
  authorizeError,
  client,
  issuer,
  mintAccessToken,
  newNonce,
  nonceIsFresh,
  originOf,
  pkceMatches,
  publicJwk,
  single,
  verifyProof,
} from "../src/function/oauth.ts";

const app = "0b6d1a2e-6c1f-4b8e-9a51-3f0e2d7c9b10";
const origins = {
  home: "https://app.backtickjs.com",
  appsDomain: "backtickjs.app",
};

describe("originOf: the resource a token is for", () => {
  it("is Backtick's home or an app's origin", () => {
    assert.equal(
      originOf("https://app.backtickjs.com", origins),
      "https://app.backtickjs.com",
    );
    assert.equal(
      originOf("https://app.backtickjs.com/", origins),
      "https://app.backtickjs.com",
    );
    assert.equal(
      originOf(`https://${app}.backtickjs.app`, origins),
      `https://${app}.backtickjs.app`,
    );
    // Hostnames are case-insensitive: URL lowercases them.
    assert.equal(
      originOf(`https://${app.toUpperCase()}.backtickjs.app`, origins),
      `https://${app}.backtickjs.app`,
    );
  });

  it("follows the settings: home can move", () => {
    const moved = {
      home: "https://home.backtick.example",
      appsDomain: "apps.example",
    };
    assert.equal(
      originOf("https://home.backtick.example", moved),
      "https://home.backtick.example",
    );
    assert.equal(originOf("https://app.backtickjs.com", moved), undefined);
    assert.equal(
      originOf(`https://${app}.apps.example`, moved),
      `https://${app}.apps.example`,
    );
  });

  it("refuses anything else", () => {
    for (const resource of [
      "http://app.backtickjs.com",
      "https://app.backtickjs.com:8443",
      "https://app.backtickjs.com/path",
      "https://app.backtickjs.com/?x=1",
      "https://user@app.backtickjs.com",
      "https://evil-app.backtickjs.com",
      "https://app.backtickjs.com.evil.com",
      `https://${app}.backtickjs.app.evil.com`,
      `https://${app}.evilbacktickjs.app`,
      "https://backtickjs.app",
      "https://not-a-uuid.backtickjs.app",
      `https://x.${app}.backtickjs.app`,
      "app.backtickjs.com",
      "",
    ]) {
      assert.equal(originOf(resource, origins), undefined, resource);
    }
  });
});

describe("PKCE", () => {
  const verifier = "a".repeat(43) + "-._~";
  const challenge = createHash("sha256").update(verifier).digest("base64url");

  it("matches S256 of the verifier only", () => {
    assert.ok(pkceMatches(verifier, challenge));
    assert.equal(pkceMatches(verifier + "x", challenge), false);
  });

  it("refuses verifiers outside RFC 7636's alphabet and length", () => {
    assert.equal(
      pkceMatches(
        "short",
        createHash("sha256").update("short").digest("base64url"),
      ),
      false,
    );
    const bad = "a".repeat(43) + "!";
    assert.equal(
      pkceMatches(bad, createHash("sha256").update(bad).digest("base64url")),
      false,
    );
  });
});

describe("an authorization request", () => {
  const good = {
    responseType: "code",
    clientId: client.id,
    redirectUri: client.redirectUri,
    codeChallenge: "c".repeat(43),
    codeChallengeMethod: "S256",
    state: "s".repeat(32),
    dpopJkt: "k".repeat(43),
  };

  it("is accepted with every parameter right", () => {
    assert.equal(authorizeError(good), undefined);
  });

  it("is refused when any is wrong", () => {
    for (const change of [
      { clientId: "other" },
      { redirectUri: "backtick://signed-in" },
      { responseType: "token" },
      { codeChallengeMethod: "plain" },
      { codeChallenge: "short" },
      { dpopJkt: undefined },
      { state: "short" },
    ]) {
      assert.notEqual(
        authorizeError({ ...good, ...change }),
        undefined,
        JSON.stringify(change),
      );
    }
  });
});

describe("DPoP proofs", () => {
  const secret = "nonce secret";
  const url = `${issuer}/token`;
  const pair = generateKeyPairSync("ec", { namedCurve: "P-256" });

  async function proof(
    claims: Record<string, unknown> = {},
    header: Record<string, unknown> = {},
    key = pair,
  ) {
    const jwk = await exportJWK(key.publicKey);
    return new SignJWT({
      htm: "POST",
      htu: url,
      jti: randomUUID(),
      iat: Math.floor(Date.now() / 1000),
      nonce: newNonce(secret),
      ...claims,
    })
      .setProtectedHeader({ alg: "ES256", typ: "dpop+jwt", jwk, ...header })
      .sign(key.privateKey);
  }
  const check = (p: string | undefined) =>
    verifyProof(p, { method: "POST", url, nonceSecret: secret });

  it("gives the key's thumbprint for a good proof", async () => {
    const result = await check(await proof());
    assert.ok("jkt" in result);
    assert.equal(
      result.jkt,
      await calculateJwkThumbprint(await exportJWK(pair.publicKey), "sha256"),
    );
  });

  it("doesn't trust the phone's clock: an iat minutes off is fine", async () => {
    for (const minutes of [-10, 10]) {
      const result = await check(
        await proof({ iat: Math.floor(Date.now() / 1000) + minutes * 60 }),
      );
      assert.ok("jkt" in result, String(minutes));
    }
  });

  it("ignores the query and fragment of the request URL", async () => {
    const result = await verifyProof(await proof(), {
      method: "POST",
      url: `${url}?x=1#y`,
      nonceSecret: secret,
    });
    assert.ok("jkt" in result);
  });

  it("asks for the nonce when it's missing, stale or forged", async () => {
    for (const nonce of [
      undefined,
      newNonce(secret, Date.now() - 6 * 60_000),
      newNonce("another secret"),
    ]) {
      const p = await proof({ nonce });
      assert.deepEqual(await check(p), { error: "use_dpop_nonce" });
    }
  });

  it("refuses the wrong method, URL, age, type, algorithm or key", async () => {
    const other = generateKeyPairSync("ec", { namedCurve: "P-256" });
    const p384 = generateKeyPairSync("ec", { namedCurve: "P-384" });
    const cases = [
      await proof({ htm: "GET" }),
      await proof({ htu: `${issuer}/revoke` }),
      await proof({ iat: "yesterday" }),
      await proof({ jti: "short" }),
      await proof({}, { typ: "JWT" }),
      // Signed by one key, claiming another.
      await proof({}, { jwk: await exportJWK(other.publicKey) }),
      // A private key in the header.
      await proof({}, { jwk: await exportJWK(pair.privateKey) }),
    ];
    for (const p of cases) {
      assert.deepEqual(await check(p), { error: "invalid_dpop_proof" });
    }
    const es384 = await new SignJWT({
      htm: "POST",
      htu: url,
      jti: randomUUID(),
      iat: Math.floor(Date.now() / 1000),
      nonce: newNonce(secret),
    })
      .setProtectedHeader({
        alg: "ES384",
        typ: "dpop+jwt",
        jwk: await exportJWK(p384.publicKey),
      })
      .sign(p384.privateKey);
    assert.deepEqual(await check(es384), { error: "invalid_dpop_proof" });
    assert.deepEqual(await check(undefined), { error: "invalid_dpop_proof" });
    assert.deepEqual(await check("a.b.c"), { error: "invalid_dpop_proof" });
    assert.deepEqual(await check(`${await proof()},${await proof()}`), {
      error: "invalid_dpop_proof",
    });
  });
});

describe("nonces", () => {
  it("are fresh for five minutes, and only this server's", () => {
    const now = Date.now();
    const nonce = newNonce("s", now);
    assert.ok(nonceIsFresh("s", nonce, now + 299_000));
    assert.equal(nonceIsFresh("s", nonce, now + 301_000), false);
    assert.equal(nonceIsFresh("s", nonce, now - 2_000), false);
    assert.equal(nonceIsFresh("t", nonce, now), false);
    assert.equal(nonceIsFresh("s", `${nonce}.x`, now), false);
    assert.equal(nonceIsFresh("s", "", now), false);
  });
});

describe("an access token", () => {
  it("is for one origin, five minutes, signed with Backtick's key, nothing else about the user", async () => {
    const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
    const signing = { ...(await exportJWK(privateKey)), kid: randomUUID() };
    const user = randomUUID();
    const origin = `https://${app}.backtickjs.app`;
    const { token, expiresIn } = await mintAccessToken(signing, {
      user,
      origin,
    });
    const { payload, protectedHeader } = await jwtVerify(
      token,
      await importJWK(publicJwk(signing), "ES256"),
      { issuer, audience: origin, typ: "at+jwt" },
    );
    assert.equal(protectedHeader.kid, signing.kid);
    assert.equal(payload.aud, origin);
    assert.equal(payload.sub, user);
    assert.equal(payload.client_id, client.id);
    assert.match(String(payload.jti), /^[0-9a-f-]{36}$/);
    assert.equal(payload.exp! - payload.iat!, accessTokenSeconds);
    assert.equal(expiresIn, accessTokenSeconds);
    assert.deepEqual(Object.keys(payload).sort(), [
      "aud",
      "client_id",
      "exp",
      "iat",
      "iss",
      "jti",
      "sub",
    ]);
  });

  it("is refused for another origin", async () => {
    const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
    const signing = { ...(await exportJWK(privateKey)), kid: randomUUID() };
    const { token } = await mintAccessToken(signing, {
      user: randomUUID(),
      origin: `https://${app}.backtickjs.app`,
    });
    await assert.rejects(
      jwtVerify(token, await importJWK(publicJwk(signing), "ES256"), {
        issuer,
        audience: "https://app.backtickjs.com",
      }),
    );
  });
});

describe("the published key", () => {
  it("has no private part", async () => {
    const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
    const signing = { ...(await exportJWK(privateKey)), kid: "k" };
    const published = publicJwk(signing);
    assert.equal("d" in published, false);
    assert.equal(published.kid, "k");
  });
});

describe("single", () => {
  it("refuses a parameter given twice", () => {
    assert.deepEqual(single({ a: "1", b: "2" }), { a: "1", b: "2" });
    assert.equal(single({ a: ["1", "2"] }), undefined);
  });
});
