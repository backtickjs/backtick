import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { draw } from "@backtickjs/solid-js/testing";
import { createRoot } from "solid-js";
// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are. `app` is an entry of the import
// map the tests resolve with (`tsxHooks.ts`), as it would be of a page's.
const greet = createImport({ name: "greet", from: "app" });
const storage = createImport({
  name: "storage",
  from: "app",
});
describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle imports
  // from that specifier.
  it("is what that specifier resolves to", async () => {
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "o4m6qpcv17jb:20:39",
            { params: [{ kind: "splice", value: greet, bindings: [] }] },
            "($splice0) => $splice0()()",
            '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AAmB0C,cAAA,UAAM,EAAE"}',
          ),
        ),
      ),
      "hello",
    );
  });
  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "o4m6qpcv17jb:26:39",
            { params: [{ kind: "splice", value: storage, bindings: [] }] },
            '($splice0) => $splice0().get("greeting")',
            '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AAyB0C,cAAA,UAAQ,CAAC,GAAG,CAAC,UAAU,CAAC"}',
          ),
        ),
      ),
      "hei",
    );
  });
});
