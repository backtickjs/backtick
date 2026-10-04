import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "bphb1svo1jv3:18:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const base = 100;\n    return $splice0(base);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBYA,QAAA;IACR,MAAMC,IAAI,GAAG,GAAG;IAChB,OAAOD,QAAA,CAAAC,IAAA,CAAsB;AAC/B,CAAC","names":["$splice0","base"],"ignoreList":[],"sources":["captures/foreign-capture-shadow.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["base$bphb1svo1jv3$0"] }],
};
const $module1 = {
  id: "bphb1svo1jv3:20:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $capture1) => $capture1 + $splice0($capture1);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBgB,CAAAA,QAAA,EAAAC,SAAA,KAAAA,SAAI,GAAGD,QAAA,CAAAC,SAAA,CAAQ","names":["$splice0","$capture1"],"ignoreList":[],"sources":["captures/foreign-capture-shadow.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "base$bphb1svo1jv3$0" },
  ],
};
const $module2 = {
  id: "bphb1svo1jv3:28:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const base = 1;\n    return $splice0(base);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BOA,QAAA;IACD,MAAMC,IAAI,GAAG,CAAC;IACd,OAAOD,QAAA,CAAAC,IAAA,CAAsB;AAC/B,CAAC","names":["$splice0","base"],"ignoreList":[],"sources":["captures/foreign-capture-shadow.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["base$bphb1svo1jv3$1"] }],
};
const $module3 = {
  id: "bphb1svo1jv3:30:25",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6B4BA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["captures/foreign-capture-shadow.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "base$bphb1svo1jv3$1" }],
};
// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried) {
  return cs.create($module0, [cs.create($module1, [carried])]);
}
it("foreignCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "foreignCaptureShadow",
    cs.create($module2, [innerBase(cs.create($module3, []))]),
  );
});
