import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
const d0 = cs.create(
  "23y608t6y2wp3:10:11",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBASc,OAAC","names":[],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  [],
);
const d1 = cs.create(
  "23y608t6y2wp3:12:11",
  { params: [{ kind: "splice", value: d0, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAWcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  [],
);
const d2 = cs.create(
  "23y608t6y2wp3:16:11",
  { params: [{ kind: "splice", value: d1, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAecA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  [],
);
const d3 = cs.create(
  "23y608t6y2wp3:20:11",
  { params: [{ kind: "splice", value: d2, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAmBcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  [],
);
const d4 = cs.create(
  "23y608t6y2wp3:24:11",
  { params: [{ kind: "splice", value: d3, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0() + $splice0();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAuBcA,QAAA;IACZ,OAAOA,QAAA,EAAG,GAAGA,QAAA,EAAG;AAClB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/diamond.test.tsx"]}',
  [],
);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
