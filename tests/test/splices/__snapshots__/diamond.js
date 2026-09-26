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
  {
    code: "export default () => 1;",
    map: '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eASc,MAAA,CAAC"}',
  },
);
const d1 = cs.create(
  "23y608t6y2wp3:12:11",
  { params: [{ kind: "splice", value: d0, bindings: [] }] },
  {
    code: "export default ($0) => {\n    return $0() + $0();\n};",
    map: '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAWc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
  },
);
const d2 = cs.create(
  "23y608t6y2wp3:16:11",
  { params: [{ kind: "splice", value: d1, bindings: [] }] },
  {
    code: "export default ($0) => {\n    return $0() + $0();\n};",
    map: '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAec;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
  },
);
const d3 = cs.create(
  "23y608t6y2wp3:20:11",
  { params: [{ kind: "splice", value: d2, bindings: [] }] },
  {
    code: "export default ($0) => {\n    return $0() + $0();\n};",
    map: '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAmBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
  },
);
const d4 = cs.create(
  "23y608t6y2wp3:24:11",
  { params: [{ kind: "splice", value: d3, bindings: [] }] },
  {
    code: "export default ($0) => {\n    return $0() + $0();\n};",
    map: '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAuBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
  },
);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
