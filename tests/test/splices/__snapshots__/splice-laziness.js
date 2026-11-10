import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1h2q1jtsjxrcw:13:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => flag => {\n    if (flag) {\n        return $splice0()();\n    }\n    return "skipped";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYYA,QAAA,IAACC,IAAa;IACtB,IAAIA,IAAI,EAAE;QACR,OAAOD,QAAA,EAAS,EAAE;IACpB;IACA,OAAO,SAAS;AAClB,CAAC","names":["$splice0","flag"],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module1 = {
  id: "1h2q1jtsjxrcw:21:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => "evaluated";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBc,YAAM,WAAW","names":[],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module2 = {
  id: "1h2q1jtsjxrcw:23:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    throw "the guarded fragment must never evaluate";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBkB;IAChB,MAAM,0CAA0C;AAClD,CAAC","names":[],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module3 = {
  id: "1h2q1jtsjxrcw:31:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    taken: $splice0()(true),\n    skipped: $splice1()(false)\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8BO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEF,QAAA,EAAY,CAAC,IAAI,CAAC;IACzBG,OAAO,EAAEF,QAAA,EAAgB,CAAC,KAAK;CAChC,CAAC","names":["$splice0","$splice1","taken","skipped"],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// A host helper reused with different splices makes its script polymorphic:
// every call site passes its splice as a thunk, and the body reads it at the
// hole. A script is one value, made at load, so code that must not run until
// it's reached is a function, called where it's reached, as in TypeScript:
// `guard(broken)(false)` never calls `broken`.
function guard(fragment) {
  return cs.create($module0, [fragment]);
}
const ok = cs.create($module1, []);
const broken = cs.create($module2, []);
it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.create($module3, [guard(ok), guard(broken)]),
  );
});
