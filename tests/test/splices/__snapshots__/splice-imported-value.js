import { it } from "node:test";
import { sep } from "node:path";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1vr745dtaiti0:23:47",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBkDA,QAAA,IAAAA,QAAA,EAAI","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-imported-value.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
// A host value that is imported and never mentioned outside a script.
//
// `sep` appears once, as the `$sep` splice below. That reference is
// written by the transform, and TypeScript decides whether an import is used
// before any transform runs — from the source it was handed, where the only
// mention is inside a template literal. So the import is a candidate for
// elision, and if it is elided the emitted module throws
// `sep is not defined` the moment the script is bundled.
//
// What keeps it is `verbatimModuleSyntax`, which every tsconfig in this repo
// sets (`configs/tsconfig.base.json`, and each example's own). This case is
// here so that turning it off anywhere fails a test rather than a page: the
// `.js` snapshot beside it carries the import, and the `.bundle` snapshot
// carries the spliced value.
// A value rather than a function, so the `.value` snapshot beside this is the
// spliced value itself.
it("spliceImportedValue", async (t) => {
  await snapshotCase(t, "spliceImportedValue", cs.create($module0, [sep]));
});
