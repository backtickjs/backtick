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
      [11, 40, 11, 74],
      {
        version: "0.0.0",
        filePath: "splices/splice-order.test.tsx",
        fileHash: "355ehjmpryw82",
        splices: {
          $count: { value: count, params: [] },
          $0splice0: { value: ++count, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [11, 44, 11, 72],
        properties: [
          {
            kind: ":",
            loc: [11, 46, 11, 55],
            name: {
              kind: "string",
              loc: [11, 46, 11, 47],
              text: "a",
            },
            initializer: {
              kind: "splice",
              loc: [11, 49, 11, 55],
              key: "$count",
            },
          },
          {
            kind: ":",
            loc: [11, 57, 11, 70],
            name: {
              kind: "string",
              loc: [11, 57, 11, 58],
              text: "b",
            },
            initializer: {
              kind: "splice",
              loc: [11, 60, 11, 70],
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
