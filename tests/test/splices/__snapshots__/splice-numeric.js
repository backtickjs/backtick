import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("spliceNumeric", async (t) => {
  await snapshotCase(
    t,
    "spliceNumeric",
    cs.create(
      "pyy2xapmkswv:6:41",
      { params: [{ kind: "splice", value: 1, bindings: [] }] },
      () => ({
        type: "Splice",
        loc: { start: { line: 6, column: 44 }, end: { line: 6, column: 48 } },
        param: 0,
      }),
      "$0 => $0()",
      '{"version":3,"file":"splice-numeric.test.jsx","sourceRoot":"","sources":["splice-numeric.test.tsx"],"names":[],"mappings":"AAK4C,MAAA,IAAC,CAAA"}',
    ),
  );
});
