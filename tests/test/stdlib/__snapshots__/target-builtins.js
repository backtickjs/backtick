import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { evaluate } from "@backtickjs/solid-js/testing";
// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are. `#app` is this package's
// `imports` entry, which stands in for a page's import map.
const greet = createImport({ name: "greet", from: "#app" });
const storage = createImport({
  name: "storage",
  from: "#app",
});
describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle imports
  // from that specifier.
  it("is what that specifier resolves to", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "3hpr60pg5f4i:19:32",
          { params: [{ kind: "splice", value: greet, bindings: [] }] },
          "($splice0) => $splice0()()",
          '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AAkBmC,cAAA,UAAM,EAAE"}',
        ),
      ),
      "hello",
    );
  });
  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(
      await evaluate(
        cs.create(
          "3hpr60pg5f4i:25:32",
          { params: [{ kind: "splice", value: storage, bindings: [] }] },
          '($splice0) => $splice0().get("greeting")',
          '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["stdlib/target-builtins.test.tsx"],"names":[],"mappings":"AAwBmC,cAAA,UAAQ,CAAC,GAAG,CAAC,UAAU,CAAC"}',
        ),
      ),
      "hei",
    );
  });
});
