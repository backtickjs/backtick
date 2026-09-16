import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("spliceNumeric", async (t) => {
  await snapshotCase(
    t,
    "spliceNumeric",
    cs.create(
      [6, 42, 6, 50],
      {
        version: "0.0.0",
        filePath: "splices/splice-numeric.test.tsx",
        fileHash: "pyy2xapmkswv",
        splices: { $0splice0: { value: 1, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [6, 45, 6, 49],
        key: "$0splice0",
      }),
    ),
  );
});
