import { cs } from "@backtickjs/core";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
const objectIndex = cs.create(
  [9, 21, 14, 3],
  {
    version: "0.0.0",
    filePath: "objectIndex.tsx",
    fileHash: "3gk0lk6oize06",
    splices: { $rates: { value: rates, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 24, 14, 2],
    parameters: [
      {
        kind: "param",
        loc: [9, 25, 9, 41],
        name: {
          kind: "id",
          loc: [9, 25, 9, 33],
          text: "currency",
          bindingKey: "currency$3gk0lk6oize06$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [9, 46, 14, 2],
      statements: [
        {
          kind: "const",
          loc: [10, 3, 10, 24],
          name: {
            kind: "id",
            loc: [10, 9, 10, 14],
            text: "table",
            bindingKey: "table$3gk0lk6oize06$1",
          },
          initializer: {
            kind: "splice",
            loc: [10, 17, 10, 23],
            key: "$rates",
          },
        },
        {
          kind: "const",
          loc: [11, 3, 11, 38],
          name: {
            kind: "id",
            loc: [11, 9, 11, 14],
            text: "asked",
            bindingKey: "asked$3gk0lk6oize06$2",
          },
          initializer: {
            kind: "binop",
            loc: [11, 17, 11, 37],
            left: {
              kind: "[]",
              loc: [11, 17, 11, 32],
              expression: {
                kind: "id",
                loc: [11, 17, 11, 22],
                text: "table",
                bindingKey: "table$3gk0lk6oize06$1",
              },
              argumentExpression: {
                kind: "id",
                loc: [11, 23, 11, 31],
                text: "currency",
                bindingKey: "currency$3gk0lk6oize06$0",
              },
            },
            operatorToken: "??",
            right: {
              kind: "number",
              loc: [11, 36, 11, 37],
              value: 0,
            },
          },
        },
        {
          kind: "const",
          loc: [12, 3, 12, 33],
          name: {
            kind: "id",
            loc: [12, 9, 12, 12],
            text: "usd",
            bindingKey: "usd$3gk0lk6oize06$3",
          },
          initializer: {
            kind: "binop",
            loc: [12, 15, 12, 32],
            left: {
              kind: "[]",
              loc: [12, 15, 12, 27],
              expression: {
                kind: "id",
                loc: [12, 15, 12, 20],
                text: "table",
                bindingKey: "table$3gk0lk6oize06$1",
              },
              argumentExpression: {
                kind: "string",
                loc: [12, 21, 12, 26],
                text: "usd",
              },
            },
            operatorToken: "??",
            right: {
              kind: "number",
              loc: [12, 31, 12, 32],
              value: 0,
            },
          },
        },
        {
          kind: "return",
          loc: [13, 3, 13, 22],
          expression: {
            kind: "binop",
            loc: [13, 10, 13, 21],
            left: {
              kind: "id",
              loc: [13, 10, 13, 15],
              text: "asked",
              bindingKey: "asked$3gk0lk6oize06$2",
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [13, 18, 13, 21],
              text: "usd",
              bindingKey: "usd$3gk0lk6oize06$3",
            },
          },
        },
      ],
    },
  }),
);
