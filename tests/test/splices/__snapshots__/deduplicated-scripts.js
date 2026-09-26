import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  "2g4us6n03x6jl:7:13",
  { params: [] },
  {
    code: "export default () => 7;",
    map: '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["deduplicated-scripts.test.tsx"],"names":[],"mappings":"eAMgB,MAAA,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      "2g4us6n03x6jl:10:47",
      { params: [{ kind: "splice", value: leaf, bindings: [] }] },
      {
        code: "export default ($0) => ({ a: $0(), b: $0() });",
        map: '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["deduplicated-scripts.test.tsx"],"names":[],"mappings":"eASkD,QAAA,CAAC,EAAE,CAAC,EAAE,IAAK,EAAE,CAAC,EAAE,IAAK,EAAE,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
