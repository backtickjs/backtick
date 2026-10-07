import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "m50lyvn0wkye:8:39",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAO0CA,QAAA,UAAMA,QAAA,EAAqB","names":["$splice0"],"ignoreList":[],"sources":["objects/hash-key-data.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
it("hashKeyData", async (t) => {
  await snapshotCase(
    t,
    "hashKeyData",
    cs.create($module0, [{ "#call": "#f0" }]),
  );
});
