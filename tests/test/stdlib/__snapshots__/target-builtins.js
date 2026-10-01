import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "solid-js";
// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are. `app` is an entry of the import
// map the tests resolve with (`tsxHooks.ts`), as it would be of a page's.
const greet = createImport({
  name: "greet",
  from: "app",
  version: "^1.0.0",
});
const storage = createImport({
  name: "storage",
  from: "app",
  version: "^1.0.0",
});
describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle imports
  // from that specifier.
  it("is what that specifier resolves to", async () => {
    assert.equal(
      createRoot(
        await evaluate(
          cs.create(
            "21t7r7s7w4sel:25:43",
            { params: [{ kind: "splice", value: greet, bindings: [] }] },
            "($splice0) => () => $splice0()()",
            '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AAwB8C,cAAA,GAAG,EAAE,CAAC,UAAM,EAAE"}',
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
        await evaluate(
          cs.create(
            "21t7r7s7w4sel:31:43",
            { params: [{ kind: "splice", value: storage, bindings: [] }] },
            '($splice0) => () => $splice0().get("greeting")',
            '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AA8B8C,cAAA,GAAG,EAAE,CAAC,UAAQ,CAAC,GAAG,CAAC,UAAU,CAAC"}',
          ),
        ),
      ),
      "hei",
    );
  });
});
