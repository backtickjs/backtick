import assert from "node:assert/strict";
import { test } from "node:test";
import { type Bundle, createRuntime } from "../dist/index.js";

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

// A runtime whose requests `answer` answers, keeping them.
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

test("fetch sends the modules the runtime provides, always its own", async () => {
  const { requests, runtime } = serve(() => new Response("ok"));
  await runtime.fetch("https://api.test/answer", {
    method: "POST",
    headers: { "x-backtick-modules": "{}", "x-other": "kept" },
  });
  const [request] = requests;
  assert.equal(request!.url, "https://api.test/answer");
  assert.equal(request!.method, "POST");
  assert.equal(request!.headers.get("x-other"), "kept");
  assert.deepEqual(JSON.parse(request!.headers.get("x-backtick-modules")!), {
    app: "1.0.0",
    "app/extra": "1.0.0",
  });
});

test("fetch answers as fetch does, whatever the status, its body unread", async () => {
  const refused = new Response("update the app", { status: 406 });
  const { runtime } = serve(() => refused);
  const response = await runtime.fetch("https://api.test/");
  assert.equal(response, refused);
  assert.equal(response.bodyUsed, false);
});

test("fetch's own errors pass through", async () => {
  const down = new TypeError("Network request failed");
  const { runtime } = serve(() => {
    throw down;
  });
  await assert.rejects(
    runtime.fetch("https://api.test/"),
    (error) => error === down,
  );
});

test("what fetch answers runs with exec", async () => {
  const { runtime } = serve(
    () => new Response('module.exports = require("app").answer + 1;'),
  );
  const response = await runtime.fetch("https://api.test/");
  assert.equal(
    await runtime.exec((await response.text()) as Bundle<number>),
    42,
  );
});
