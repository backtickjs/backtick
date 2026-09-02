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
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 61, 12, 2],
    parameters: [
      {
        kind: 170,
        loc: [6, 3, 6, 23],
        name: {
          kind: 80,
          loc: [6, 3, 6, 8],
          text: "value",
          bindingKey: "value$2albtvza6nmmn$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [7, 6, 12, 2],
      statements: [
        {
          kind: 246,
          loc: [8, 3, 10, 4],
          expression: {
            kind: 227,
            loc: [8, 7, 8, 21],
            left: {
              kind: 80,
              loc: [8, 7, 8, 12],
              text: "value",
              bindingKey: "value$2albtvza6nmmn$0",
            },
            operatorToken: "===",
            right: {
              kind: 106,
              loc: [8, 17, 8, 21],
            },
          },
          thenStatement: {
            kind: 242,
            loc: [8, 23, 10, 4],
            statements: [
              {
                kind: 254,
                loc: [9, 5, 9, 16],
                expression: {
                  kind: 11,
                  loc: [9, 12, 9, 15],
                  text: "-",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [11, 3, 11, 16],
          expression: {
            kind: 80,
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
    splices: { $orDash: orDash },
    captures: [],
    spliceParams: { $orDash: [] },
  },
  () => ({
    kind: 211,
    loc: [14, 20, 18, 2],
    properties: [
      {
        kind: 304,
        loc: [15, 3, 15, 25],
        name: "missing",
        initializer: {
          kind: 214,
          loc: [15, 12, 15, 25],
          expression: {
            kind: 1000,
            loc: [15, 12, 15, 19],
            key: "$orDash",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 106,
              loc: [15, 20, 15, 24],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [16, 3, 16, 25],
        name: "present",
        initializer: {
          kind: 214,
          loc: [16, 12, 16, 25],
          expression: {
            kind: 1000,
            loc: [16, 12, 16, 19],
            key: "$orDash",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 11,
              loc: [16, 20, 16, 24],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [17, 3, 17, 13],
        name: "bare",
        initializer: {
          kind: 106,
          loc: [17, 9, 17, 13],
        },
      },
    ],
  }),
);
