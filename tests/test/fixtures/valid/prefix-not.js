import { cs } from "@backtickjs/core";
// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
export default cs.create(
  [5, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "prefix-not.ts",
    fileHash: "12lszf9y6ayk3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [5, 19, 10, 2],
    parameters: [
      {
        kind: 170,
        loc: [5, 20, 5, 34],
        name: {
          kind: 80,
          loc: [5, 20, 5, 25],
          text: "ready",
          bindingKey: "ready$12lszf9y6ayk3$0",
        },
      },
      {
        kind: 170,
        loc: [5, 36, 5, 49],
        name: {
          kind: 80,
          loc: [5, 36, 5, 41],
          text: "count",
          bindingKey: "count$12lszf9y6ayk3$1",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [5, 54, 10, 2],
      statements: [
        {
          kind: 246,
          loc: [6, 3, 8, 4],
          expression: {
            kind: 225,
            loc: [6, 7, 6, 13],
            operator: "!",
            operand: {
              kind: 80,
              loc: [6, 8, 6, 13],
              text: "ready",
              bindingKey: "ready$12lszf9y6ayk3$0",
            },
          },
          thenStatement: {
            kind: 242,
            loc: [6, 15, 8, 4],
            statements: [
              {
                kind: 254,
                loc: [7, 5, 7, 22],
                expression: {
                  kind: 11,
                  loc: [7, 12, 7, 21],
                  text: "waiting",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [9, 3, 9, 46],
          expression: {
            kind: 228,
            loc: [9, 10, 9, 45],
            condition: {
              kind: 225,
              loc: [9, 10, 9, 22],
              operator: "!",
              operand: {
                kind: 227,
                loc: [9, 12, 9, 21],
                left: {
                  kind: 80,
                  loc: [9, 12, 9, 17],
                  text: "count",
                  bindingKey: "count$12lszf9y6ayk3$1",
                },
                operatorToken: ">",
                right: {
                  kind: 9,
                  loc: [9, 20, 9, 21],
                  value: 3,
                },
              },
            },
            whenTrue: {
              kind: 11,
              loc: [9, 25, 9, 36],
              text: "room left",
            },
            whenFalse: {
              kind: 11,
              loc: [9, 39, 9, 45],
              text: "full",
            },
          },
        },
      ],
    },
  }),
);
