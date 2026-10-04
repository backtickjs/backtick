import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2a27difszbs8:8:39",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAO0CA,QAAA,UAAMA,QAAA,EAAmB","names":["$splice0"],"ignoreList":[],"sources":["objects/reserved-key.test.tsx"]}',
  dependencies: [],
};
// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
it("reservedKey", async (t) => {
  await snapshotCase(
    t,
    "reservedKey",
    cs.create($module0, [
      { kind: "splice", value: { "#": "value" }, bindings: [] },
    ]),
  );
});
