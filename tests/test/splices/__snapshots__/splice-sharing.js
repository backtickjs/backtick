import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    [6, 10, 6, 25],
    {
      version: "0.0.0",
      filePath: "splices/splice-sharing.test.tsx",
      fileHash: "3cex0hh0qp6qz",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [6, 13, 6, 24],
      left: {
        kind: "splice",
        loc: [6, 13, 6, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "splice",
        loc: [6, 20, 6, 24],
        key: "$rhs",
      },
    }),
  );
}
it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.create(
      [13, 5, 16, 8],
      {
        version: "0.0.0",
        filePath: "splices/splice-sharing.test.tsx",
        fileHash: "3cex0hh0qp6qz",
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                [14, 16, 14, 21],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [14, 19, 14, 20],
                  value: 1,
                }),
              ),
              cs.create(
                [14, 23, 14, 28],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [14, 26, 14, 27],
                  value: 2,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: add(
              cs.create(
                [15, 16, 15, 21],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [15, 19, 15, 20],
                  value: 3,
                }),
              ),
              cs.create(
                [15, 23, 15, 28],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [15, 26, 15, 27],
                  value: 4,
                }),
              ),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [13, 9, 16, 6],
        properties: [
          {
            kind: ":",
            loc: [14, 7, 14, 30],
            name: "x",
            initializer: {
              kind: "splice",
              loc: [14, 10, 14, 30],
              key: "$0splice0",
            },
          },
          {
            kind: ":",
            loc: [15, 7, 15, 30],
            name: "y",
            initializer: {
              kind: "splice",
              loc: [15, 10, 15, 30],
              key: "$0splice1",
            },
          },
        ],
      }),
    ),
  );
});
