import { cs } from "@backtickjs/core";
// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.create(
  [10, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "nested-non-boolean-operand.ts",
    fileHash: "1yqqpc9g2l4nh",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [10, 19, 16, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [10, 20, 10, 33],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 20, 10, 25],
          text: "count",
          bindingKey: "count$1yqqpc9g2l4nh$0",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [10, 38, 16, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [11, 3, 11, 36],
          name: {
            kind: "AstScriptIdentifier",
            loc: [11, 9, 11, 13],
            text: "keep",
            bindingKey: "keep$1yqqpc9g2l4nh$1",
          },
          initializer: {
            kind: "AstScriptArrowFunction",
            loc: [11, 16, 11, 35],
            parameters: [
              {
                kind: "AstScriptParameterDeclaration",
                loc: [11, 17, 11, 28],
                name: {
                  kind: "AstScriptIdentifier",
                  loc: [11, 17, 11, 19],
                  text: "on",
                  bindingKey: "on$1yqqpc9g2l4nh$2",
                },
              },
            ],
            body: {
              kind: "AstScriptIdentifier",
              loc: [11, 33, 11, 35],
              text: "on",
              bindingKey: "on$1yqqpc9g2l4nh$2",
            },
          },
          keyword: "const",
        },
        {
          kind: "AstScriptIfStatement",
          loc: [12, 3, 14, 4],
          expression: {
            kind: "AstScriptCallExpression",
            loc: [12, 7, 12, 31],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [12, 7, 12, 11],
              text: "keep",
              bindingKey: "keep$1yqqpc9g2l4nh$1",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: "AstScriptBinaryExpression",
                loc: [12, 12, 12, 30],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [12, 12, 12, 17],
                  text: "count",
                  bindingKey: "count$1yqqpc9g2l4nh$0",
                },
                operatorToken: "&&",
                right: {
                  kind: "AstScriptBinaryExpression",
                  loc: [12, 21, 12, 30],
                  left: {
                    kind: "AstScriptIdentifier",
                    loc: [12, 21, 12, 26],
                    text: "count",
                    bindingKey: "count$1yqqpc9g2l4nh$0",
                  },
                  operatorToken: ">",
                  right: {
                    kind: "AstScriptNumericLiteral",
                    loc: [12, 29, 12, 30],
                    value: 0,
                  },
                },
              },
            ],
          },
          thenStatement: {
            kind: "AstScriptBlock",
            loc: [12, 33, 14, 4],
            statements: [
              {
                kind: "AstScriptReturnStatement",
                loc: [13, 5, 13, 19],
                expression: {
                  kind: "AstScriptStringLiteral",
                  loc: [13, 12, 13, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "AstScriptReturnStatement",
          loc: [15, 3, 15, 20],
          expression: {
            kind: "AstScriptStringLiteral",
            loc: [15, 10, 15, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
