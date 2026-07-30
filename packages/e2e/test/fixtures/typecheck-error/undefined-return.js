import { cs } from "@backtickjs/core";
const lying = cs.create(
  [11, 36, 11, 50],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [11, 39, 11, 49],
    parameters: [],
    body: {
      kind: "AstScriptStringLiteral",
      loc: [11, 45, 11, 49],
      text: "hi",
    },
  }),
);
export default cs.create(
  [13, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: { $lying: lying },
    captures: [],
    spliceParams: { $lying: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [13, 19, 17, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [14, 3, 14, 25],
        name: {
          kind: "AstScriptIdentifier",
          loc: [14, 9, 14, 15],
          text: "stored",
          bindingKey: "stored$19ws50ksjspoc$0",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [14, 18, 14, 24],
          key: "$lying",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [15, 3, 15, 27],
        name: {
          kind: "AstScriptIdentifier",
          loc: [15, 9, 15, 15],
          text: "caught",
          bindingKey: "caught$19ws50ksjspoc$1",
        },
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [15, 18, 15, 26],
          expression: {
            kind: "AstScriptSplice",
            loc: [15, 18, 15, 24],
            key: "$lying",
          },
          questionDotToken: false,
          arguments: [],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "AstScriptNumericLiteral",
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
