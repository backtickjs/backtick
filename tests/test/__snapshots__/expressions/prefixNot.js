import { cs } from "@backtickjs/core";
// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
const prefixNot = cs.create(
  [5, 19, 10, 3],
  {
    version: "0.0.0",
    filePath: "prefixNot.tsx",
    fileHash: "2wrih9cwbstaj",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 22, 10, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 23, 5, 37],
        name: {
          kind: "id",
          loc: [5, 23, 5, 28],
          text: "ready",
          bindingKey: "ready$2wrih9cwbstaj$0",
        },
      },
      {
        kind: "param",
        loc: [5, 39, 5, 52],
        name: {
          kind: "id",
          loc: [5, 39, 5, 44],
          text: "count",
          bindingKey: "count$2wrih9cwbstaj$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 57, 10, 2],
      statements: [
        {
          kind: "if",
          loc: [6, 3, 8, 4],
          expression: {
            kind: "unop",
            loc: [6, 7, 6, 13],
            operator: "!",
            operand: {
              kind: "id",
              loc: [6, 8, 6, 13],
              text: "ready",
              bindingKey: "ready$2wrih9cwbstaj$0",
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [6, 15, 8, 4],
            statements: [
              {
                kind: "return",
                loc: [7, 5, 7, 22],
                expression: {
                  kind: "string",
                  loc: [7, 12, 7, 21],
                  text: "waiting",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [9, 3, 9, 46],
          expression: {
            kind: "?:",
            loc: [9, 10, 9, 45],
            condition: {
              kind: "unop",
              loc: [9, 10, 9, 22],
              operator: "!",
              operand: {
                kind: "binop",
                loc: [9, 12, 9, 21],
                left: {
                  kind: "id",
                  loc: [9, 12, 9, 17],
                  text: "count",
                  bindingKey: "count$2wrih9cwbstaj$1",
                },
                operatorToken: ">",
                right: {
                  kind: "number",
                  loc: [9, 20, 9, 21],
                  value: 3,
                },
              },
            },
            whenTrue: {
              kind: "string",
              loc: [9, 25, 9, 36],
              text: "room left",
            },
            whenFalse: {
              kind: "string",
              loc: [9, 39, 9, 45],
              text: "full",
            },
          },
        },
      ],
    },
  }),
);
