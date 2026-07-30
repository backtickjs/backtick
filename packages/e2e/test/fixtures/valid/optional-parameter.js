import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter — sugar for `T | null`, not an optional
// argument: callers pass `null` explicitly, and `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [5, 18, 7, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [5, 19, 5, 32],
        name: {
          kind: "AstScriptIdentifier",
          loc: [5, 19, 5, 23],
          text: "name",
          bindingKey: "name$hlti23avj5mo$0",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [5, 37, 7, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [6, 3, 6, 28],
          expression: {
            kind: "AstScriptCallExpression",
            loc: [6, 10, 6, 27],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [6, 10, 6, 22],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [6, 10, 6, 14],
                text: "name",
                bindingKey: "name$hlti23avj5mo$0",
              },
              questionDotToken: true,
              name: "concat",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: "AstScriptStringLiteral",
                loc: [6, 23, 6, 26],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.create(
  [10, 16, 10, 27],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [10, 19, 10, 26],
    parameters: [],
    body: {
      kind: "AstScriptNumericLiteral",
      loc: [10, 25, 10, 26],
      value: 2,
    },
  }),
);
const call = cs.create(
  [12, 14, 14, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [12, 17, 14, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [12, 18, 12, 35],
        name: {
          kind: "AstScriptIdentifier",
          loc: [12, 18, 12, 20],
          text: "cb",
          bindingKey: "cb$hlti23avj5mo$1",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [12, 40, 14, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [13, 3, 13, 22],
          expression: {
            kind: "AstScriptBinaryExpression",
            loc: [13, 10, 13, 21],
            left: {
              kind: "AstScriptCallExpression",
              loc: [13, 10, 13, 16],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [13, 10, 13, 12],
                text: "cb",
                bindingKey: "cb$hlti23avj5mo$1",
              },
              questionDotToken: true,
              arguments: [],
            },
            operatorToken: "??",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [13, 20, 13, 21],
              value: 0,
            },
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [16, 16, 21, 4],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: { $greet: greet, $call: call, $double: double },
    captures: [],
    spliceParams: { $greet: [], $call: [], $double: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [16, 20, 21, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [17, 3, 17, 22],
        name: "named",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [17, 10, 17, 22],
          expression: {
            kind: "AstScriptSplice",
            loc: [17, 10, 17, 16],
            key: "$greet",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptStringLiteral",
              loc: [17, 17, 17, 21],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [18, 3, 18, 25],
        name: "explicit",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [18, 13, 18, 25],
          expression: {
            kind: "AstScriptSplice",
            loc: [18, 13, 18, 19],
            key: "$greet",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptNullLiteral",
              loc: [18, 20, 18, 24],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [19, 3, 19, 27],
        name: "supplied",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [19, 13, 19, 27],
          expression: {
            kind: "AstScriptSplice",
            loc: [19, 13, 19, 18],
            key: "$call",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptSplice",
              loc: [19, 19, 19, 26],
              key: "$double",
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [20, 3, 20, 24],
        name: "fallback",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [20, 13, 20, 24],
          expression: {
            kind: "AstScriptSplice",
            loc: [20, 13, 20, 18],
            key: "$call",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptNullLiteral",
              loc: [20, 19, 20, 23],
            },
          ],
        },
      },
    ],
  }),
);
