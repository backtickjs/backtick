import { cs } from "@backtickjs/core";
// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.create(
  { start: { line: 10, column: 15 }, end: { line: 17, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/nested-non-boolean-operand.test.tsx",
    fileHash: "3oonrws5csyo1",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 10, column: 18 }, end: { line: 17, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 10, column: 19 }, end: { line: 10, column: 24 } },
        name: "count",
        bindingKey: "count$3oonrws5csyo1$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 10, column: 37 }, end: { line: 17, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 11, column: 2 },
            end: { line: 11, column: 35 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 8 },
                end: { line: 11, column: 34 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 8 },
                  end: { line: 11, column: 12 },
                },
                name: "keep",
                bindingKey: "keep$3oonrws5csyo1$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 11, column: 15 },
                  end: { line: 11, column: 34 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 16 },
                      end: { line: 11, column: 18 },
                    },
                    name: "on",
                    bindingKey: "on$3oonrws5csyo1$2",
                  },
                ],
                body: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 32 },
                    end: { line: 11, column: 34 },
                  },
                  name: "on",
                  bindingKey: "on$3oonrws5csyo1$2",
                },
                expression: true,
              },
            },
          ],
        },
        {
          type: "IfStatement",
          loc: { start: { line: 13, column: 2 }, end: { line: 15, column: 3 } },
          test: {
            type: "CallExpression",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 30 },
            },
            callee: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 6 },
                end: { line: 13, column: 10 },
              },
              name: "keep",
              bindingKey: "keep$3oonrws5csyo1$1",
            },
            arguments: [
              {
                type: "LogicalExpression",
                loc: {
                  start: { line: 13, column: 11 },
                  end: { line: 13, column: 29 },
                },
                operator: "&&",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 11 },
                    end: { line: 13, column: 16 },
                  },
                  name: "count",
                  bindingKey: "count$3oonrws5csyo1$0",
                },
                right: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 13, column: 20 },
                    end: { line: 13, column: 29 },
                  },
                  operator: ">",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 20 },
                      end: { line: 13, column: 25 },
                    },
                    name: "count",
                    bindingKey: "count$3oonrws5csyo1$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 28 },
                      end: { line: 13, column: 29 },
                    },
                    value: 0,
                  },
                },
              },
            ],
            optional: false,
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 13, column: 32 },
              end: { line: 15, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 14, column: 4 },
                  end: { line: 14, column: 18 },
                },
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 11 },
                    end: { line: 14, column: 17 },
                  },
                  value: "kept",
                },
              },
            ],
          },
          alternate: null,
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 16, column: 2 },
            end: { line: 16, column: 19 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 16, column: 9 },
              end: { line: 16, column: 18 },
            },
            value: "dropped",
          },
        },
      ],
    },
    expression: false,
  }),
);
