import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1lr2275tf95wm:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    try {\n        throw "boom";\n    }\n    catch {\n        return "caught";\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,IAAI;QACF,MAAM,MAAM;IACd,CAAC;IAAC,MAAM;QACN,OAAO,QAAQ;IACjB;AACF,CAAC","names":[],"ignoreList":[],"sources":["control-flow/bindingless-catch.test.tsx"]}',
  dependencies: [],
  params: [],
};
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
it("bindinglessCatch", async (t) => {
  await snapshotCase(t, "bindinglessCatch", cs.create($module0, []));
});
