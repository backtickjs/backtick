import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  createImport,
  cs,
  run,
  type Spliceable,
  type Spliced,
} from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { bundle, evaluate } from "../evaluate.ts";

// What an app provides beside Solid, for a bundle to import.
const answer = createImport<number>({
  name: "answer",
  from: "app",
  version: "^1.0.0",
});

// A bundle as CommonJS, run as a React Native app runs one: handed a
// `require` answering what the app provides.
async function bundleCjs<T extends Spliceable>(
  value: T,
): Promise<Bundle<Spliced<T>>> {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate({ format: "cjs" }).code;
}
function runCjs(code: string, provided: Record<string, unknown>): unknown {
  const module = { exports: {} as unknown };
  const require = (specifier: string) => provided[specifier];
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  return module.exports;
}

describe("run", () => {
  it("runs an ES module, to its value", async () => {
    const { code: answer } = await bundle(cs`40 + 2`);
    const value = await evaluate(cs`$run($answer)`);
    assert.equal(await value, 42);
  });

  it("answers its imports as the page answers the bundle's", async () => {
    const { code: counted } = await bundle(cs`{
      const [count, setCount] = $createSignal(1);
      setCount(count() + 1);
      return count();
    }`);
    const value = await evaluate(cs`$run($counted)`);
    assert.equal(await value, 2);
  });

  it("runs CommonJS with the require the bundle was handed", async () => {
    const inner = await bundleCjs(cs`$answer + 1`);
    const outer = await bundleCjs(cs`$run($inner)`);
    const value = runCjs(outer, { app: { answer: 41 } }) as Promise<number>;
    assert.equal(await value, 42);
  });

  it("is declared only in a bundle that reads it", async () => {
    assert.doesNotMatch(await bundleCjs(cs`1`), /\$run/);
  });
});
