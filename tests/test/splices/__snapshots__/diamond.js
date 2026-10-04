import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "23y608t6y2wp3:10:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASc,OAAC","names":[],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [],
};
const $module1 = {
  id: "23y608t6y2wp3:12:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module2 = {
  id: "23y608t6y2wp3:16:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAecA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module3 = {
  id: "23y608t6y2wp3:20:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module4 = {
  id: "23y608t6y2wp3:24:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuBcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
const d0 = cs.create($module0, []);
const d1 = cs.create($module1, [d0]);
const d2 = cs.create($module2, [d1]);
const d3 = cs.create($module3, [d2]);
const d4 = cs.create($module4, [d3]);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
