import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID } from "node:crypto";
import { afterEach, describe, it, mock } from "node:test";
import { exportJWK, SignJWT } from "jose";
import app from "../src/index.ts";

const id = "3f2a6c1e-9b4d-4e8a-a1c2-7d5e9f0b1a2c";
const user = "6d1f0b2a-4c3e-4b5a-9e8d-7c6b5a4f3e2d";
const modules = '{"react-native":"0.86.3"}';
const issuer = "https://auth.example";
const { privateKey, publicKey } = generateKeyPairSync("ec", {
  namedCurve: "P-256",
});
const kid = randomUUID();

afterEach(() => mock.restoreAll());

// An access token as auth.backtickjs.com mints one, for `origin`.
async function token(
  origin = `https://${id}.backtickjs.app`,
  claims: { sub?: string; iss?: string; typ?: string; exp?: number } = {},
) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ client_id: "backtick-app" })
    .setProtectedHeader({ alg: "ES256", kid, typ: claims.typ ?? "at+jwt" })
    .setIssuer(claims.iss ?? issuer)
    .setSubject(claims.sub ?? user)
    .setAudience(origin)
    .setIssuedAt(now)
    .setExpirationTime(claims.exp ?? now + 300)
    .sign(privateKey);
}

// The Worker's bindings, standing in: the issuer's keys, Supabase's answers by
// query, the cache a map, the loader running nothing but recording what it
// was asked for.
function worker(versions: Record<string, unknown>) {
  const read: string[] = [];
  mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    if (String(url) === `${issuer}/.well-known/jwks.json`) {
      return Response.json({
        keys: [{ ...(await exportJWK(publicKey)), kid, alg: "ES256" }],
      });
    }
    const query = new URL(url).search;
    read.push(query);
    assert.equal(new Headers(init.headers).get("apikey"), "service role key");
    const select = new URLSearchParams(query).get("select")!.split(",")[0];
    return Response.json(versions[select] ?? []);
  });
  const cached = new Map<string, string>();
  (globalThis as { caches?: unknown }).caches = {
    default: {
      match: async (key: Request) =>
        cached.has(key.url) ? new Response(cached.get(key.url)) : undefined,
      put: async (key: Request, response: Response) => {
        cached.set(key.url, await response.text());
      },
    },
  };
  const loaded: {
    id: string;
    code: string;
    request: Request;
    globalOutbound: unknown;
  }[] = [];
  const env = {
    SUPABASE_URL: "https://project.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "service role key",
    BACKTICK_APP_USER_SECRET: "app user secret",
    BACKTICK_AUTH_ORIGIN: issuer,
    LOADER: {
      get: (
        id: string,
        getCode: () => Promise<{
          modules: { "app.js": string };
          globalOutbound: unknown;
        }>,
      ) => ({
        getEntrypoint: () => ({
          fetch: async (request: Request) => {
            const { modules, globalOutbound } = await getCode();
            loaded.push({
              id,
              code: modules["app.js"],
              request,
              globalOutbound,
            });
            return new Response("screen", {
              headers: { "content-type": "text/javascript" },
            });
          },
        }),
      }),
    },
  };
  const waiting: Promise<unknown>[] = [];
  const context = {
    waitUntil: (promise: Promise<unknown>) => waiting.push(promise),
    passThroughOnException: () => {},
    props: {},
    exports: {
      OutboundGateway: (options: { props: unknown }) => options.props,
    },
  };
  const open = async (path: string, authorization?: string) => {
    const answer = await app.request(
      `https://${id}.backtickjs.app${path}`,
      {
        headers: {
          "x-backtick-modules": modules,
          ...(authorization === undefined ? {} : { authorization }),
        },
      },
      env,
      context as unknown as ExecutionContext,
    );
    await Promise.all(waiting);
    return answer;
  };
  return { open, read, loaded };
}

