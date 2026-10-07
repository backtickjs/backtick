import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "6r4m74y7k80e:10:40",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAS2CA,QAAA,IAAAA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-string.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
it("spliceString", async (t) => {
  await snapshotCase(t, "spliceString", cs.create($module0, [value]));
});
