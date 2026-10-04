import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3q2gz79xhvvfp:8:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const x = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOiC;IAC/B,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3q2gz79xhvvfp:12:31",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWkCA,QAAA;IAChCA,QAAA,EAAQ;AACV,CAAC","names":["$splice0"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "3q2gz79xhvvfp:20:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBOA,QAAA;IACDA,QAAA,EAAS;AACX,CAAC","names":["$splice0"],"ignoreList":[],"sources":["control-flow/action-composition.test.tsx"]}',
  dependencies: [],
};
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create($module0, []);
const composed = cs.create($module1, [
  { kind: "splice", value: effects, bindings: [] },
]);
it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.create($module2, [{ kind: "splice", value: composed, bindings: [] }]),
  );
});
