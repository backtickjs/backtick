import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.create(
      [9, 5, 12, 7],
      {
        version: "0.0.0",
        filePath: "captures/nested-scripts.test.tsx",
        fileHash: "2jjdjdr7m395y",
        splices: {
          $0splice0: {
            value: cs.create(
              [11, 16, 11, 21],
              {
                version: "0.0.0",
                filePath: "captures/nested-scripts.test.tsx",
                fileHash: "2jjdjdr7m395y",
                splices: {},
                captures: ["x$2jjdjdr7m395y$0"],
              },
              () => ({
                kind: "id",
                loc: [11, 19, 11, 20],
                text: "x",
                bindingKey: "x$2jjdjdr7m395y$0",
              }),
            ),
            params: ["x$2jjdjdr7m395y$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [9, 8, 12, 6],
        statements: [
          {
            kind: "const",
            loc: [10, 7, 10, 19],
            name: {
              kind: "id",
              loc: [10, 13, 10, 14],
              text: "x",
              bindingKey: "x$2jjdjdr7m395y$0",
            },
            initializer: {
              kind: "number",
              loc: [10, 17, 10, 18],
              value: 0,
            },
          },
          {
            kind: "return",
            loc: [11, 7, 11, 23],
            expression: {
              kind: "splice",
              loc: [11, 14, 11, 22],
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
