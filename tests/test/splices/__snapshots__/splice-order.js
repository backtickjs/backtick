import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
it("spliceOrder", async (t) => {
  await snapshotCase(
    t,
    "spliceOrder",
    cs.create(
      "355ehjmpryw82:11:39",
      {
        params: [
          { kind: "splice", value: count, bindings: [] },
          { kind: "splice", value: ++count, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    a: $splice0(),\n    b: $splice1()\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAU0C,CAAAA,QAAA,EAAAC,QAAA,MAAC;IAAEC,CAAC,EAAEF,QAAA,EAAM;IAAEG,CAAC,EAAEF,QAAA;CAAY,CAAC","names":["$splice0","$splice1","a","b"],"ignoreList":[],"sources":["splices/splice-order.test.tsx"]}',
      [],
    ),
  );
});
