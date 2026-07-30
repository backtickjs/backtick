import { cs } from "@backtickjs/core";
// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate = cs.create(
  [9, 58, 18, 3],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [9, 61, 18, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [10, 3, 10, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 3, 10, 4],
          text: "a",
          bindingKey: "a$2nymys98gllff$0",
        },
      },
      {
        kind: "AstScriptParameterDeclaration",
        loc: [11, 3, 11, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [11, 3, 11, 4],
          text: "b",
          bindingKey: "b$2nymys98gllff$1",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [12, 6, 18, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [13, 3, 13, 36],
          name: {
            kind: "AstScriptIdentifier",
            loc: [13, 9, 13, 13],
            text: "keep",
            bindingKey: "keep$2nymys98gllff$2",
          },
          initializer: {
            kind: "AstScriptArrowFunction",
            loc: [13, 16, 13, 35],
            parameters: [
              {
                kind: "AstScriptParameterDeclaration",
                loc: [13, 17, 13, 28],
                name: {
                  kind: "AstScriptIdentifier",
                  loc: [13, 17, 13, 19],
                  text: "on",
                  bindingKey: "on$2nymys98gllff$3",
                },
              },
            ],
            body: {
              kind: "AstScriptIdentifier",
              loc: [13, 33, 13, 35],
              text: "on",
              bindingKey: "on$2nymys98gllff$3",
            },
          },
          keyword: "const",
        },
        {
          kind: "AstScriptIfStatement",
          loc: [14, 3, 16, 4],
          expression: {
            kind: "AstScriptCallExpression",
            loc: [14, 7, 14, 19],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [14, 7, 14, 11],
              text: "keep",
              bindingKey: "keep$2nymys98gllff$2",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: "AstScriptBinaryExpression",
                loc: [14, 12, 14, 18],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [14, 12, 14, 13],
                  text: "a",
                  bindingKey: "a$2nymys98gllff$0",
                },
                operatorToken: "&&",
                right: {
                  kind: "AstScriptIdentifier",
                  loc: [14, 17, 14, 18],
                  text: "b",
                  bindingKey: "b$2nymys98gllff$1",
                },
              },
            ],
          },
          thenStatement: {
            kind: "AstScriptBlock",
            loc: [14, 21, 16, 4],
            statements: [
              {
                kind: "AstScriptReturnStatement",
                loc: [15, 5, 15, 19],
                expression: {
                  kind: "AstScriptStringLiteral",
                  loc: [15, 12, 15, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "AstScriptReturnStatement",
          loc: [17, 3, 17, 20],
          expression: {
            kind: "AstScriptStringLiteral",
            loc: [17, 10, 17, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [20, 16, 23, 4],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: { $gate: gate },
    captures: [],
    spliceParams: { $gate: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [20, 20, 23, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [21, 3, 21, 26],
        name: "both",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [21, 9, 21, 26],
          expression: {
            kind: "AstScriptSplice",
            loc: [21, 9, 21, 14],
            key: "$gate",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptTrueLiteral",
              loc: [21, 15, 21, 19],
            },
            {
              kind: "AstScriptTrueLiteral",
              loc: [21, 21, 21, 25],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [22, 3, 22, 26],
        name: "one",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [22, 8, 22, 26],
          expression: {
            kind: "AstScriptSplice",
            loc: [22, 8, 22, 13],
            key: "$gate",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptTrueLiteral",
              loc: [22, 14, 22, 18],
            },
            {
              kind: "AstScriptFalseLiteral",
              loc: [22, 20, 22, 25],
            },
          ],
        },
      },
    ],
  }),
);
