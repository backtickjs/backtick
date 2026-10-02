import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  "2g4us6n03x6jl:7:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 7;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAMgB,OAAC","names":[],"ignoreList":[],"sources":["splices/deduplicated-scripts.test.tsx"]}',
  [],
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      "2g4us6n03x6jl:10:47",
      { params: [{ kind: "splice", value: leaf, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    a: $splice0(),\n    b: $splice0()\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBASkDA,QAAA,KAAC;IAAEC,CAAC,EAAED,QAAA,EAAK;IAAEE,CAAC,EAAEF,QAAA;CAAO,CAAC","names":["$splice0","a","b"],"ignoreList":[],"sources":["splices/deduplicated-scripts.test.tsx"]}',
      [],
    ),
  );
});
