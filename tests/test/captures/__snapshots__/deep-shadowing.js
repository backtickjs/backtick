import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "8up2nb5o0inm:7:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const base = 1;\n    return base + $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMYA,QAAA;IACR,MAAMC,IAAI,GAAG,CAAC;IACd,OAAOA,IAAI,GAAGD,QAAA,EAAoB;AACpC,CAAC","names":["$splice0","base"],"ignoreList":[],"sources":["captures/deep-shadowing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "8up2nb5o0inm:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const base = 2;\n    return base * $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaYA,QAAA;IACR,MAAMC,IAAI,GAAG,CAAC;IACd,OAAOA,IAAI,GAAGD,QAAA,EAAM;AACtB,CAAC","names":["$splice0","base"],"ignoreList":[],"sources":["captures/deep-shadowing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module2 = {
  id: "8up2nb5o0inm:28:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const base = 10;\n    return $splice0(base);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BOA,QAAA;IACD,MAAMC,IAAI,GAAG,EAAE;IACf,OAAOD,QAAA,CAAAC,IAAA,CAAsB;AAC/B,CAAC","names":["$splice0","base"],"ignoreList":[],"sources":["captures/deep-shadowing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["base$8up2nb5o0inm$2"] }],
};
const $module3 = {
  id: "8up2nb5o0inm:30:25",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6B4BA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["captures/deep-shadowing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "base$8up2nb5o0inm$2" }],
};
function outerBase(inner) {
  return cs.create($module0, [middleBase(inner)]);
}
function middleBase(inner) {
  return cs.create($module1, [inner]);
}
// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.create($module2, [outerBase(cs.create($module3, []))]),
  );
});
