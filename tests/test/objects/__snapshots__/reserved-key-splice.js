import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2dryy6my0qubf:8:45",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOgDA,QAAA,IAAAA,QAAA,EAAmB","names":["$splice0"],"ignoreList":[],"sources":["objects/reserved-key-splice.test.tsx"]}',
  dependencies: [],
};
// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
it("reservedKeySplice", async (t) => {
  await snapshotCase(
    t,
    "reservedKeySplice",
    cs.create($module0, [
      { kind: "splice", value: { "#": "value" }, bindings: [] },
    ]),
  );
});
