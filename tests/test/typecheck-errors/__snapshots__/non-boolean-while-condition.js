import { cs } from "@backtickjs/core";
// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.create(
  { start: { line: 5, column: 15 }, end: { line: 12, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-while-condition.test.tsx",
    fileHash: "35ew3k4d5ef7n",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 5, column: 18 }, end: { line: 12, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 5, column: 19 }, end: { line: 5, column: 20 } },
        name: "n",
        bindingKey: "n$35ew3k4d5ef7n$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 5, column: 33 }, end: { line: 12, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 15 } },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 6, column: 6 },
                end: { line: 6, column: 14 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 6, column: 6 },
                  end: { line: 6, column: 10 },
                },
                name: "left",
                bindingKey: "left$35ew3k4d5ef7n$1",
              },
              init: {
                type: "Identifier",
                loc: {
                  start: { line: 6, column: 13 },
                  end: { line: 6, column: 14 },
                },
                name: "n",
                bindingKey: "n$35ew3k4d5ef7n$0",
              },
            },
          ],
        },
        {
          type: "WhileStatement",
          loc: { start: { line: 8, column: 2 }, end: { line: 10, column: 3 } },
          test: {
            type: "Identifier",
            loc: {
              start: { line: 8, column: 9 },
              end: { line: 8, column: 13 },
            },
            name: "left",
            bindingKey: "left$35ew3k4d5ef7n$1",
          },
          body: {
            type: "BlockStatement",
            loc: {
              start: { line: 8, column: 15 },
              end: { line: 10, column: 3 },
            },
            body: [
              {
                type: "ExpressionStatement",
                loc: {
                  start: { line: 9, column: 4 },
                  end: { line: 9, column: 20 },
                },
                expression: {
                  type: "AssignmentExpression",
                  loc: {
                    start: { line: 9, column: 4 },
                    end: { line: 9, column: 19 },
                  },
                  operator: "=",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 9, column: 4 },
                      end: { line: 9, column: 8 },
                    },
                    name: "left",
                    bindingKey: "left$35ew3k4d5ef7n$1",
                  },
                  right: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 9, column: 11 },
                      end: { line: 9, column: 19 },
                    },
                    operator: "-",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 9, column: 11 },
                        end: { line: 9, column: 15 },
                      },
                      name: "left",
                      bindingKey: "left$35ew3k4d5ef7n$1",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 9, column: 18 },
                        end: { line: 9, column: 19 },
                      },
                      value: 1,
                    },
                  },
                },
              },
            ],
          },
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 11, column: 2 },
            end: { line: 11, column: 14 },
          },
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 11, column: 9 },
              end: { line: 11, column: 13 },
            },
            name: "left",
            bindingKey: "left$35ew3k4d5ef7n$1",
          },
        },
      ],
    },
    expression: false,
  }),
);
