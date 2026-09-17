import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.create(
      [9, 5, 12, 8],
      {
        version: "0.0.0",
        filePath: "stdlib/runtime-values.test.tsx",
        fileHash: "1eany0mypxz6m",
        splices: {
          $0splice0: { value: [1, "two", true, null], params: [] },
          $0splice1: { value: { k: 3 }, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [9, 9, 12, 6],
        properties: [
          {
            kind: ":",
            loc: [10, 7, 10, 38],
            name: {
              kind: "string",
              loc: [10, 7, 10, 11],
              text: "list",
            },
            initializer: {
              kind: "splice",
              loc: [10, 13, 10, 38],
              key: "$0splice0",
            },
          },
          {
            kind: ":",
            loc: [11, 7, 11, 23],
            name: {
              kind: "string",
              loc: [11, 7, 11, 10],
              text: "obj",
            },
            initializer: {
              kind: "splice",
              loc: [11, 12, 11, 23],
              key: "$0splice1",
            },
          },
        ],
      }),
    ),
  );
});
