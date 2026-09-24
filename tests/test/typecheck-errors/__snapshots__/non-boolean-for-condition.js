import { cs } from "@backtickjs/core";
// A `for` condition is a boolean like every other condition, header or not.
export default cs.create(
  { start: { line: 4, column: 15 }, end: { line: 11, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-for-condition.test.tsx",
    fileHash: "1jrbfwc2wu5y3",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 4, column: 18 }, end: { line: 11, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 4, column: 19 }, end: { line: 4, column: 20 } },
        name: "n",
        bindingKey: "n$1jrbfwc2wu5y3$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 4, column: 33 }, end: { line: 11, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 5, column: 2 }, end: { line: 5, column: 15 } },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 5, column: 6 },
                end: { line: 5, column: 14 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 5, column: 6 },
                  end: { line: 5, column: 10 },
                },
                name: "last",
                bindingKey: "last$1jrbfwc2wu5y3$1",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 5, column: 13 },
                  end: { line: 5, column: 14 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ForStatement",
          loc: { start: { line: 7, column: 2 }, end: { line: 9, column: 3 } },
          init: {
            type: "VariableDeclaration",
            loc: {
              start: { line: 7, column: 7 },
              end: { line: 7, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 7, column: 11 },
                  end: { line: 7, column: 16 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 7, column: 11 },
                    end: { line: 7, column: 12 },
                  },
                  name: "i",
                  bindingKey: "i$1jrbfwc2wu5y3$2",
                },
                init: {
                  type: "Identifier",
                  loc: {
                    start: { line: 7, column: 15 },
                    end: { line: 7, column: 16 },
                  },
                  name: "n",
                  bindingKey: "n$1jrbfwc2wu5y3$0",
                },
              },
            ],
          },
          test: {
            type: "Identifier",
            loc: {
              start: { line: 7, column: 18 },
              end: { line: 7, column: 19 },
            },
            name: "i",
            bindingKey: "i$1jrbfwc2wu5y3$2",
          },
          update: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 7, column: 21 },
              end: { line: 7, column: 30 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 7, column: 21 },
                end: { line: 7, column: 22 },
              },
              name: "i",
              bindingKey: "i$1jrbfwc2wu5y3$2",
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 7, column: 25 },
                end: { line: 7, column: 30 },
              },
              operator: "-",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 7, column: 25 },
                  end: { line: 7, column: 26 },
                },
                name: "i",
                bindingKey: "i$1jrbfwc2wu5y3$2",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 7, column: 29 },
                  end: { line: 7, column: 30 },
                },
                value: 1,
              },
            },
          },
          body: {
            type: "BlockStatement",
            loc: {
              start: { line: 7, column: 32 },
              end: { line: 9, column: 3 },
            },
            body: [
              {
                type: "ExpressionStatement",
                loc: {
                  start: { line: 8, column: 4 },
                  end: { line: 8, column: 13 },
                },
                expression: {
                  type: "AssignmentExpression",
                  loc: {
                    start: { line: 8, column: 4 },
                    end: { line: 8, column: 12 },
                  },
                  operator: "=",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 8, column: 4 },
                      end: { line: 8, column: 8 },
                    },
                    name: "last",
                    bindingKey: "last$1jrbfwc2wu5y3$1",
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 8, column: 11 },
                      end: { line: 8, column: 12 },
                    },
                    name: "i",
                    bindingKey: "i$1jrbfwc2wu5y3$2",
                  },
                },
              },
            ],
          },
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 10, column: 2 },
            end: { line: 10, column: 14 },
          },
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 10, column: 9 },
              end: { line: 10, column: 13 },
            },
            name: "last",
            bindingKey: "last$1jrbfwc2wu5y3$1",
          },
        },
      ],
    },
    expression: false,
  }),
);
