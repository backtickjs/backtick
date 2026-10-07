import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "zqr0jsdf8ub6:17:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const outer = $splice0();\n    return $splice1(outer);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,KAAK,GAAGF,QAAA,EAAM;IACpB,OAAOC,QAAA,CAAAC,KAAA,CAGH;AACN,CAAC","names":["$splice0","$splice1","outer"],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["outer$zqr0jsdf8ub6$0"] },
  ],
  kind: "block",
};
const $module1 = {
  id: "zqr0jsdf8ub6:19:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $capture1) => {\n    const middle = 10;\n    return middle + $splice0($capture1);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBoB,CAAAA,QAAA,EAAAC,SAAA;IACd,MAAMC,MAAM,GAAG,EAAE;IACjB,OAAOA,MAAM,GAAGF,QAAA,CAAAC,SAAA,CAAkB;AACpC,CAAC","names":["$splice0","$capture1","middle"],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "outer$zqr0jsdf8ub6$0" },
  ],
  kind: "block",
};
const $module2 = {
  id: "zqr0jsdf8ub6:21:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBgCA,SAAA,IAAAA,SAAK","names":["$capture0"],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "outer$zqr0jsdf8ub6$0" }],
  kind: "expression",
};
const $module3 = {
  id: "zqr0jsdf8ub6:27:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0BYA,QAAA,IAAAA,QAAA,EAAM,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module4 = {
  id: "zqr0jsdf8ub6:38:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqCO,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAc,GAAGC,QAAA,EAAc","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module5 = {
  id: "zqr0jsdf8ub6:38:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqCiB,OAAC","names":[],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module6 = {
  id: "zqr0jsdf8ub6:38:31",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqCkC,OAAC","names":[],"ignoreList":[],"sources":["splices/host-wrapped-splice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new
// script, written at its own location outside the enclosing one, so nothing
// about it looks lexical. `same` hands back the template it was given: the
// script that lands at the hole *is* written inside the enclosing script's
// span, and still can't be read off that span, because only running `same` says
// it goes there. Anything that resolves a hole by comparing spans gets this one
// wrong.
function wrap(start) {
  return cs.create($module0, [
    start,
    foo(cs.create($module1, [same(cs.create($module2, []))])),
  ]);
}
function foo(start) {
  return cs.create($module3, [start]);
}
function same(script) {
  return script;
}
it("hostWrappedSplice", async (t) => {
  await snapshotCase(
    t,
    "hostWrappedSplice",
    cs.create($module4, [
      wrap(cs.create($module5, [])),
      wrap(cs.create($module6, [])),
    ]),
  );
});
