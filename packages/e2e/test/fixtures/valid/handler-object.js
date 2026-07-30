import { cs } from "@backtickjs/core";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [5, 28, 8, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [5, 31, 8, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [6, 3, 6, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 7, 6, 8],
          text: "n",
          bindingKey: "n$gyja921xjk87$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [6, 11, 6, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptBinaryExpression",
        loc: [7, 3, 7, 8],
        left: {
          kind: "AstScriptIdentifier",
          loc: [7, 3, 7, 4],
          text: "n",
          bindingKey: "n$gyja921xjk87$0",
        },
        operatorToken: "=",
        right: {
          kind: "AstScriptNumericLiteral",
          loc: [7, 7, 7, 8],
          value: 1,
        },
      },
    ],
  }),
);
const onTap = cs.create(
  [10, 45, 12, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $beep: beep },
    captures: [],
    spliceParams: { $beep: [] },
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [10, 48, 12, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [10, 49, 10, 59],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 49, 10, 51],
          text: "id",
          bindingKey: "id$gyja921xjk87$1",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [10, 64, 12, 2],
      statements: [
        {
          kind: "AstScriptSplice",
          loc: [11, 3, 11, 8],
          key: "$beep",
        },
      ],
    },
  }),
);
export default cs.create(
  [14, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $onTap: onTap },
    captures: [],
    spliceParams: { $onTap: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [14, 19, 20, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [15, 3, 18, 5],
        name: {
          kind: "AstScriptIdentifier",
          loc: [15, 9, 15, 17],
          text: "handlers",
          bindingKey: "handlers$gyja921xjk87$2",
        },
        initializer: {
          kind: "AstScriptObjectLiteralExpression",
          loc: [15, 20, 18, 4],
          properties: [
            {
              kind: "AstScriptPropertyAssignment",
              loc: [16, 5, 16, 16],
              name: "tap",
              initializer: {
                kind: "AstScriptSplice",
                loc: [16, 10, 16, 16],
                key: "$onTap",
              },
            },
            {
              kind: "AstScriptPropertyAssignment",
              loc: [17, 5, 17, 17],
              name: "hold",
              initializer: {
                kind: "AstScriptSplice",
                loc: [17, 11, 17, 17],
                key: "$onTap",
              },
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [19, 3, 19, 19],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [19, 10, 19, 18],
          text: "handlers",
          bindingKey: "handlers$gyja921xjk87$2",
        },
      },
    ],
  }),
);
