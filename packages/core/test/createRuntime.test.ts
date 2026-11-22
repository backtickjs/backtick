import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BundleFetchError,
  type Bundle,
  createRuntime,
  isBundleFetchError,
} from "../dist/index.js";

// Bundles written out as the bundler writes them: CommonJS, `$cached`
// reading `module.cache` as its runtime hands it.
const bundle = <T>(code: string) => `"use strict";\n${code}` as Bundle<T>;
const counter = bundle<number>(`
const $cache = module.cache ?? new Map();
if (!$cache.has("count")) {
  $cache.set("count", { count: 0 });
}
module.exports = ++$cache.get("count").count;
`);
const empty = { moduleMap: {}, installedPackages: {} };

test("exec runs a bundle with the runtime's modules", async () => {
  const runtime = createRuntime({
    moduleMap: { app: { answer: 41 } },
    installedPackages: { app: "1.0.0" },
  });
  const value = await runtime.exec(
    bundle<number>('module.exports = require("app").answer + 1;'),
  );
  assert.equal(value, 42);
});

test("a module the runtime doesn't provide fails with its name", async () => {
  await assert.rejects(
    createRuntime(empty).exec(bundle('module.exports = require("app");')),
    /The bundle requires "app", which this app doesn't provide\./,
  );
});

test("the bundles a runtime runs share its cache", async () => {
  const runtime = createRuntime(empty);
  assert.equal(await runtime.exec(counter), 1);
  assert.equal(await runtime.exec(counter), 2);
});

test("two runtimes keep their own cache", async () => {
  assert.equal(await createRuntime(empty).exec(counter), 1);
  assert.equal(await createRuntime(empty).exec(counter), 1);
});

test("a module from a package without a version throws as the app starts", () => {
  assert.throws(
    () => createRuntime({ moduleMap: { app: {} }, installedPackages: {} }),
    /The module map offers "app", but app isn't in package.json's dependencies/,
  );
});

// A runtime whose requests `answer` answers, keeping them: what a server
// answers, written out.
function serve(answer: (request: Request) => Response | Promise<Response>) {
  const requests: Request[] = [];
  const runtime = createRuntime({
    moduleMap: { app: { answer: 41 }, "app/extra": {} },
    installedPackages: { app: "1.0.0" },
    fetch: (request) => {
      requests.push(request);
      return answer(request);
    },
  });
  return { requests, runtime };
}
const javascript = (code: string, init?: ResponseInit) =>
  new Response(code, {
    ...init,
    headers: { "content-type": "text/javascript" },
  });

test("fetch sends the modules it provides, and runs what comes back", async () => {
  const { requests, runtime } = serve(() =>
    javascript('module.exports = require("app").answer + 1;'),
  );
  assert.equal(
    await runtime.fetch("https://api.test/answer", {
      headers: { "x-backtick-modules": "{}" },
    }),
    42,
  );
  assert.equal(requests[0]!.url, "https://api.test/answer");
  // the runtime's, whatever the caller sets
  assert.deepEqual(
    JSON.parse(requests[0]!.headers.get("x-backtick-modules")!),
    { app: "1.0.0", "app/extra": "1.0.0" },
  );
});

test("a bundle is run whatever its status, as a not-found screen", async () => {
  const { runtime } = serve(() =>
    javascript('module.exports = "not found";', { status: 404 }),
  );
  assert.equal(await runtime.fetch("https://api.test/missing"), "not found");
});

test("a bundle's type is matched whatever its case", async () => {
  const { runtime } = serve(
    () =>
      new Response("module.exports = 1;", {
        headers: { "content-type": "Text/JavaScript; charset=utf-8" },
      }),
  );
  assert.equal(await runtime.fetch("https://api.test/"), 1);
});

test("a refusal is a BundleFetchError, its code the server's", async () => {
  const { runtime } = serve(() =>
    Response.json(
      { name: "ClientVersionMismatch", message: "Can't import `Image`" },
      { status: 406 },
    ),
  );
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      error instanceof BundleFetchError &&
      isBundleFetchError(error) &&
      error.name === "BundleFetchError" &&
      error.code === "ClientVersionMismatch" &&
      error.response?.status === 406 &&
      error.response.bodyUsed === false &&
      /406: Can't import `Image`/.test(error.message),
  );
});

test("a server's error name never passes for the caller's abort", async () => {
  const { runtime } = serve(() =>
    Response.json({ name: "AbortError" }, { status: 502 }),
  );
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.name === "BundleFetchError" &&
      error.code === "AbortError",
  );
});

test("a refusal that isn't JSON is its own message", async () => {
  const { runtime } = serve(
    () => new Response("Internal Server Error", { status: 500 }),
  );
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.code === undefined &&
      error.response?.status === 500 &&
      /answered 500: Internal Server Error/.test(error.message),
  );
});

test("a refusal whose JSON names nothing is still a BundleFetchError", async () => {
  const { runtime } = serve(() => Response.json(null, { status: 502 }));
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.code === undefined &&
      /answered 502: null/.test(error.message),
  );
});

test("what isn't a bundle is a NotABundle, its body unread", async () => {
  const { runtime } = serve(
    () =>
      new Response("<html></html>", {
        headers: { "content-type": "text/html" },
      }),
  );
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.code === "NotABundle" &&
      error.response?.bodyUsed === false &&
      /answered text\/html, not a bundle: is it a Backtick route\?/.test(
        error.message,
      ),
  );
});

test("a server it can't reach is a BundleFetchError without a response", async () => {
  const down = new TypeError("fetch failed");
  const { runtime } = serve(() => {
    throw down;
  });
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.response === undefined &&
      error.cause === down &&
      /couldn't be reached: fetch failed/.test(error.message),
  );
});

test("an answer cut off as it downloads is a BundleFetchError too", async () => {
  const cut = new ReadableStream({
    pull: (controller) => controller.error(new TypeError("terminated")),
  });
  const { runtime } = serve(
    () => new Response(cut, { headers: { "content-type": "text/javascript" } }),
  );
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) =>
      isBundleFetchError(error) &&
      error.response === undefined &&
      /terminated/.test(error.message),
  );
});

test("an aborted fetch doesn't run what arrives after", async () => {
  const controller = new AbortController();
  const { runtime } = serve(() => {
    controller.abort();
    return javascript('globalThis.ran = true; module.exports = "ran";');
  });
  await assert.rejects(
    runtime.fetch("https://api.test/", { signal: controller.signal }),
    (error) => (error as Error).name === "AbortError",
  );
  assert.equal((globalThis as { ran?: boolean }).ran, undefined);
});

test("a fetch the caller aborts fails with the caller's own error", async () => {
  const controller = new AbortController();
  const aborted = Object.assign(new Error("aborted"), { name: "AbortError" });
  const { runtime } = serve(() => {
    controller.abort();
    throw aborted;
  });
  await assert.rejects(
    runtime.fetch("https://api.test/", { signal: controller.signal }),
    (error) => error === aborted,
  );
});
