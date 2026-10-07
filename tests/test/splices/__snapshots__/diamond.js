import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1v7gwc56n71e7:9:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQc,OAAC","names":[],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "1v7gwc56n71e7:11:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUc,CAAAA,QAAA,EAAAC,QAAA;IACZ,OAAOD,QAAA,EAAG,GAAGC,QAAA,EAAG;AAClB,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const $module2 = {
  id: "1v7gwc56n71e7:15:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcc,CAAAA,QAAA,EAAAC,QAAA;IACZ,OAAOD,QAAA,EAAG,GAAGC,QAAA,EAAG;AAClB,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const $module3 = {
  id: "1v7gwc56n71e7:19:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBc,CAAAA,QAAA,EAAAC,QAAA;IACZ,OAAOD,QAAA,EAAG,GAAGC,QAAA,EAAG;AAClB,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const $module4 = {
  id: "1v7gwc56n71e7:23:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBc,CAAAA,QAAA,EAAAC,QAAA;IACZ,OAAOD,QAAA,EAAG,GAAGC,QAAA,EAAG;AAClB,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. Each splice is
// rendered where it stands, so the bundle's calls follow every path: 2^depth
// calls to the bottom level. Each script's module is still declared once.
const d0 = cs.create($module0, []);
const d1 = cs.create($module1, [d0, d0]);
const d2 = cs.create($module2, [d1, d1]);
const d3 = cs.create($module3, [d2, d2]);
const d4 = cs.create($module4, [d3, d3]);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
