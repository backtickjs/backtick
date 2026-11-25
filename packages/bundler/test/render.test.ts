import assert from "node:assert/strict";
import { test } from "node:test";
import {
  type Bundle,
  type Client,
  createImport,
  createJsxElement,
  createRuntime,
  cs,
} from "@backtickjs/core";
import { Hono } from "hono";
import {
  BundlerError,
  UnsupportedImportError,
  createRender,
} from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

const request = (modules?: string) =>
  new Request("http://app.test/", {
    headers: modules === undefined ? {} : { "x-backtick-modules": modules },
  });

const phone = JSON.stringify({ app: "1.0.0" });

// Each refusal `render` answers, with its request, as `onBundlerError` hears
// it.
const heard: { error: BundlerError; request: Request }[] = [];
const render = createRender({
  onBundlerError: (error, request) => heard.push({ error, request }),
});

// What `render` answers `request` with, and what `onBundlerError` heard.
async function refused(request: Request, input: Client<unknown> = greet) {
  heard.length = 0;
  const response = await render(request, input);
  assert.equal(heard.length, 1);
  assert.equal(heard[0]!.request, request);
  return { response, error: heard[0]!.error };
}

test("a render is its input bundled as CommonJS for the client's modules", async () => {
  const response = await render(request(phone), cs`$greet("world")`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.match(await response.text(), /require\("app"\)/);
});

test("renders are never stored", async () => {
  const response = await render(request(phone), greet);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("a render answers with the status it's given", async () => {
  const response = await render(request(phone), greet, { status: 404 });
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/javascript");
});

test("the route's headers win over a render's own", async () => {
  const response = await render(request(phone), greet, {
    headers: { "cache-control": "max-age=60", "set-cookie": "seen=1" },
  });
  assert.equal(response.headers.get("cache-control"), "max-age=60");
  assert.equal(response.headers.get("set-cookie"), "seen=1");
  assert.equal(response.headers.get("content-type"), "text/javascript");
});

// What an app's `exec` throws for a response: a refusal's bundle runs to its
// error.
async function thrownBy(response: Response): Promise<Error> {
  const runtime = createRuntime({ moduleMap: {}, installedPackages: {} });
  return runtime.exec((await response.text()) as Bundle<never>).then(
    () => assert.fail("ran"),
    (error: unknown) => error as Error,
  );
}

test("a request that doesn't say what the app has is answered with a 400 that throws why", async () => {
  const { response, error } = await refused(request());
  assert.ok(error instanceof BundlerError);
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.equal(response.headers.get("cache-control"), "no-store");
  const text = await response.clone().text();
  assert.ok(text.startsWith('"use strict";\n'));
  const { name, message } = await thrownBy(response);
  assert.equal(name, "BundlerError");
  assert.match(message, /^x-backtick-modules is missing/);
});

test("modules that aren't JSON are answered with a 400 that throws why", async () => {
  const { response, error } = await refused(request("{"));
  assert.equal(response.status, 400);
  assert.ok(error.cause instanceof SyntaxError);
  const { message } = await thrownBy(response);
  assert.match(message, /^x-backtick-modules isn't JSON: /);
});

test("a version that isn't one is answered with a 400 that throws why", async () => {
  // Not a 500: comparing it with the import's would throw.
  const { response, error } = await refused(request('{"app": "not-semver"}'));
  assert.equal(response.status, 400);
  assert.match(error.message, /^The modules aren't \{ specifier: version \}/);
});

test("a client without a module the bundle needs is answered with a 406 that throws its name", async () => {
  const { response, error } = await refused(request("{}"));
  assert.ok(error instanceof UnsupportedImportError);
  assert.equal(error.imported, "greet");
  assert.equal(response.status, 406);
  const { name, message } = await thrownBy(response);
  assert.equal(name, "UnsupportedImportError");
  assert.equal(message, error.message);
});

test("what the bundler can't bundle is answered too, and heard", async () => {
  // A client tag drawn on the host: the bundler can't tell whose mistake, so
  // it's answered like any refusal, and `onBundlerError` hears it.
  const { response, error } = await refused(
    request(phone),
    cs`${createJsxElement("br", {})}`,
  );
  assert.equal(response.status, 400);
  assert.match(error.message, /`<br>`/);
});

test("a refusal keeps the route's headers, at its own status", async () => {
  const response = await render(request("{}"), greet, {
    status: 200,
    headers: { "set-cookie": "seen=1" },
  });
  assert.equal(response.status, 406);
  assert.equal(response.headers.get("set-cookie"), "seen=1");
});

test("a refusal is never stored, whatever the route caches", async () => {
  // One client's refusal, stored against the route's URL, would be served to
  // every client after it.
  const response = await render(request("{}"), greet, {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "application/javascript",
    },
  });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("content-type"), "text/javascript");
});

test("a refusal's status line is its own, not the route's", async () => {
  const response = await render(request("{}"), greet, {
    status: 404,
    statusText: "Not Found",
  });
  assert.equal(response.status, 406);
  assert.equal(response.statusText, "");
});

test("a render the bundler accepts isn't heard", async () => {
  heard.length = 0;
  await render(request(phone), greet);
  assert.equal(heard.length, 0);
});

test("a refusal is answered on any Fetch server, Hono's default handler included", async () => {
  // As an app with no `onError` serves it: nothing is thrown.
  const app = new Hono();
  app.get("/", (context) => render(context.req.raw, greet));
  const response = await app.request("/", {
    headers: { "x-backtick-modules": "{}" },
  });
  assert.equal(response.status, 406);
  const { name } = await thrownBy(response);
  assert.equal(name, "UnsupportedImportError");
});

test("what onBundlerError throws is thrown", async () => {
  const failing = createRender({
    onBundlerError: () => {
      throw new Error("logging is down");
    },
  });
  await assert.rejects(() => failing(request("{}"), greet), /logging is down/);
});

test("a refusal's message and name cross as they are", async () => {
  // An import's name is in its refusal's message.
  const tricky = createImport({
    name: 'a "quoted"\nline `ticked` ${x}',
    from: "app",
    version: "1.0.0",
  });
  const { response, error } = await refused(request("{}"), tricky);
  const thrown = await thrownBy(response);
  assert.equal(thrown.name, "UnsupportedImportError");
  assert.equal(thrown.message, error.message);
  assert.match(thrown.message, /a "quoted"\nline `ticked` \$\{x\}/);
});

test("an error a server component throws passes through as it is, unheard", async () => {
  heard.length = 0;
  const broken = new Error("broken");
  const Broken = () => {
    throw broken;
  };
  await assert.rejects(
    () => render(request(phone), cs`${createJsxElement(Broken, {})}`),
    (error) => error === broken,
  );
  assert.equal(heard.length, 0);
});

test("an error keeps its name when a minifier renames its class", async () => {
  // as a minifier leaves it: the class's own name shortened
  Object.defineProperty(UnsupportedImportError, "name", { value: "t" });
  const { response } = await refused(request("{}"));
  const { name } = await thrownBy(response);
  assert.equal(name, "UnsupportedImportError");
});
