import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1ownu51n7sgt:8:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    const x = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOuC;IACrC,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "1ownu51n7sgt:12:37",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    $splice0()();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWwCA,QAAA;IACtCA,QAAA,EAAQ,EAAE;AACZ,CAAC","names":["$splice0"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module2 = {
  id: "1ownu51n7sgt:20:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    $splice0()();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBOA,QAAA;IACDA,QAAA,EAAS,EAAE;AACb,CAAC","names":["$splice0"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
// Code that only does something is a function, called where it runs, and
// composes as a function calling it.
const effects = cs.create($module0, []);
const composed = cs.create($module1, [effects]);
it("actionComposition", async (t) => {
  await snapshotCase(t, "actionComposition", cs.create($module2, [composed]));
});
