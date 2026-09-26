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
      "($0) => $0()",
      '{"version":3,"file":"splice-numeric.test.jsx","sourceRoot":"","sources":["splices/splice-numeric.test.tsx"],"names":[],"mappings":"AAK4C,QAAA,IAAC"}',
    ),
  );
});
