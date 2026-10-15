import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  createImport,
  cs,
  exec,
  execRoot,
  type Spliceable,
  type Spliced,
} from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";

// What an app provides beside Solid, for a bundle to import.
const answer = createImport<number>({
  name: "answer",
  from: "app",
  version: "^1.0.0",
});

async function bundleCjs<T extends Spliceable>(
  value: T,
): Promise<Bundle<Spliced<T>>> {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate({ format: "cjs" }).code;
}

describe("execRoot", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    assert.equal(
      await execRoot(root, {
        format: "cjs",
        moduleMap: { app: { answer: 41 } },
      }),
      42,
    );
  });

  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    await assert.rejects(
      execRoot(root, { format: "cjs", moduleMap: {} }),
      /requires "app", which this app doesn't provide/,
    );
  });

  it("runs an ES module, the page's import map answering it", async () => {
    const { code: root } = await bundle(cs.lift((() => {
      const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(1);
      __cs_setCount(__cs_count() + 1);
      return __cs_count();
    })()));
    assert.equal(await execRoot(root, { format: "es" }), 2);
  });

  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    const root = await bundleCjs(cs.lift((() => (cs.splice((exec)))((cs.splice((inner)))))()));
    const value = await execRoot(root, {
      format: "cjs",
      moduleMap: { app: { answer: 41 } },
    });
    assert.equal(value, 42);
  });

  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs.lift((() => (cs.splice((answer))) + 1)()));
    const root = await bundleCjs(cs.lift((() => (cs.splice((exec)))((cs.splice((inner)))))()));
    await assert.rejects(
      execRoot(root, { format: "cjs", moduleMap: {} }),
      /requires "app", which this app doesn't provide/,
    );
  });
});
