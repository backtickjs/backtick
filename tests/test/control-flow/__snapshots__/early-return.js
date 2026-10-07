import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "33mpmt8iae2c7:10:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 0;\n    if (n === 0) {\n        return;\n    }\n    n = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,IAAIA,CAAC,KAAK,CAAC,EAAE;QACX;IACF;IACAA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["control-flow/early-return.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A bare `return` exits an action early; the completion is null either way.
it("earlyReturn", async (t) => {
  await snapshotCase(t, "earlyReturn", cs.create($module0, []));
});
