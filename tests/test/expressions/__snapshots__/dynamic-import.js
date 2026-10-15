import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "iwljw7a0dcd7:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => (async () => (await import($splice0())).default)();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWOA,QAAA,KAAC,YAAY,CAAC,MAAM,MAAM,CAACA,QAAA,EAAI,CAAC,EAAEC,OAAO,GAAG","names":["$splice0","default"],"ignoreList":[],"sources":["expressions/dynamic-import.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const url = "data:text/javascript,export default 42";
// `import()` in a script is the language's, as in the same code written by
// hand, not a module of the bundle's own.
it("a dynamic import imports", async () => {
  const value = await evaluate(cs.create($module0, [url]));
  assert.equal(value, 42);
});
