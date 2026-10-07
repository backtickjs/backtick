import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3cex0hh0qp6qz:6:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAKY,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAI,GAAGC,QAAA,EAAI","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "3cex0hh0qp6qz:13:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    x: $splice0(),\n    y: $splice1()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,CAAC,EAAEF,QAAA,EAAoB;IACvBG,CAAC,EAAEF,QAAA;CACJ,CAAC","names":["$splice0","$splice1","x","y"],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "3cex0hh0qp6qz:14:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAakB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module3 = {
  id: "3cex0hh0qp6qz:14:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAayB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module4 = {
  id: "3cex0hh0qp6qz:15:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 3;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAckB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module5 = {
  id: "3cex0hh0qp6qz:15:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 4;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcyB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
function add(lhs, rhs) {
  return cs.create($module0, [lhs, rhs]);
}
it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.create($module1, [
      add(cs.create($module2, []), cs.create($module3, [])),
      add(cs.create($module4, []), cs.create($module5, [])),
    ]),
  );
});
