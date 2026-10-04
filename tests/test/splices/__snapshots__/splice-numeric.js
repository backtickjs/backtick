import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "pyy2xapmkswv:6:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAK4CA,QAAA,IAAAA,QAAA,EAAI","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
  dependencies: [],
};
it("spliceNumeric", async (t) => {
  await snapshotCase(
    t,
    "spliceNumeric",
    cs.create($module0, [{ kind: "splice", value: 1, bindings: [] }]),
  );
});
