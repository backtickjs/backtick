import { cs } from "@backtickjs/core";
const stored = cs.create(
  [8, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [8, 19, 11, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [8, 20, 8, 28],
        name: {
          kind: "AstScriptIdentifier",
          loc: [8, 20, 8, 21],
          text: "x",
          bindingKey: "x$18uwl3j62c30b$0",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [8, 33, 11, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [9, 3, 9, 15],
          name: {
            kind: "AstScriptIdentifier",
            loc: [9, 9, 9, 10],
            text: "y",
            bindingKey: "y$18uwl3j62c30b$1",
          },
          initializer: {
            kind: "AstScriptIdentifier",
            loc: [9, 13, 9, 14],
            text: "x",
            bindingKey: "x$18uwl3j62c30b$0",
          },
          keyword: "const",
        },
        {
          kind: "AstScriptReturnStatement",
          loc: [10, 3, 10, 12],
          expression: {
            kind: "AstScriptNumericLiteral",
            loc: [10, 10, 10, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
const written = cs.create(
  [13, 17, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [13, 20, 17, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [13, 21, 13, 29],
        name: {
          kind: "AstScriptIdentifier",
          loc: [13, 21, 13, 22],
          text: "x",
          bindingKey: "x$18uwl3j62c30b$2",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [13, 34, 17, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [14, 3, 14, 14],
          name: {
            kind: "AstScriptIdentifier",
            loc: [14, 7, 14, 8],
            text: "y",
            bindingKey: "y$18uwl3j62c30b$3",
          },
          initializer: {
            kind: "AstScriptStringLiteral",
            loc: [14, 11, 14, 13],
            text: "",
          },
          keyword: "let",
        },
        {
          kind: "AstScriptBinaryExpression",
          loc: [15, 3, 15, 8],
          left: {
            kind: "AstScriptIdentifier",
            loc: [15, 3, 15, 4],
            text: "y",
            bindingKey: "y$18uwl3j62c30b$3",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptIdentifier",
            loc: [15, 7, 15, 8],
            text: "x",
            bindingKey: "x$18uwl3j62c30b$2",
          },
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
    },
  }),
);
