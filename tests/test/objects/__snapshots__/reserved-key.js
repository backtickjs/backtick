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
      { start: { line: 8, column: 39 }, end: { line: 8, column: 68 } },
      {
        version: "0.0.0",
        filePath: "objects/reserved-key.test.tsx",
        fileHash: "2a27difszbs8",
        splices: { $0splice0: { value: { "#": "value" }, params: [] } },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 8, column: 42 }, end: { line: 8, column: 67 } },
        params: [],
        body: {
          type: "Splice",
          loc: { start: { line: 8, column: 48 }, end: { line: 8, column: 67 } },
          key: "$0splice0",
        },
        expression: true,
      }),
    ),
  );
});
