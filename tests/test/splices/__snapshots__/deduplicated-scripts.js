import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2g4us6n03x6jl:7:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 7;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMgB,OAAC","names":[],"ignoreList":[],"sources":["splices/deduplicated-scripts.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "2g4us6n03x6jl:10:47",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    a: $splice0(),\n    b: $splice1()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASkD,CAAAA,QAAA,EAAAC,QAAA,MAAC;IAAEC,CAAC,EAAEF,QAAA,EAAK;IAAEG,CAAC,EAAEF,QAAA;CAAO,CAAC","names":["$splice0","$splice1","a","b"],"ignoreList":[],"sources":["splices/deduplicated-scripts.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create($module0, []);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create($module1, [leaf, leaf]),
  );
});
