import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2rqwzcdfi281b:7:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMY,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAI,GAAGC,QAAA,EAAI","names":["$splice0","$splice1"],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "2rqwzcdfi281b:11:45",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUgDA,QAAA,IAAAA,QAAA,EAAoB","names":["$splice0"],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "2rqwzcdfi281b:11:54",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUyD,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module3 = {
  id: "2rqwzcdfi281b:11:61",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUgE,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
function add(lhs, rhs) {
  return cs.create($module0, [lhs, rhs]);
}
it("deepNestedScripts", async (t) => {
  await snapshotCase(
    t,
    "deepNestedScripts",
    cs.create($module1, [
      add(cs.create($module2, []), cs.create($module3, [])),
    ]),
  );
});
