import { cs } from "@backtickjs/core";
// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.create(
  [10, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/nested-non-boolean-operand.test.tsx",
    fileHash: "3oonrws5csyo1",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [10, 19, 17, 2],
    parameters: [
      {
        kind: "param",
        loc: [10, 20, 10, 33],
        name: {
          kind: "id",
          loc: [10, 20, 10, 25],
          text: "count",
          bindingKey: "count$3oonrws5csyo1$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [10, 38, 17, 2],
      statements: [
        {
          kind: "const",
          loc: [11, 3, 11, 36],
          name: {
            kind: "id",
            loc: [11, 9, 11, 13],
            text: "keep",
            bindingKey: "keep$3oonrws5csyo1$1",
          },
          initializer: {
            kind: "=>",
            loc: [11, 16, 11, 35],
            parameters: [
              {
                kind: "param",
                loc: [11, 17, 11, 28],
                name: {
                  kind: "id",
                  loc: [11, 17, 11, 19],
                  text: "on",
                  bindingKey: "on$3oonrws5csyo1$2",
                },
              },
            ],
            body: {
              kind: "id",
              loc: [11, 33, 11, 35],
              text: "on",
              bindingKey: "on$3oonrws5csyo1$2",
            },
          },
        },
        {
          kind: "if",
          loc: [13, 3, 15, 4],
          expression: {
            kind: "()",
            loc: [13, 7, 13, 31],
            expression: {
              kind: "id",
              loc: [13, 7, 13, 11],
              text: "keep",
              bindingKey: "keep$3oonrws5csyo1$1",
            },
            arguments: [
              {
                kind: "binop",
                loc: [13, 12, 13, 30],
                left: {
                  kind: "id",
                  loc: [13, 12, 13, 17],
                  text: "count",
                  bindingKey: "count$3oonrws5csyo1$0",
                },
                operatorToken: "&&",
                right: {
                  kind: "binop",
                  loc: [13, 21, 13, 30],
                  left: {
                    kind: "id",
                    loc: [13, 21, 13, 26],
                    text: "count",
                    bindingKey: "count$3oonrws5csyo1$0",
                  },
                  operatorToken: ">",
                  right: {
                    kind: "number",
                    loc: [13, 29, 13, 30],
                    value: 0,
                  },
                },
              },
            ],
          },
          thenStatement: {
            kind: "{}",
            loc: [13, 33, 15, 4],
            statements: [
              {
                kind: "return",
                loc: [14, 5, 14, 19],
                expression: {
                  kind: "string",
                  loc: [14, 12, 14, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [16, 3, 16, 20],
          expression: {
            kind: "string",
            loc: [16, 10, 16, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
