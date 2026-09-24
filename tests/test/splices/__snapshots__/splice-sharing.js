import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    { start: { line: 6, column: 9 }, end: { line: 6, column: 24 } },
    {
      filePath: "splices/splice-sharing.test.tsx",
      fileHash: "3cex0hh0qp6qz",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 23 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 16 } },
        key: "$lhs",
      },
      right: {
        type: "Splice",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 23 } },
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
      { start: { line: 13, column: 4 }, end: { line: 16, column: 7 } },
      {
        filePath: "splices/splice-sharing.test.tsx",
        fileHash: "3cex0hh0qp6qz",
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                {
                  start: { line: 14, column: 15 },
                  end: { line: 14, column: 20 },
                },
                {
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 18 },
                    end: { line: 14, column: 19 },
                  },
                  value: 1,
                }),
              ),
              cs.create(
                {
                  start: { line: 14, column: 22 },
                  end: { line: 14, column: 27 },
                },
                {
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 25 },
                    end: { line: 14, column: 26 },
                  },
                  value: 2,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: add(
              cs.create(
                {
                  start: { line: 15, column: 15 },
                  end: { line: 15, column: 20 },
                },
                {
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 18 },
                    end: { line: 15, column: 19 },
                  },
                  value: 3,
                }),
              ),
              cs.create(
                {
                  start: { line: 15, column: 22 },
                  end: { line: 15, column: 27 },
                },
                {
                  filePath: "splices/splice-sharing.test.tsx",
                  fileHash: "3cex0hh0qp6qz",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 25 },
                    end: { line: 15, column: 26 },
                  },
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
        type: "ObjectExpression",
        loc: { start: { line: 13, column: 8 }, end: { line: 16, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 7 },
              },
              name: "x",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 14, column: 9 },
                end: { line: 14, column: 29 },
              },
              key: "$0splice0",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 7 },
              },
              name: "y",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 15, column: 9 },
                end: { line: 15, column: 29 },
              },
              key: "$0splice1",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
    ),
  );
});
