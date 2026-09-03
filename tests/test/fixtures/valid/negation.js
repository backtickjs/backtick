import { cs } from "@backtickjs/core";
// A negative literal is written as one, and reaches the wire as one: `-1` is a
// prefix operator on `1` in TypeScript's AST and in this one, and a number on
// the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
export default cs.create(
  [8, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "negation.ts",
    fileHash: "1rsyfqwde2e62",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 19, 12, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 20, 8, 33],
        name: {
          kind: "id",
          loc: [8, 20, 8, 25],
          text: "count",
          bindingKey: "count$1rsyfqwde2e62$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [8, 38, 12, 2],
      statements: [
        {
          kind: "const",
          loc: [9, 3, 9, 20],
          name: {
            kind: "id",
            loc: [9, 9, 9, 14],
            text: "floor",
            bindingKey: "floor$1rsyfqwde2e62$1",
          },
          initializer: {
            kind: "unop",
            loc: [9, 17, 9, 19],
            operator: "-",
            operand: {
              kind: "number",
              loc: [9, 18, 9, 19],
              value: 1,
            },
          },
        },
        {
          kind: "const",
          loc: [10, 3, 10, 23],
          name: {
            kind: "id",
            loc: [10, 9, 10, 13],
            text: "step",
            bindingKey: "step$1rsyfqwde2e62$2",
          },
          initializer: {
            kind: "unop",
            loc: [10, 16, 10, 22],
            operator: "-",
            operand: {
              kind: "id",
              loc: [10, 17, 10, 22],
              text: "count",
              bindingKey: "count$1rsyfqwde2e62$0",
            },
          },
        },
        {
          kind: "return",
          loc: [11, 3, 11, 28],
          expression: {
            kind: "binop",
            loc: [11, 10, 11, 27],
            left: {
              kind: "binop",
              loc: [11, 10, 11, 22],
              left: {
                kind: "id",
                loc: [11, 10, 11, 15],
                text: "floor",
                bindingKey: "floor$1rsyfqwde2e62$1",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [11, 18, 11, 22],
                text: "step",
                bindingKey: "step$1rsyfqwde2e62$2",
              },
            },
            operatorToken: "+",
            right: {
              kind: "unop",
              loc: [11, 25, 11, 27],
              operator: "-",
              operand: {
                kind: "number",
                loc: [11, 26, 11, 27],
                value: 2,
              },
            },
          },
        },
      ],
    },
  }),
);
