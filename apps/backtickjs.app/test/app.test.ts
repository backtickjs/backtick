import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import app from "../src/index.ts";

const id = "3f2a6c1e-9b4d-4e8a-a1c2-7d5e9f0b1a2c";
const modules = '{"react-native":"0.86.3"}';

afterEach(() => mock.restoreAll());

// The Worker's bindings, standing in: Supabase's answers by query, the cache a
// map, the loader running nothing but recording what it was asked for.
function worker(versions: Record<string, unknown>) {
  const read: string[] = [];
  mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    const query = new URL(url).search;
    read.push(query);
    const authorization = new Headers(init.headers).get("authorization");
    if (authorization !== "Bearer token") {
      return Response.json({ message: "JWT expired" }, { status: 401 });
    }
    const select = new URLSearchParams(query).get("select")!;
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
  const loaded: { id: string; code: string; request: Request }[] = [];
  const env = {
    SUPABASE_URL: "https://project.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "sb_publishable_key",
    LOADER: {
      get: (
        id: string,
        getCode: () => Promise<{ modules: { "app.js": string } }>,
      ) => ({
        getEntrypoint: () => ({
          fetch: async (request: Request) => {
            const { modules } = await getCode();
            loaded.push({ id, code: modules["app.js"], request });
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
    const { open, loaded } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    const answer = await open("/day?week=2", "Bearer token");
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
  });

  it("reads a release from Postgres once, then from the cache", async () => {
    const { open, read } = worker({
      version: [{ version: 3 }],
      compiled: [{ compiled: "release 3" }],
    });
    await open("/", "Bearer token");
    await open("/", "Bearer token");
    assert.deepEqual(
      read.map((query) => new URLSearchParams(query).get("select")),
      ["version", "compiled", "version"],
    );
  });

  it("passes Supabase's refusal of the token on", async () => {
    const { open } = worker({});
    assert.equal((await open("/", "Bearer expired")).status, 401);
    assert.equal((await open("/")).status, 401);
  });

  it("answers 404 for an app with no release, or someone else's", async () => {
    const { open } = worker({ version: [] });
    assert.equal((await open("/", "Bearer token")).status, 404);
  });

  it("sends a phone's browser to Expo Go, at the same path", async () => {
    const page = await app.request(
      `https://${id}.backtickjs.app/talks/42?x=1`,
      {
        headers: { "user-agent": "Mozilla/5.0 (Linux; Android 15; Pixel 9)" },
      },
    );
    assert.equal(page.status, 200);
    const link = `exp://u\\.expo\\.dev/[0-9a-f-]+/--/${id}/talks/42\\?x=1&amp;channel-name=production`;
    const text = await page.text();
    assert.match(
      text,
      new RegExp(`http-equiv="refresh" content="0; url=${link}"`),
    );
    assert.match(text, new RegExp(`href="${link}"`));
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

  it("isn't an app at a host that isn't one", async () => {
    const answer = await app.request("https://www.backtickjs.app/");
    assert.equal(answer.status, 302);
  });
});
