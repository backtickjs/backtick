import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "17gesq3jbfgu2:9:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQ4CA,QAAA,IAAAA,QAAA,EAAI","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "17gesq3jbfgu2:16:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeqC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAQ,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "17gesq3jbfgu2:22:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqBqC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAQ,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "17gesq3jbfgu2:27:44",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0B+CA,QAAA,IAAAA,QAAA,EAAQ","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs.create($module0, [1]));
});
// NaN, the infinities, -0 and bigints arrive as themselves, written as in
// source.
it("non-finite numbers, negative zero and bigints arrive as themselves", async () => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  const arrived = await evaluate(cs.create($module1, [createRoot, numbers]));
  assert.ok(Number.isNaN(arrived[0]));
  assert.equal(arrived[1], Infinity);
  assert.equal(arrived[2], -Infinity);
  assert.ok(Object.is(arrived[3], -0));
  const bigints = [12345678901234567890n, -1n];
  assert.deepEqual(
    await evaluate(cs.create($module2, [createRoot, bigints])),
    bigints,
  );
});
it("nonFiniteNumbers", async (t) => {
  const numbers = [NaN, Infinity, -Infinity, -0, 12345678901234567890n, -1n];
  await snapshotCase(t, "nonFiniteNumbers", cs.create($module3, [numbers]));
});
