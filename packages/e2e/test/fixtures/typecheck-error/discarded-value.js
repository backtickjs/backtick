import { cs } from "@backtickjs/core";
// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.create(
  [6, 18, 8, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [6, 21, 8, 2],
    parameters: [],
    body: {
      kind: "AstScriptBlock",
      loc: [6, 27, 8, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [7, 3, 7, 12],
          expression: {
            kind: "AstScriptNumericLiteral",
            loc: [7, 10, 7, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
const ping = cs.create(
  [10, 14, 13, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [10, 17, 13, 2],
    parameters: [],
    body: {
      kind: "AstScriptBlock",
      loc: [10, 23, 13, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [11, 3, 11, 13],
          name: {
            kind: "AstScriptIdentifier",
            loc: [11, 7, 11, 8],
            text: "n",
            bindingKey: "n$1y1jdbv3pfwln$0",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [11, 11, 11, 12],
            value: 0,
          },
          keyword: "let",
        },
        {
          kind: "AstScriptBinaryExpression",
          loc: [12, 3, 12, 8],
          left: {
            kind: "AstScriptIdentifier",
            loc: [12, 3, 12, 4],
            text: "n",
            bindingKey: "n$1y1jdbv3pfwln$0",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [12, 7, 12, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const action = cs.create(
  [15, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "action",
    splices: { $ping: ping, $getValue: getValue },
    captures: [],
    spliceParams: { $ping: [], $getValue: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [15, 19, 18, 2],
    statements: [
      {
        kind: "AstScriptCallExpression",
        loc: [16, 3, 16, 10],
        expression: {
          kind: "AstScriptSplice",
          loc: [16, 3, 16, 8],
          key: "$ping",
        },
        questionDotToken: false,
        arguments: [],
      },
      {
        kind: "AstScriptCallExpression",
        loc: [17, 3, 17, 14],
        expression: {
          kind: "AstScriptSplice",
          loc: [17, 3, 17, 12],
          key: "$getValue",
        },
        questionDotToken: false,
        arguments: [],
      },
    ],
  }),
);
