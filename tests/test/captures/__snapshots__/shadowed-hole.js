import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1wiy7dknp0llv:15:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const total = 1;\n    {\n        const total = 2;\n        return total + $splice0();\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcYA,QAAA;IACR,MAAMC,KAAK,GAAG,CAAC;IACf;QACE,MAAMA,KAAK,GAAG,CAAC;QACf,OAAOA,KAAK,GAAGD,QAAA,EAAS;IAC1B;AACF,CAAC","names":["$splice0","total"],"ignoreList":[],"sources":["captures/shadowed-hole.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module1 = {
  id: "1wiy7dknp0llv:28:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BO,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAuB,GAAGC,QAAA,EAAuB","names":["$splice0","$splice1"],"ignoreList":[],"sources":["captures/shadowed-hole.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "1wiy7dknp0llv:28:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 10;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2ByB,QAAE","names":[],"ignoreList":[],"sources":["captures/shadowed-hole.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module3 = {
  id: "1wiy7dknp0llv:28:48",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 20;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BmD,QAAE","names":[],"ignoreList":[],"sources":["captures/shadowed-hole.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and
// a block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment) {
  return cs.create($module0, [fragment]);
}
it("shadowedHole", async (t) => {
  await snapshotCase(
    t,
    "shadowedHole",
    cs.create($module1, [
      wrapShadowed(cs.create($module2, [])),
      wrapShadowed(cs.create($module3, [])),
    ]),
  );
});
