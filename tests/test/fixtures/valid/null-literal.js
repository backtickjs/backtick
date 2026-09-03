import { cs } from "@backtickjs/core";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  [5, 58, 12, 3],
  {
    version: "0.0.0",
    filePath: "null-literal.ts",
    fileHash: "2albtvza6nmmn",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 61, 12, 2],
    parameters: [
      {
        kind: "param",
        loc: [6, 3, 6, 23],
        name: {
          kind: "id",
          loc: [6, 3, 6, 8],
          text: "value",
          bindingKey: "value$2albtvza6nmmn$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [7, 6, 12, 2],
      statements: [
        {
          kind: "if",
          loc: [8, 3, 10, 4],
          expression: {
            kind: "binop",
            loc: [8, 7, 8, 21],
            left: {
              kind: "id",
              loc: [8, 7, 8, 12],
              text: "value",
              bindingKey: "value$2albtvza6nmmn$0",
            },
            operatorToken: "===",
            right: {
              kind: "null",
              loc: [8, 17, 8, 21],
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [8, 23, 10, 4],
            statements: [
              {
                kind: "return",
                loc: [9, 5, 9, 16],
                expression: {
                  kind: "string",
                  loc: [9, 12, 9, 15],
                  text: "-",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [11, 3, 11, 16],
          expression: {
            kind: "id",
            loc: [11, 10, 11, 15],
            text: "value",
            bindingKey: "value$2albtvza6nmmn$0",
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [14, 16, 18, 4],
  {
    version: "0.0.0",
    filePath: "null-literal.ts",
    fileHash: "2albtvza6nmmn",
    splices: { $orDash: { value: orDash, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [14, 20, 18, 2],
    properties: [
      {
        kind: ":",
        loc: [15, 3, 15, 25],
        name: "missing",
        initializer: {
          kind: "()",
          loc: [15, 12, 15, 25],
          expression: {
            kind: "splice",
            loc: [15, 12, 15, 19],
            key: "$orDash",
          },
          arguments: [
            {
              kind: "null",
              loc: [15, 20, 15, 24],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [16, 3, 16, 25],
        name: "present",
        initializer: {
          kind: "()",
          loc: [16, 12, 16, 25],
          expression: {
            kind: "splice",
            loc: [16, 12, 16, 19],
            key: "$orDash",
          },
          arguments: [
            {
              kind: "string",
              loc: [16, 20, 16, 24],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [17, 3, 17, 13],
        name: "bare",
        initializer: {
          kind: "null",
          loc: [17, 9, 17, 13],
        },
      },
    ],
  }),
);
