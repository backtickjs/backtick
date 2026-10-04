import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1z8sn9rs7fbwb:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let total = 0;\n    for (let i = 0; i < 5; i = i + 1) {\n        total = total + i;\n    }\n    return total;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,IAAIA,KAAK,GAAG,CAAC;IACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAChCD,KAAK,GAAGA,KAAK,GAAGC,CAAC;IACnB;IACA,OAAOD,KAAK;AACd,CAAC","names":["total","i"],"ignoreList":[],"sources":["control-flow/for-loop.test.tsx"]}',
  dependencies: [],
  params: [],
};
// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(t, "forLoop", cs.create($module0, []));
});
