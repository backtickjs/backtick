import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createImport } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/solid-js/testing";

// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are. `#app` is this package's
// `imports` entry, which stands in for a page's import map.
const greet = createImport<() => string>({ name: "greet", from: "#app" });
const storage = createImport<{ get: (key: string) => string | null }>({
  name: "storage",
  from: "#app",
});

describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle imports
  // from that specifier.
  it("is what that specifier resolves to", async () => {
    assert.equal(await evaluate(cs.lift(cs.splice((greet) satisfies typeof cs.Spliceable)())), "hello");
  });

  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(await evaluate(cs.lift(cs.splice((storage) satisfies typeof cs.Spliceable).get("greeting"))), "hei");
  });
});
