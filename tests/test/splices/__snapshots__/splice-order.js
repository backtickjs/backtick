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
      {
        code: "export default ($0, $1) => ({\n  a: $0(),\n  b: $1()\n});",
        map: '{"version":3,"mappings":"eAU0C,CAAAA,EAAA,EAAAC,EAAA,MAAC;EAAEC,CAAC,EAAEF,EAAA,EAAM;EAAEG,CAAC,EAAEF,EAAA;AAAC,CAAW,CAAC","names":["$0","$1","a","b"],"ignoreList":[],"sources":["splice-order.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
