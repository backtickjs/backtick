import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  [7, 58, 14, 3],
  {
    version: "0.0.0",
    filePath: "expressions/null-literal.test.tsx",
    fileHash: "2nnj6ebvkk8vj",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [7, 61, 14, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 3, 8, 23],
        name: {
          kind: "id",
          loc: [8, 3, 8, 8],
          text: "value",
          bindingKey: "value$2nnj6ebvkk8vj$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [9, 6, 14, 2],
      statements: [
        {
          kind: "if",
          loc: [10, 3, 12, 4],
          expression: {
            kind: "binop",
            loc: [10, 7, 10, 21],
            left: {
              kind: "id",
              loc: [10, 7, 10, 12],
              text: "value",
              bindingKey: "value$2nnj6ebvkk8vj$0",
            },
            operatorToken: "===",
            right: {
              kind: "null",
              loc: [10, 17, 10, 21],
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [10, 23, 12, 4],
            statements: [
              {
                kind: "return",
                loc: [11, 5, 11, 16],
                expression: {
                  kind: "string",
                  loc: [11, 12, 11, 15],
                  text: "-",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [13, 3, 13, 16],
          expression: {
            kind: "id",
            loc: [13, 10, 13, 15],
            text: "value",
            bindingKey: "value$2nnj6ebvkk8vj$0",
          },
        },
      ],
    },
  }),
);
it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.create(
      [20, 5, 24, 8],
      {
        version: "0.0.0",
        filePath: "expressions/null-literal.test.tsx",
        fileHash: "2nnj6ebvkk8vj",
        splices: { $orDash: { value: orDash, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [20, 9, 24, 6],
        properties: [
          {
            kind: ":",
            loc: [21, 7, 21, 29],
            name: {
              kind: "string",
              loc: [21, 7, 21, 14],
              text: "missing",
            },
            initializer: {
              kind: "()",
              loc: [21, 16, 21, 29],
              expression: {
                kind: "splice",
                loc: [21, 16, 21, 23],
                key: "$orDash",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [21, 24, 21, 28],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [22, 7, 22, 29],
            name: {
              kind: "string",
              loc: [22, 7, 22, 14],
              text: "present",
            },
            initializer: {
              kind: "()",
              loc: [22, 16, 22, 29],
              expression: {
                kind: "splice",
                loc: [22, 16, 22, 23],
                key: "$orDash",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [22, 24, 22, 28],
                  text: "hi",
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [23, 7, 23, 17],
            name: {
              kind: "string",
              loc: [23, 7, 23, 11],
              text: "bare",
            },
            initializer: {
              kind: "null",
              loc: [23, 13, 23, 17],
            },
          },
        ],
      }),
    ),
  );
});
