import { cs } from "@backtickjs/core";
// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
export default cs.create(
  [6, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "for-nested-shadowing.ts",
    fileHash: "2qq4wmxi2b090",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [6, 19, 15, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 16],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 7, 7, 10],
          text: "out",
          bindingKey: "out$2qq4wmxi2b090$0",
        },
        initializer: {
          kind: "AstScriptStringLiteral",
          loc: [7, 13, 7, 15],
          text: "",
        },
        keyword: "let",
      },
      {
        kind: "AstScriptForStatement",
        loc: [8, 3, 13, 4],
        initializer: {
          kind: "AstScriptVariableDeclaration",
          loc: [8, 8, 8, 17],
          name: {
            kind: "AstScriptIdentifier",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$2qq4wmxi2b090$1",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 16, 8, 17],
            value: 0,
          },
          keyword: "let",
        },
        condition: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 19, 8, 24],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$2qq4wmxi2b090$1",
          },
          operatorToken: "<",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 23, 8, 24],
            value: 2,
          },
        },
        incrementor: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 26, 8, 35],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$2qq4wmxi2b090$1",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [8, 30, 8, 35],
            left: {
              kind: "AstScriptIdentifier",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$2qq4wmxi2b090$1",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "AstScriptBlock",
          loc: [8, 37, 13, 4],
          statements: [
            {
              kind: "AstScriptVariableDeclaration",
              loc: [9, 5, 9, 19],
              name: {
                kind: "AstScriptIdentifier",
                loc: [9, 11, 9, 12],
                text: "i",
                bindingKey: "i$2qq4wmxi2b090$2",
              },
              initializer: {
                kind: "AstScriptStringLiteral",
                loc: [9, 15, 9, 18],
                text: "-",
              },
              keyword: "const",
            },
            {
              kind: "AstScriptForStatement",
              loc: [10, 5, 12, 6],
              initializer: {
                kind: "AstScriptVariableDeclaration",
                loc: [10, 10, 10, 19],
                name: {
                  kind: "AstScriptIdentifier",
                  loc: [10, 14, 10, 15],
                  text: "j",
                  bindingKey: "j$2qq4wmxi2b090$3",
                },
                initializer: {
                  kind: "AstScriptNumericLiteral",
                  loc: [10, 18, 10, 19],
                  value: 0,
                },
                keyword: "let",
              },
              condition: {
                kind: "AstScriptBinaryExpression",
                loc: [10, 21, 10, 26],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [10, 21, 10, 22],
                  text: "j",
                  bindingKey: "j$2qq4wmxi2b090$3",
                },
                operatorToken: "<",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [10, 25, 10, 26],
                  value: 2,
                },
              },
              incrementor: {
                kind: "AstScriptBinaryExpression",
                loc: [10, 28, 10, 37],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [10, 28, 10, 29],
                  text: "j",
                  bindingKey: "j$2qq4wmxi2b090$3",
                },
                operatorToken: "=",
                right: {
                  kind: "AstScriptBinaryExpression",
                  loc: [10, 32, 10, 37],
                  left: {
                    kind: "AstScriptIdentifier",
                    loc: [10, 32, 10, 33],
                    text: "j",
                    bindingKey: "j$2qq4wmxi2b090$3",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "AstScriptNumericLiteral",
                    loc: [10, 36, 10, 37],
                    value: 1,
                  },
                },
              },
              statement: {
                kind: "AstScriptBlock",
                loc: [10, 39, 12, 6],
                statements: [
                  {
                    kind: "AstScriptBinaryExpression",
                    loc: [11, 7, 11, 24],
                    left: {
                      kind: "AstScriptIdentifier",
                      loc: [11, 7, 11, 10],
                      text: "out",
                      bindingKey: "out$2qq4wmxi2b090$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "AstScriptBinaryExpression",
                      loc: [11, 13, 11, 24],
                      left: {
                        kind: "AstScriptBinaryExpression",
                        loc: [11, 13, 11, 20],
                        left: {
                          kind: "AstScriptIdentifier",
                          loc: [11, 13, 11, 16],
                          text: "out",
                          bindingKey: "out$2qq4wmxi2b090$0",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "AstScriptIdentifier",
                          loc: [11, 19, 11, 20],
                          text: "i",
                          bindingKey: "i$2qq4wmxi2b090$2",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "AstScriptIdentifier",
                        loc: [11, 23, 11, 24],
                        text: "j",
                        bindingKey: "j$2qq4wmxi2b090$3",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [14, 3, 14, 14],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [14, 10, 14, 13],
          text: "out",
          bindingKey: "out$2qq4wmxi2b090$0",
        },
      },
    ],
  }),
);
