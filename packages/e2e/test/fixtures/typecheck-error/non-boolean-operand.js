import { cs } from "@backtickjs/core";
// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.create(
  [6, 16, 8, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-operand.ts",
    fileHash: "3kpojr67liy8x",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [6, 19, 8, 2],
    parameters: [
      {
        kind: "AstScriptParameterDeclaration",
        loc: [6, 20, 6, 33],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 20, 6, 25],
          text: "count",
          bindingKey: "count$3kpojr67liy8x$0",
        },
      },
      {
        kind: "AstScriptParameterDeclaration",
        loc: [6, 35, 6, 48],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 35, 6, 39],
          text: "flag",
          bindingKey: "flag$3kpojr67liy8x$1",
        },
      },
    ],
    body: {
      kind: "AstScriptBlock",
      loc: [6, 53, 8, 2],
      statements: [
        {
          kind: "AstScriptReturnStatement",
          loc: [7, 3, 7, 36],
          expression: {
            kind: "AstScriptBinaryExpression",
            loc: [7, 10, 7, 35],
            left: {
              kind: "AstScriptBinaryExpression",
              loc: [7, 11, 7, 24],
              left: {
                kind: "AstScriptIdentifier",
                loc: [7, 11, 7, 16],
                text: "count",
                bindingKey: "count$3kpojr67liy8x$0",
              },
              operatorToken: "&&",
              right: {
                kind: "AstScriptIdentifier",
                loc: [7, 20, 7, 24],
                text: "flag",
                bindingKey: "flag$3kpojr67liy8x$1",
              },
            },
            operatorToken: "||",
            right: {
              kind: "AstScriptStringLiteral",
              loc: [7, 29, 7, 35],
              text: "none",
            },
          },
        },
      ],
    },
  }),
);
