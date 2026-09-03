import { cs } from "@backtickjs/core";
// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number — `"0"` is a string, and
// no amount of it looking like a number changes that — and a plain object takes
// only a key its type names.
const point = { x: 1, y: 2 };
export default cs.create(
  [9, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "index-wrong-key.ts",
    fileHash: "2h9vfj6qbexsg",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 19, 15, 2],
    parameters: [
      {
        kind: "param",
        loc: [9, 20, 9, 32],
        name: {
          kind: "id",
          loc: [9, 20, 9, 24],
          text: "name",
          bindingKey: "name$2h9vfj6qbexsg$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [9, 37, 15, 2],
      statements: [
        {
          kind: "const",
          loc: [10, 3, 10, 28],
          name: {
            kind: "id",
            loc: [10, 9, 10, 14],
            text: "coins",
            bindingKey: "coins$2h9vfj6qbexsg$1",
          },
          initializer: {
            kind: "arr",
            loc: [10, 17, 10, 27],
            elements: [
              {
                kind: "number",
                loc: [10, 18, 10, 19],
                value: 5,
              },
              {
                kind: "number",
                loc: [10, 21, 10, 23],
                value: 31,
              },
              {
                kind: "number",
                loc: [10, 25, 10, 26],
                value: 7,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [11, 3, 11, 28],
          name: {
            kind: "id",
            loc: [11, 9, 11, 14],
            text: "first",
            bindingKey: "first$2h9vfj6qbexsg$2",
          },
          initializer: {
            kind: "[]",
            loc: [11, 17, 11, 27],
            expression: {
              kind: "id",
              loc: [11, 17, 11, 22],
              text: "coins",
              bindingKey: "coins$2h9vfj6qbexsg$1",
            },
            argumentExpression: {
              kind: "string",
              loc: [11, 23, 11, 26],
              text: "0",
            },
          },
        },
        {
          kind: "const",
          loc: [12, 3, 12, 29],
          name: {
            kind: "id",
            loc: [12, 9, 12, 14],
            text: "wrong",
            bindingKey: "wrong$2h9vfj6qbexsg$3",
          },
          initializer: {
            kind: "[]",
            loc: [12, 17, 12, 28],
            expression: {
              kind: "id",
              loc: [12, 17, 12, 22],
              text: "coins",
              bindingKey: "coins$2h9vfj6qbexsg$1",
            },
            argumentExpression: {
              kind: "id",
              loc: [12, 23, 12, 27],
              text: "name",
              bindingKey: "name$2h9vfj6qbexsg$0",
            },
          },
        },
        {
          kind: "const",
          loc: [13, 3, 13, 30],
          name: {
            kind: "id",
            loc: [13, 9, 13, 14],
            text: "which",
            bindingKey: "which$2h9vfj6qbexsg$4",
          },
          initializer: {
            kind: "[]",
            loc: [13, 17, 13, 29],
            expression: {
              kind: "splice",
              loc: [13, 17, 13, 23],
              key: "$point",
            },
            argumentExpression: {
              kind: "id",
              loc: [13, 24, 13, 28],
              text: "name",
              bindingKey: "name$2h9vfj6qbexsg$0",
            },
          },
        },
        {
          kind: "return",
          loc: [14, 3, 14, 32],
          expression: {
            kind: "binop",
            loc: [14, 10, 14, 31],
            left: {
              kind: "binop",
              loc: [14, 10, 14, 23],
              left: {
                kind: "id",
                loc: [14, 10, 14, 15],
                text: "first",
                bindingKey: "first$2h9vfj6qbexsg$2",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [14, 18, 14, 23],
                text: "wrong",
                bindingKey: "wrong$2h9vfj6qbexsg$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [14, 26, 14, 31],
              text: "which",
              bindingKey: "which$2h9vfj6qbexsg$4",
            },
          },
        },
      ],
    },
  }),
);
