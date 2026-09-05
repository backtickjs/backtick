import { cs } from "@backtickjs/core";
// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number, and a plain object
// takes only a key its type names.
//
// `coins["0"]` is the one TypeScript lets through — it reads a numeric string
// literal as a numeric index — and the runtime, which takes only a number,
// answers `undefined`. Left here beside the two that are caught so the gap is
// visible where it lives.
const point = { x: 1, y: 2 };
export default cs.create(
  [13, 16, 19, 3],
  {
    version: "0.0.0",
    filePath: "index-wrong-key.ts",
    fileHash: "j0oss2jjyw04",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [13, 19, 19, 2],
    parameters: [
      {
        kind: "param",
        loc: [13, 20, 13, 32],
        name: {
          kind: "id",
          loc: [13, 20, 13, 24],
          text: "name",
          bindingKey: "name$j0oss2jjyw04$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [13, 37, 19, 2],
      statements: [
        {
          kind: "const",
          loc: [14, 3, 14, 28],
          name: {
            kind: "id",
            loc: [14, 9, 14, 14],
            text: "coins",
            bindingKey: "coins$j0oss2jjyw04$1",
          },
          initializer: {
            kind: "arr",
            loc: [14, 17, 14, 27],
            elements: [
              {
                kind: "number",
                loc: [14, 18, 14, 19],
                value: 5,
              },
              {
                kind: "number",
                loc: [14, 21, 14, 23],
                value: 31,
              },
              {
                kind: "number",
                loc: [14, 25, 14, 26],
                value: 7,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [15, 3, 15, 28],
          name: {
            kind: "id",
            loc: [15, 9, 15, 14],
            text: "first",
            bindingKey: "first$j0oss2jjyw04$2",
          },
          initializer: {
            kind: "[]",
            loc: [15, 17, 15, 27],
            expression: {
              kind: "id",
              loc: [15, 17, 15, 22],
              text: "coins",
              bindingKey: "coins$j0oss2jjyw04$1",
            },
            argumentExpression: {
              kind: "string",
              loc: [15, 23, 15, 26],
              text: "0",
            },
          },
        },
        {
          kind: "const",
          loc: [16, 3, 16, 29],
          name: {
            kind: "id",
            loc: [16, 9, 16, 14],
            text: "wrong",
            bindingKey: "wrong$j0oss2jjyw04$3",
          },
          initializer: {
            kind: "[]",
            loc: [16, 17, 16, 28],
            expression: {
              kind: "id",
              loc: [16, 17, 16, 22],
              text: "coins",
              bindingKey: "coins$j0oss2jjyw04$1",
            },
            argumentExpression: {
              kind: "id",
              loc: [16, 23, 16, 27],
              text: "name",
              bindingKey: "name$j0oss2jjyw04$0",
            },
          },
        },
        {
          kind: "const",
          loc: [17, 3, 17, 30],
          name: {
            kind: "id",
            loc: [17, 9, 17, 14],
            text: "which",
            bindingKey: "which$j0oss2jjyw04$4",
          },
          initializer: {
            kind: "[]",
            loc: [17, 17, 17, 29],
            expression: {
              kind: "splice",
              loc: [17, 17, 17, 23],
              key: "$point",
            },
            argumentExpression: {
              kind: "id",
              loc: [17, 24, 17, 28],
              text: "name",
              bindingKey: "name$j0oss2jjyw04$0",
            },
          },
        },
        {
          kind: "return",
          loc: [18, 3, 18, 32],
          expression: {
            kind: "binop",
            loc: [18, 10, 18, 31],
            left: {
              kind: "binop",
              loc: [18, 10, 18, 23],
              left: {
                kind: "id",
                loc: [18, 10, 18, 15],
                text: "first",
                bindingKey: "first$j0oss2jjyw04$2",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [18, 18, 18, 23],
                text: "wrong",
                bindingKey: "wrong$j0oss2jjyw04$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [18, 26, 18, 31],
              text: "which",
              bindingKey: "which$j0oss2jjyw04$4",
            },
          },
        },
      ],
    },
  }),
);
