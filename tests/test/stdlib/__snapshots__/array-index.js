import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs.create(
      [11, 5, 18, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-index.test.tsx",
        fileHash: "2nqckix5uoswz",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 18, 6],
        statements: [
          {
            kind: "const",
            loc: [12, 7, 12, 32],
            name: {
              kind: "id",
              loc: [12, 13, 12, 18],
              text: "coins",
              bindingKey: "coins$2nqckix5uoswz$0",
            },
            initializer: {
              kind: "arr",
              loc: [12, 21, 12, 31],
              elements: [
                {
                  kind: "number",
                  loc: [12, 22, 12, 23],
                  value: 5,
                },
                {
                  kind: "number",
                  loc: [12, 25, 12, 27],
                  value: 31,
                },
                {
                  kind: "number",
                  loc: [12, 29, 12, 30],
                  value: 7,
                },
              ],
            },
          },
          {
            kind: "let",
            loc: [13, 7, 13, 21],
            name: {
              kind: "id",
              loc: [13, 11, 13, 16],
              text: "total",
              bindingKey: "total$2nqckix5uoswz$1",
            },
            initializer: {
              kind: "number",
              loc: [13, 19, 13, 20],
              value: 0,
            },
          },
          {
            kind: "for",
            loc: [14, 7, 16, 8],
            initializer: {
              kind: "let",
              loc: [14, 12, 14, 21],
              name: {
                kind: "id",
                loc: [14, 16, 14, 17],
                text: "i",
                bindingKey: "i$2nqckix5uoswz$2",
              },
              initializer: {
                kind: "number",
                loc: [14, 20, 14, 21],
                value: 0,
              },
            },
            condition: {
              kind: "binop",
              loc: [14, 23, 14, 39],
              left: {
                kind: "id",
                loc: [14, 23, 14, 24],
                text: "i",
                bindingKey: "i$2nqckix5uoswz$2",
              },
              operatorToken: "<",
              right: {
                kind: ".",
                loc: [14, 27, 14, 39],
                expression: {
                  kind: "id",
                  loc: [14, 27, 14, 32],
                  text: "coins",
                  bindingKey: "coins$2nqckix5uoswz$0",
                },
                name: "length",
              },
            },
            incrementor: {
              kind: "binop",
              loc: [14, 41, 14, 50],
              left: {
                kind: "id",
                loc: [14, 41, 14, 42],
                text: "i",
                bindingKey: "i$2nqckix5uoswz$2",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [14, 45, 14, 50],
                left: {
                  kind: "id",
                  loc: [14, 45, 14, 46],
                  text: "i",
                  bindingKey: "i$2nqckix5uoswz$2",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [14, 49, 14, 50],
                  value: 1,
                },
              },
            },
            statement: {
              kind: "{}",
              loc: [14, 52, 16, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [15, 9, 15, 33],
                  left: {
                    kind: "id",
                    loc: [15, 9, 15, 14],
                    text: "total",
                    bindingKey: "total$2nqckix5uoswz$1",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [15, 17, 15, 33],
                    left: {
                      kind: "id",
                      loc: [15, 17, 15, 22],
                      text: "total",
                      bindingKey: "total$2nqckix5uoswz$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "[]",
                      loc: [15, 25, 15, 33],
                      expression: {
                        kind: "id",
                        loc: [15, 25, 15, 30],
                        text: "coins",
                        bindingKey: "coins$2nqckix5uoswz$0",
                      },
                      argumentExpression: {
                        kind: "id",
                        loc: [15, 31, 15, 32],
                        text: "i",
                        bindingKey: "i$2nqckix5uoswz$2",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [17, 7, 17, 20],
            expression: {
              kind: "id",
              loc: [17, 14, 17, 19],
              text: "total",
              bindingKey: "total$2nqckix5uoswz$1",
            },
          },
        ],
      }),
    ),
  );
});
