import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "22sufdxid1i7s:18:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const outer = $splice0();\n    return $splice1(outer);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,KAAK,GAAGF,QAAA,EAAM;IACpB,OAAOC,QAAA,CAAAC,KAAA,CAGJ;AACL,CAAC","names":["$splice0","$splice1","outer"],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["outer$22sufdxid1i7s$0"] },
  ],
};
const $module1 = {
  id: "22sufdxid1i7s:20:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $capture1) => {\n    const middle = 10;\n    return middle + $splice0($capture1);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBgB,CAAAA,QAAA,EAAAC,SAAA;IACV,MAAMC,MAAM,GAAG,EAAE;IACjB,OAAOA,MAAM,GAAGF,QAAA,CAAAC,SAAA,CAAY;AAC9B,CAAC","names":["$splice0","$capture1","middle"],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "outer$22sufdxid1i7s$0" },
  ],
};
const $module2 = {
  id: "22sufdxid1i7s:22:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqB2BA,SAAA,IAAAA,SAAK","names":["$capture0"],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "outer$22sufdxid1i7s$0" }],
};
const $module3 = {
  id: "22sufdxid1i7s:28:39",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2B0C,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAc,GAAGC,QAAA,EAAc","names":["$splice0","$splice1"],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
const $module4 = {
  id: "22sufdxid1i7s:28:49",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BoD,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [],
};
const $module5 = {
  id: "22sufdxid1i7s:28:66",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BqE,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-capture.test.tsx"]}',
  dependencies: [],
  params: [],
};
// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start) {
  return cs.create($module0, [
    start,
    cs.create($module1, [cs.create($module2, [])]),
  ]);
}
it("deepCapture", async (t) => {
  await snapshotCase(
    t,
    "deepCapture",
    cs.create($module3, [
      wrap(cs.create($module4, [])),
      wrap(cs.create($module5, [])),
    ]),
  );
});
