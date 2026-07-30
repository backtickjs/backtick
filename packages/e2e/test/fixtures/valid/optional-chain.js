import { cs } from "@backtickjs/core";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
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
        loc: [6, 18, 6, 41],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 18, 6, 19],
          text: "p",
          bindingKey: "p$1k96f1nwptp9k$0",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [6, 46, 8, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [7, 3, 7, 15],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [7, 10, 7, 14],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [7, 10, 7, 11],
              text: "p",
              bindingKey: "p$1k96f1nwptp9k$0",
            },
            questionDotToken: true,
            name: "x",
          },
        },
      ],
    },
  }),
);
const deep = cs.create(
  [10, 14, 12, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [10, 17, 12, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [10, 18, 10, 59],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 18, 10, 19],
          text: "o",
          bindingKey: "o$1k96f1nwptp9k$1",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [10, 64, 12, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [11, 3, 11, 22],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [11, 10, 11, 21],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [11, 10, 11, 18],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [11, 10, 11, 11],
                text: "o",
                bindingKey: "o$1k96f1nwptp9k$1",
              },
              questionDotToken: true,
              name: "inner",
            },
            questionDotToken: true,
            name: "z",
          },
        },
      ],
    },
  }),
);
const shout = cs.create(
  [14, 15, 16, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [14, 18, 16, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [14, 19, 14, 35],
        name: {
          kind: "AstScriptIdentifier",
          loc: [14, 19, 14, 20],
          text: "s",
          bindingKey: "s$1k96f1nwptp9k$2",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [14, 40, 16, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [15, 3, 15, 25],
          expression: {
            kind: "AstScriptCallExpression",
            loc: [15, 10, 15, 24],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [15, 10, 15, 19],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [15, 10, 15, 11],
                text: "s",
                bindingKey: "s$1k96f1nwptp9k$2",
              },
              questionDotToken: true,
              name: "concat",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: "AstScriptStringLiteral",
                loc: [15, 20, 15, 23],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [18, 16, 26, 4],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: { $pick: pick, $deep: deep, $shout: shout },
    captures: [],
    spliceParams: { $pick: [], $deep: [], $shout: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [18, 20, 26, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [19, 3, 19, 25],
        name: "found",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [19, 10, 19, 25],
          expression: {
            kind: "AstScriptSplice",
            loc: [19, 10, 19, 15],
            key: "$pick",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [19, 16, 19, 24],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [19, 18, 19, 22],
                  name: "x",
                  initializer: {
                    kind: "AstScriptNumericLiteral",
                    loc: [19, 21, 19, 22],
                    value: 5,
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [20, 3, 20, 23],
        name: "missing",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [20, 12, 20, 23],
          expression: {
            kind: "AstScriptSplice",
            loc: [20, 12, 20, 17],
            key: "$pick",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptNullLiteral",
              loc: [20, 18, 20, 22],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [21, 3, 21, 35],
        name: "deep",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [21, 9, 21, 35],
          expression: {
            kind: "AstScriptSplice",
            loc: [21, 9, 21, 14],
            key: "$deep",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [21, 15, 21, 34],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [21, 17, 21, 32],
                  name: "inner",
                  initializer: {
                    kind: "AstScriptObjectLiteralExpression",
                    loc: [21, 24, 21, 32],
                    properties: [
                      {
                        kind: "AstScriptPropertyAssignment",
                        loc: [21, 26, 21, 30],
                        name: "z",
                        initializer: {
                          kind: "AstScriptNumericLiteral",
                          loc: [21, 29, 21, 30],
                          value: 7,
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
        loc: [22, 3, 22, 30],
        name: "cut",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [22, 8, 22, 30],
          expression: {
            kind: "AstScriptSplice",
            loc: [22, 8, 22, 13],
            key: "$deep",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptObjectLiteralExpression",
              loc: [22, 14, 22, 29],
              properties: [
                {
                  kind: "AstScriptPropertyAssignment",
                  loc: [22, 16, 22, 27],
                  name: "inner",
                  initializer: {
                    kind: "AstScriptNullLiteral",
                    loc: [22, 23, 22, 27],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [23, 3, 23, 19],
        name: "top",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [23, 8, 23, 19],
          expression: {
            kind: "AstScriptSplice",
            loc: [23, 8, 23, 13],
            key: "$deep",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptNullLiteral",
              loc: [23, 14, 23, 18],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [24, 3, 24, 21],
        name: "loud",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [24, 9, 24, 21],
          expression: {
            kind: "AstScriptSplice",
            loc: [24, 9, 24, 15],
            key: "$shout",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptStringLiteral",
              loc: [24, 16, 24, 20],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [25, 3, 25, 23],
        name: "silent",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [25, 11, 25, 23],
          expression: {
            kind: "AstScriptSplice",
            loc: [25, 11, 25, 17],
            key: "$shout",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptNullLiteral",
              loc: [25, 18, 25, 22],
            },
          ],
        },
      },
    ],
  }),
);
