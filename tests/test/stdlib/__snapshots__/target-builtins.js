import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
const $module0 = {
  id: "24se5744y85zv:25:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1()());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwBmC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAM,EAAE,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["stdlib/target-builtins.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "24se5744y85zv:32:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1().get("greeting"));\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+BwB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAQ,CAACC,GAAG,CAAC,UAAU,CAAC,CAAC","names":["$splice0","$splice1","get"],"ignoreList":[],"sources":["stdlib/target-builtins.test.tsx"]}',
  dependencies: [],
};
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
      await evaluate(
        cs.create($module0, [
          { kind: "splice", value: createRoot, bindings: [] },
          { kind: "splice", value: greet, bindings: [] },
        ]),
      ),
      "hello",
    );
  });
  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(
      await evaluate(
        cs.create($module1, [
          { kind: "splice", value: createRoot, bindings: [] },
          { kind: "splice", value: storage, bindings: [] },
        ]),
      ),
      "hei",
    );
  });
});
