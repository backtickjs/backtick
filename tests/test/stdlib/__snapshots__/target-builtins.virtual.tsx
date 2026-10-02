import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";

// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are. `app` is an entry of the import
// map the tests resolve with (`tsxHooks.ts`), as it would be of a page's.
const greet = createImport<() => string>({
  name: "greet",
  from: "app",
  version: "^1.0.0",
});
const storage = createImport<{ get: (key: string) => string | null }>({
  name: "storage",
  from: "app",
  version: "^1.0.0",
});

describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle imports
  // from that specifier.
  it("is what that specifier resolves to", async () => {
    assert.equal(await evaluate(cs.lift((() => cs.splice((createRoot))(() => cs.splice((greet))()))())), "hello");
  });

  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(
      await evaluate(cs.lift((() => cs.splice((createRoot))(() => cs.splice((storage)).get("greeting")))())),
      "hei",
    );
  });
});
