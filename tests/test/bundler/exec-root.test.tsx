import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  type Client,
  createImport,
  cs,
  exec,
} from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";

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

describe("execRoot, from @backtickjs/core/cjs", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs`$answer + 1`);
    assert.equal(await execRoot(root, { app: { answer: 41 } }), 42);
  });

  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs`$answer + 1`);
    await assert.rejects(
      execRoot(root, {}),
      /requires "app", which this app doesn't provide/,
    );
  });

  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs`$answer + 1`);
    const root = await bundleCjs(cs`$exec($inner)`);
    const value = await execRoot(root, { app: { answer: 41 } });
    assert.equal(value, 42);
  });

  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs`$answer + 1`);
    const root = await bundleCjs(cs`$exec($inner)`);
    await assert.rejects(
      execRoot(root, {}),
      /requires "app", which this app doesn't provide/,
    );
  });
});
