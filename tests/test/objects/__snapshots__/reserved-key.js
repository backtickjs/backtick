import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
it("reservedKey", async (t) => {
  await snapshotCase(
    t,
    "reservedKey",
    cs.create(
      [8, 40, 8, 69],
      {
        version: "0.0.0",
        filePath: "objects/reserved-key.test.tsx",
        fileHash: "2a27difszbs8",
        splices: { $0splice0: { value: { "#": "value" }, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [8, 43, 8, 68],
        parameters: [],
        body: {
          kind: "splice",
          loc: [8, 49, 8, 68],
          key: "$0splice0",
        },
      }),
    ),
  );
});
