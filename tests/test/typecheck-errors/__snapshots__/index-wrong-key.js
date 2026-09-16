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
  [13, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/index-wrong-key.test.tsx",
    fileHash: "221m46vqk9vc3",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [13, 19, 21, 2],
    parameters: [
      {
        kind: "param",
        loc: [13, 20, 13, 32],
        name: {
          kind: "id",
          loc: [13, 20, 13, 24],
          text: "name",
          bindingKey: "name$221m46vqk9vc3$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [13, 37, 21, 2],
      statements: [
        {
          kind: "const",
          loc: [14, 3, 14, 28],
          name: {
            kind: "id",
            loc: [14, 9, 14, 14],
            text: "coins",
            bindingKey: "coins$221m46vqk9vc3$1",
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
            bindingKey: "first$221m46vqk9vc3$2",
          },
          initializer: {
            kind: "[]",
            loc: [15, 17, 15, 27],
            expression: {
              kind: "id",
              loc: [15, 17, 15, 22],
              text: "coins",
              bindingKey: "coins$221m46vqk9vc3$1",
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
          loc: [17, 3, 17, 29],
          name: {
            kind: "id",
            loc: [17, 9, 17, 14],
            text: "wrong",
            bindingKey: "wrong$221m46vqk9vc3$3",
          },
          initializer: {
            kind: "[]",
            loc: [17, 17, 17, 28],
            expression: {
              kind: "id",
              loc: [17, 17, 17, 22],
              text: "coins",
              bindingKey: "coins$221m46vqk9vc3$1",
            },
            argumentExpression: {
              kind: "id",
              loc: [17, 23, 17, 27],
              text: "name",
              bindingKey: "name$221m46vqk9vc3$0",
            },
          },
        },
        {
          kind: "const",
          loc: [19, 3, 19, 30],
          name: {
            kind: "id",
            loc: [19, 9, 19, 14],
            text: "which",
            bindingKey: "which$221m46vqk9vc3$4",
          },
          initializer: {
            kind: "[]",
            loc: [19, 17, 19, 29],
            expression: {
              kind: "splice",
              loc: [19, 17, 19, 23],
              key: "$point",
            },
            argumentExpression: {
              kind: "id",
              loc: [19, 24, 19, 28],
              text: "name",
              bindingKey: "name$221m46vqk9vc3$0",
            },
          },
        },
        {
          kind: "return",
          loc: [20, 3, 20, 32],
          expression: {
            kind: "binop",
            loc: [20, 10, 20, 31],
            left: {
              kind: "binop",
              loc: [20, 10, 20, 23],
              left: {
                kind: "id",
                loc: [20, 10, 20, 15],
                text: "first",
                bindingKey: "first$221m46vqk9vc3$2",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [20, 18, 20, 23],
                text: "wrong",
                bindingKey: "wrong$221m46vqk9vc3$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [20, 26, 20, 31],
              text: "which",
              bindingKey: "which$221m46vqk9vc3$4",
            },
          },
        },
      ],
    },
  }),
);
