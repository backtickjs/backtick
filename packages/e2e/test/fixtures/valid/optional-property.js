import { cs } from "@backtickjs/core";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-property.ts",
    fileHash: "10vcjd80vhoob",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [6, 17, 8, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [6, 18, 6, 62],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 18, 6, 19],
          text: "o",
          bindingKey: "o$10vcjd80vhoob$0",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [6, 67, 8, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [7, 3, 7, 37],
          expression: {
            kind: "AstScriptArrayLiteralExpression",
            loc: [7, 10, 7, 36],
            elements: [
              {
                kind: "AstScriptPropertyAccessExpression",
                loc: [7, 11, 7, 18],
                expression: {
                  kind: "AstScriptIdentifier",
                  loc: [7, 11, 7, 12],
                  text: "o",
                  bindingKey: "o$10vcjd80vhoob$0",
                },
                questionDotToken: false,
                name: "label",
              },
              {
                kind: "AstScriptBinaryExpression",
                loc: [7, 20, 7, 35],
                left: {
                  kind: "AstScriptPropertyAccessExpression",
                  loc: [7, 20, 7, 30],
                  expression: {
                    kind: "AstScriptPropertyAccessExpression",
                    loc: [7, 20, 7, 27],
                    expression: {
                      kind: "AstScriptIdentifier",
                      loc: [7, 20, 7, 21],
                      text: "o",
                      bindingKey: "o$10vcjd80vhoob$0",
                    },
                    questionDotToken: false,
                    name: "inner",
                  },
                  questionDotToken: true,
                  name: "z",
                },
                operatorToken: "??",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [7, 34, 7, 35],
                  value: 0,
                },
              },
            ],
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [10, 16, 14, 4],
  {
    version: "0.0.0",
    filePath: "optional-property.ts",
    fileHash: "10vcjd80vhoob",
    kind: "value",
    splices: { $read: read },
    captures: [],
    spliceParams: { $read: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [10, 20, 14, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [11, 3, 11, 50],
        name: "present",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [11, 12, 11, 50],
          expression: {
            kind: "AstScriptSplice",
            loc: [11, 12, 11, 17],
            key: "$read",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [11, 18, 11, 49],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [11, 20, 11, 30],
                  name: "label",
                  initializer: {
                    kind: "AstScriptStringLiteral",
                    loc: [11, 27, 11, 30],
                    text: "a",
                  },
                },
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [11, 32, 11, 47],
                  name: "inner",
                  initializer: {
                    kind: "AstScriptObjectLiteralExpression",
                    loc: [11, 39, 11, 47],
                    properties: [
                      {
                        kind: "AstScriptPropertyAssignment",
                        loc: [11, 41, 11, 45],
                        name: "z",
                        initializer: {
                          kind: "AstScriptNumericLiteral",
                          loc: [11, 44, 11, 45],
                          value: 3,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [12, 3, 12, 44],
        name: "partial",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [12, 12, 12, 44],
          expression: {
            kind: "AstScriptSplice",
            loc: [12, 12, 12, 17],
            key: "$read",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [12, 18, 12, 43],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [12, 20, 12, 30],
                  name: "label",
                  initializer: {
                    kind: "AstScriptStringLiteral",
                    loc: [12, 27, 12, 30],
                    text: "b",
                  },
                },
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [12, 32, 12, 41],
                  name: "inner",
                  initializer: {
                    kind: "AstScriptObjectLiteralExpression",
                    loc: [12, 39, 12, 41],
                    properties: [],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [13, 3, 13, 33],
        name: "omitted",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [13, 12, 13, 33],
          expression: {
            kind: "AstScriptSplice",
            loc: [13, 12, 13, 17],
            key: "$read",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [13, 18, 13, 32],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [13, 20, 13, 30],
                  name: "label",
                  initializer: {
                    kind: "AstScriptStringLiteral",
                    loc: [13, 27, 13, 30],
                    text: "c",
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
