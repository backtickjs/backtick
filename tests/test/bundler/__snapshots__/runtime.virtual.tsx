import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  type Client,
  createImport,
  createRuntime,
  cs,
  runtime,
} from "@backtickjs/core";

// What an app provides, for a bundle to import.
const answer = createImport<number>({
  name: "answer",
  from: "app",
  version: "1.0.0",
});

async function bundleOf<T>(value: Client<T>): Promise<Bundle<T>> {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate().code;
}

// A runtime providing `app`, whose requests are recorded and answered with
// `bundles` by path.
function appRuntime(bundles: Record<string, string>) {
  const requests: Request[] = [];
  const runtime = createRuntime({
    moduleMap: { app: { answer: 41 } },
    installedPackages: { app: "1.0.0" },
    fetch(request) {
      requests.push(request);
      return new Response(bundles[new URL(request.url).pathname]);
    },
  });
  return { runtime, requests };
}

// A bundle run as a page runs one: no runtime, a `require` of its own.
function runOnPage(code: string): unknown {
  const module = { exports: {} as unknown };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    () => ({ answer: 41 }),
  );
  return module.exports;
}

describe("$runtime", () => {
  it("fetches and runs a bundle through the runtime that ran the script", async () => {
    const screen = await bundleOf(cs.lift((() => (cs.splice((answer))) + 1)()));
    const { runtime: app, requests } = appRuntime({ "/screen": screen });
    const root = await bundleOf(cs.lift((() => (async () => {
      const __cs_response = await (cs.splice((runtime))).fetch("https://app.example/screen");
      return (cs.splice((runtime))).exec((await __cs_response.text()) as never);
    })())()));
    assert.equal(await await app.exec(root), 42);
    assert.equal(
      requests[0]!.headers.get("x-backtick-modules"),
      '{"app":"1.0.0"}',
    );
  });

  it("is the same runtime in a bundle run with $exec", async () => {
    const inner = await bundleOf(cs.lift((() => (cs.splice((runtime))))()));
    const { runtime: app } = appRuntime({});
    const outer = await bundleOf(cs.lift((() => (cs.splice((runtime))).exec((cs.splice((inner)))))()));
    assert.equal(await await app.exec(outer), app);
  });

  it("throws as the bundle starts where nothing provides one", async () => {
    const root = await bundleOf(cs.lift((() => () => (cs.splice((runtime))))()));
    assert.throws(
      () => runOnPage(root),
      /\$runtime is missing: run this bundle with createRuntime/,
    );
  });

  it("is declared only in a bundle that reads it", async () => {
    assert.doesNotMatch(await bundleOf(cs.lift((() => 1)())), /\$runtime/);
  });
});
