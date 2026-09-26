import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  "2g4us6n03x6jl:7:13",
  { params: [] },
  "() => 7",
  '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["splices/deduplicated-scripts.test.tsx"],"names":[],"mappings":"AAMgB,MAAA,CAAC"}',
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      "2g4us6n03x6jl:10:47",
      { params: [{ kind: "splice", value: leaf, bindings: [] }] },
      "($splice0) => ({ a: $splice0(), b: $splice0() })",
      '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["splices/deduplicated-scripts.test.tsx"],"names":[],"mappings":"AASkD,cAAA,CAAC,EAAE,CAAC,EAAE,UAAK,EAAE,CAAC,EAAE,UAAK,EAAE,CAAC"}',
    ),
  );
});
