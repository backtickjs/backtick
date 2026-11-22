import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  type Client,
  createImport,
  createRuntime,
  cs,
  exec,
} from "@backtickjs/core";

// What an app provides beside Solid, for a bundle to import.
const answer = createImport<number>({
  name: "answer",
  from: "app",
  version: "1.0.0",
});

async function bundleCjs<T>(value: Client<T>): Promise<Bundle<T>> {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate().code;
}

// A runtime providing `app`, or nothing.
const withApp = () =>
  createRuntime({
    moduleMap: { app: { answer: 41 } },
    installedPackages: { app: "1.0.0" },
  });
const withNothing = () =>
  createRuntime({ moduleMap: {}, installedPackages: {} });

describe("a runtime's exec", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    assert.equal(await withApp().exec(root), 42);
  });

  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    await assert.rejects(
      withNothing().exec(root),
      /requires "app", which this app doesn't provide/,
    );
  });

  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    const root = await bundleCjs(cs.lift((() => (cs.splice((exec)))((cs.splice((inner)))))()));
    const value = await withApp().exec(root);
    assert.equal(value, 42);
  });

  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    const root = await bundleCjs(cs.lift((() => (cs.splice((exec)))((cs.splice((inner)))))()));
    await assert.rejects(
      withNothing().exec(root),
      /requires "app", which this app doesn't provide/,
    );
  });
});