describe("an app's host", () => {
  it("answers the phone with the app's latest release, without its token", async () => {
    const { open, loaded, read } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    const answer = await open("/day?week=2", `Bearer ${await token()}`);
    assert.equal(answer.status, 200);
    assert.equal(await answer.text(), "screen");
    assert.equal(answer.headers.get("x-backtick-version"), "3");
    assert.match(
      answer.headers.get("server-timing")!,
      /^fetch;dur=\d+, bundle;dur=\d+, cache;desc=miss$/,
    );
    const [{ id: release, code, request }] = loaded;
    assert.equal(release, `${id}@3`);
    assert.equal(code, "release 3");
    assert.equal(
      new URL(request.url).pathname + new URL(request.url).search,
      "/day?week=2",
    );
    assert.equal(request.headers.get("x-backtick-modules"), modules);
    assert.equal(request.headers.get("authorization"), null);
    // Only the token's user's own app.
    const owner = new URLSearchParams(read[0]).get("apps.owner_id");
    assert.equal(owner, `eq.${user}`);
  });

  it("tells a release who's asking by an ID of this app's own", async () => {
    const { open, loaded } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    await open("/", `Bearer ${await token()}`);
    const appUser = loaded[0].request.headers.get("x-backtick-user")!;
    assert.match(appUser, /^[A-Za-z0-9_-]{43}$/);
    assert.notEqual(appUser, user);
  });

  it("sends a release's network through the gateway, as its app", async () => {
    const { open, loaded } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    await open("/", `Bearer ${await token()}`);
    assert.deepEqual(loaded[0].globalOutbound, { app: id });
  });

  it("reads a release from Postgres once, then from the cache", async () => {
    const { open, read } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    await open("/", `Bearer ${await token()}`);
    await open("/", `Bearer ${await token()}`);
    assert.deepEqual(
      read.map(
        (query) => new URLSearchParams(query).get("select")!.split(",")[0],
      ),
      ["version", "compiled", "version"],
    );
  });

  it("doesn't cache a release a save cleared while opening it", async () => {
    const { open, read } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: null }],
    });
    assert.equal((await open("/", `Bearer ${await token()}`)).status, 500);
    assert.equal((await open("/", `Bearer ${await token()}`)).status, 500);
    assert.deepEqual(
      read.map(
        (query) => new URLSearchParams(query).get("select")!.split(",")[0],
      ),
      ["version", "compiled", "version", "compiled"],
    );
  });

  it("refuses a missing token, or one for anywhere else, by anyone else, or expired", async () => {
    const { open, read } = worker({ version: [{ version: 3 }] });
    const now = Math.floor(Date.now() / 1000);
    for (const authorization of [
      undefined,
      "Bearer not-a-token",
      `Bearer ${await token("https://app.backtickjs.com")}`,
      `Bearer ${await token("https://9a8b7c6d-0000-4000-8000-000000000000.backtickjs.app")}`,
      `Bearer ${await token(undefined, { iss: "https://elsewhere.example" })}`,
      `Bearer ${await token(undefined, { typ: "JWT" })}`,
      `Bearer ${await token(undefined, { exp: now - 10 })}`,
    ]) {
      assert.equal((await open("/", authorization)).status, 401, authorization);
    }
    assert.deepEqual(read, []);
  });

  it("answers 404 for an app with no release, or someone else's", async () => {
    const { open } = worker({ version: [] });
    assert.equal((await open("/", `Bearer ${await token()}`)).status, 404);
  });

  it("sends a phone's browser to Backtick, at the same path", async () => {
    const page = await app.request(
      `https://${id}.backtickjs.app/talks/42?x=1`,
      {
        headers: { "user-agent": "Mozilla/5.0 (Linux; Android 15; Pixel 9)" },
      },
    );
    assert.equal(page.status, 200);
    const link = `backtick://${id}/talks/42\\?x=1`;
    const text = await page.text();
    assert.match(
      text,
      new RegExp(`http-equiv="refresh" content="0; url=${link}"`),
    );
    assert.match(text, new RegExp(`href="${link}"`));
    // and Expo Go, for a phone without Backtick
    assert.match(
      text,
      new RegExp(
        `href="exp://u\\.expo\\.dev/[0-9a-f-]+/--/${id}/talks/42\\?x=1&amp;channel-name=production"`,
      ),
    );
  });

  it("sends an iPhone's browser to Expo Go, at the same path", async () => {
    const page = await app.request(`https://${id}.backtickjs.app/talks/42`, {
      headers: {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X)",
      },
    });
    const text = await page.text();
    assert.match(
      text,
      new RegExp(
        `http-equiv="refresh" content="0; url=exp://u\\.expo\\.dev/[0-9a-f-]+/--/${id}/talks/42\\?channel-name=production"`,
      ),
    );
    assert.match(text, /Open in Expo Go/);
    assert.doesNotMatch(text, /backtick:\/\//);
  });

  it("shows a computer a QR code of the page", async () => {
    const page = await app.request(`https://${id}.backtickjs.app/talks/42`, {
      headers: { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0)" },
    });
    const text = await page.text();
    assert.match(text, /<svg /);
    assert.doesNotMatch(text, /exp:\/\//);
  });
});

describe("the bare domain", () => {
  it("sends people to the website", async () => {
    const answer = await app.request("https://backtickjs.app/");
    assert.equal(answer.status, 302);
    assert.equal(answer.headers.get("location"), "https://backtickjs.com");
  });

  it("vouches for the Backtick app, for links to every app's host", async () => {
    const answer = await app.request(
      "https://backtickjs.app/.well-known/assetlinks.json",
    );
    assert.equal(answer.status, 200);
    const [{ target }] = await answer.json<
      {
        target: { package_name: string; sha256_cert_fingerprints: string[] };
      }[]
    >();
    assert.equal(target.package_name, "com.backtickjs.app");
    assert.match(
      target.sha256_cert_fingerprints[0],
      /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/,
    );
  });

  it("isn't an app at a host that isn't one", async () => {
    const answer = await app.request("https://www.backtickjs.app/");
    assert.equal(answer.status, 302);
  });
});
