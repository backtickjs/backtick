import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function addOwnTotal(lhs, rhs) {
  return cs.create(
    [7, 10, 12, 5],
    {
      version: "0.0.0",
      filePath: "captures/shadowing.test.tsx",
      fileHash: "3ujapqmnmm2ra",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 12, 4],
      statements: [
        {
          kind: "let",
          loc: [8, 5, 8, 19],
          name: {
            kind: "id",
            loc: [8, 9, 8, 14],
            text: "total",
            bindingKey: "total$3ujapqmnmm2ra$0",
          },
          initializer: {
            kind: "number",
            loc: [8, 17, 8, 18],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [9, 5, 9, 25],
          left: {
            kind: "id",
            loc: [9, 5, 9, 10],
            text: "total",
            bindingKey: "total$3ujapqmnmm2ra$0",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [9, 13, 9, 25],
            left: {
              kind: "id",
              loc: [9, 13, 9, 18],
              text: "total",
              bindingKey: "total$3ujapqmnmm2ra$0",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [9, 21, 9, 25],
              key: "$lhs",
            },
          },
        },
        {
          kind: "binop",
          loc: [10, 5, 10, 25],
          left: {
            kind: "id",
            loc: [10, 5, 10, 10],
            text: "total",
            bindingKey: "total$3ujapqmnmm2ra$0",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [10, 13, 10, 25],
            left: {
              kind: "id",
              loc: [10, 13, 10, 18],
              text: "total",
              bindingKey: "total$3ujapqmnmm2ra$0",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [10, 21, 10, 25],
              key: "$rhs",
            },
          },
        },
        {
          kind: "return",
          loc: [11, 5, 11, 18],
          expression: {
            kind: "id",
            loc: [11, 12, 11, 17],
            text: "total",
            bindingKey: "total$3ujapqmnmm2ra$0",
          },
        },
      ],
    }),
  );
}
it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs.create(
      [19, 5, 22, 7],
      {
        version: "0.0.0",
        filePath: "captures/shadowing.test.tsx",
        fileHash: "3ujapqmnmm2ra",
        splices: {
          $0splice0: {
            value: addOwnTotal(
              cs.create(
                [21, 28, 21, 37],
                {
                  version: "0.0.0",
                  filePath: "captures/shadowing.test.tsx",
                  fileHash: "3ujapqmnmm2ra",
                  splices: {},
                  captures: ["total$3ujapqmnmm2ra$1"],
                },
                () => ({
                  kind: "id",
                  loc: [21, 31, 21, 36],
                  text: "total",
                  bindingKey: "total$3ujapqmnmm2ra$1",
                }),
              ),
              100,
            ),
            params: ["total$3ujapqmnmm2ra$1"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [19, 8, 22, 6],
        statements: [
          {
            kind: "const",
            loc: [20, 7, 20, 23],
            name: {
              kind: "id",
              loc: [20, 13, 20, 18],
              text: "total",
              bindingKey: "total$3ujapqmnmm2ra$1",
            },
            initializer: {
              kind: "number",
              loc: [20, 21, 20, 22],
              value: 1,
            },
          },
          {
            kind: "return",
            loc: [21, 7, 21, 45],
            expression: {
              kind: "splice",
              loc: [21, 14, 21, 44],
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
