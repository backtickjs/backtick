import { cs } from "@backtickjs/core";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
export default cs.create(
  [9, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "object-index.ts",
    fileHash: "1cte50r1xtec2",
    kind: "value",
    splices: { $rates: rates },
    captures: [],
    spliceParams: { $rates: [] },
  },
  () => ({
    kind: 220,
    loc: [9, 19, 14, 2],
    parameters: [
      {
        kind: 170,
        loc: [9, 20, 9, 36],
        name: {
          kind: 80,
          loc: [9, 20, 9, 28],
          text: "currency",
          bindingKey: "currency$1cte50r1xtec2$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [9, 41, 14, 2],
      statements: [
        {
          kind: 261,
          loc: [10, 3, 10, 24],
          name: {
            kind: 80,
            loc: [10, 9, 10, 14],
            text: "table",
            bindingKey: "table$1cte50r1xtec2$1",
          },
          initializer: {
            kind: 1000,
            loc: [10, 17, 10, 23],
            key: "$rates",
          },
          keyword: "const",
        },
        {
          kind: 261,
          loc: [11, 3, 11, 38],
          name: {
            kind: 80,
            loc: [11, 9, 11, 14],
            text: "asked",
            bindingKey: "asked$1cte50r1xtec2$2",
          },
          initializer: {
            kind: 227,
            loc: [11, 17, 11, 37],
            left: {
              kind: 213,
              loc: [11, 17, 11, 32],
              expression: {
                kind: 80,
                loc: [11, 17, 11, 22],
                text: "table",
                bindingKey: "table$1cte50r1xtec2$1",
              },
              argumentExpression: {
                kind: 80,
                loc: [11, 23, 11, 31],
                text: "currency",
                bindingKey: "currency$1cte50r1xtec2$0",
              },
            },
            operatorToken: "??",
            right: {
              kind: 9,
              loc: [11, 36, 11, 37],
              value: 0,
            },
          },
          keyword: "const",
        },
        {
          kind: 261,
          loc: [12, 3, 12, 33],
          name: {
            kind: 80,
            loc: [12, 9, 12, 12],
            text: "usd",
            bindingKey: "usd$1cte50r1xtec2$3",
          },
          initializer: {
            kind: 227,
            loc: [12, 15, 12, 32],
            left: {
              kind: 213,
              loc: [12, 15, 12, 27],
              expression: {
                kind: 80,
                loc: [12, 15, 12, 20],
                text: "table",
                bindingKey: "table$1cte50r1xtec2$1",
              },
              argumentExpression: {
                kind: 11,
                loc: [12, 21, 12, 26],
                text: "usd",
              },
            },
            operatorToken: "??",
            right: {
              kind: 9,
              loc: [12, 31, 12, 32],
              value: 0,
            },
          },
          keyword: "const",
        },
        {
          kind: 254,
          loc: [13, 3, 13, 22],
          expression: {
            kind: 227,
            loc: [13, 10, 13, 21],
            left: {
              kind: 80,
              loc: [13, 10, 13, 15],
              text: "asked",
              bindingKey: "asked$1cte50r1xtec2$2",
            },
            operatorToken: "+",
            right: {
              kind: 80,
              loc: [13, 18, 13, 21],
              text: "usd",
              bindingKey: "usd$1cte50r1xtec2$3",
            },
          },
        },
      ],
    },
  }),
);
