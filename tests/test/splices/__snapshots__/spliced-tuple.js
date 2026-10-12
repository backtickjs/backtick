import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "g51hocejus75:7:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 4;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMwB,OAAC","names":[],"ignoreList":[],"sources":["splices/spliced-tuple.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "g51hocejus75:13:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [x, z] = $splice0();\n    return x + z;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYOA,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,CAAC,CAAC,GAAoCF,QAAA,EAAS;IACzD,OAAOC,CAAC,GAAGC,CAAC;AACd,CAAC","names":["$splice0","x","z"],"ignoreList":[],"sources":["splices/spliced-tuple.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
// A tuple crosses as a tuple, labels included, so a script can type it as the
// host did. A script member arrives as what it computes, in its position.
const position = [3, cs.create($module0, [])];
it("splicedTuple", async (t) => {
  await snapshotCase(t, "splicedTuple", cs.create($module1, [position]));
});
