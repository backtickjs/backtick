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
    map: '{"version":3,"mappings":"eAMgB,OAAC","names":[],"ignoreList":[],"sources":["deduplicated-scripts.test.tsx"]}',
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
        code: "export default $0 => ({\n  a: $0(),\n  b: $0()\n});",
        map: '{"version":3,"mappings":"eASkDA,EAAA,KAAC;EAAEC,CAAC,EAAED,EAAA,EAAK;EAAEE,CAAC,EAAEF,EAAA;AAAK,CAAE,CAAC","names":["$0","a","b"],"ignoreList":[],"sources":["deduplicated-scripts.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
