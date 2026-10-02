import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.create(
      "1eany0mypxz6m:9:4",
      {
        params: [
          { kind: "splice", value: [1, "two", true, null], bindings: [] },
          { kind: "splice", value: { k: 3 }, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    list: $splice0(),\n    obj: $splice1()\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAQO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,IAAI,EAAEF,QAAA,EAAC;IACPG,GAAG,EAAEF,QAAA;CACN,CAAC","names":["$splice0","$splice1","list","obj"],"ignoreList":[],"sources":["stdlib/runtime-values.test.tsx"]}',
      [],
    ),
  );
});
