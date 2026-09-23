import { cs } from "@backtickjs/core";
// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };
export default cs.create(
  [8, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/index-wrong-key.test.tsx",
    fileHash: "2p3ed6wqsrdah",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 19, 16, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 20, 8, 32],
        name: {
          kind: "id",
          loc: [8, 20, 8, 24],
          text: "name",
          bindingKey: "name$2p3ed6wqsrdah$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [8, 37, 16, 2],
      statements: [
        {
          kind: "const",
          loc: [9, 3, 9, 28],
          name: {
            kind: "id",
            loc: [9, 9, 9, 14],
            text: "coins",
            bindingKey: "coins$2p3ed6wqsrdah$1",
          },
          initializer: {
            kind: "arr",
            loc: [9, 17, 9, 27],
            elements: [
              {
                kind: "number",
                loc: [9, 18, 9, 19],
                value: 5,
              },
              {
                kind: "number",
                loc: [9, 21, 9, 23],
                value: 31,
              },
              {
                kind: "number",
                loc: [9, 25, 9, 26],
                value: 7,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [10, 3, 10, 28],
          name: {
            kind: "id",
            loc: [10, 9, 10, 14],
            text: "first",
            bindingKey: "first$2p3ed6wqsrdah$2",
          },
          initializer: {
            kind: "[]",
            loc: [10, 17, 10, 27],
            expression: {
              kind: "id",
              loc: [10, 17, 10, 22],
              text: "coins",
              bindingKey: "coins$2p3ed6wqsrdah$1",
            },
            argumentExpression: {
              kind: "string",
              loc: [10, 23, 10, 26],
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
            bindingKey: "wrong$2p3ed6wqsrdah$3",
          },
          initializer: {
            kind: "[]",
            loc: [12, 17, 12, 28],
            expression: {
              kind: "id",
              loc: [12, 17, 12, 22],
              text: "coins",
              bindingKey: "coins$2p3ed6wqsrdah$1",
            },
            argumentExpression: {
              kind: "id",
              loc: [12, 23, 12, 27],
              text: "name",
              bindingKey: "name$2p3ed6wqsrdah$0",
            },
          },
        },
        {
          kind: "const",
          loc: [14, 3, 14, 30],
          name: {
            kind: "id",
            loc: [14, 9, 14, 14],
            text: "which",
            bindingKey: "which$2p3ed6wqsrdah$4",
          },
          initializer: {
            kind: "[]",
            loc: [14, 17, 14, 29],
            expression: {
              kind: "splice",
              loc: [14, 17, 14, 23],
              key: "$point",
            },
            argumentExpression: {
              kind: "id",
              loc: [14, 24, 14, 28],
              text: "name",
              bindingKey: "name$2p3ed6wqsrdah$0",
            },
          },
        },
        {
          kind: "return",
          loc: [15, 3, 15, 32],
          expression: {
            kind: "binop",
            loc: [15, 10, 15, 31],
            left: {
              kind: "binop",
              loc: [15, 10, 15, 23],
              left: {
                kind: "id",
                loc: [15, 10, 15, 15],
                text: "first",
                bindingKey: "first$2p3ed6wqsrdah$2",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [15, 18, 15, 23],
                text: "wrong",
                bindingKey: "wrong$2p3ed6wqsrdah$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [15, 26, 15, 31],
              text: "which",
              bindingKey: "which$2p3ed6wqsrdah$4",
            },
          },
        },
      ],
    },
  }),
);
