import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1e4ingeabxazf:6:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAKuC,OAAC","names":[],"ignoreList":[],"sources":["expressions/constant.test.tsx"]}',
  dependencies: [],
  params: [],
};
it("constant", async (t) => {
  await snapshotCase(t, "constant", cs.create($module0, []));
});
