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
        code: "export default ($0, $1) => ({ a: $0(), b: $1() });",
        map: '{"version":3,"file":"splice-order.test.jsx","sourceRoot":"","sources":["splice-order.test.tsx"],"names":[],"mappings":"eAU0C,YAAA,CAAC,EAAE,CAAC,EAAE,IAAM,EAAE,CAAC,EAAE,IAAC,EAAW,CAAC"}',
      },
    ),
  );
});
