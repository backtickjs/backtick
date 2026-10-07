import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1eany0mypxz6m:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    list: $splice0(),\n    obj: $splice1()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,IAAI,EAAEF,QAAA,EAAyB;IAC/BG,GAAG,EAAEF,QAAA;CACN,CAAC","names":["$splice0","$splice1","list","obj"],"ignoreList":[],"sources":["stdlib/runtime-values.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.create($module0, [[1, "two", true, null], { k: 3 }]),
  );
});
