import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "wxs5fx90icfr:9:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQ4CA,QAAA,IAAAA,QAAA,EAAI","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "wxs5fx90icfr:17:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBqC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAQ,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "wxs5fx90icfr:26:44",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyB+CA,QAAA,IAAAA,QAAA,EAAQ","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs.create($module0, [1]));
});
// A number without a literal arrives as itself: written as what computes it,
// `0 / 0` for NaN, `1 / 0` and `-1 / 0` for the infinities, `-0` for negative
// zero.
it("non-finite numbers and negative zero arrive as themselves", async () => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  const arrived = await evaluate(cs.create($module1, [createRoot, numbers]));
  assert.ok(Number.isNaN(arrived[0]));
  assert.equal(arrived[1], Infinity);
  assert.equal(arrived[2], -Infinity);
  assert.ok(Object.is(arrived[3], -0));
});
it("nonFiniteNumbers", async (t) => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  await snapshotCase(t, "nonFiniteNumbers", cs.create($module2, [numbers]));
});
