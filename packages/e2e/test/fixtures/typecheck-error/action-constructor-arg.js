import { cs } from "@backtickjs/core";
// An action is not data: a bare action can't ride into a construction as an
// argument — handlers are functions, which are values.
class Holder {
  "@backtickjs" = "ClientObject";
  press;
  constructor(press) {
    this.press = press;
  }
}
const action = cs.create(
  [16, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "action-constructor-arg.ts",
    fileHash: "t3cg066e2mwt",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [16, 19, 18, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [17, 3, 17, 15],
        name: {
          kind: "AstScriptIdentifier",
          loc: [17, 9, 17, 10],
          text: "x",
          bindingKey: "x$t3cg066e2mwt$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [17, 13, 17, 14],
          value: 1,
        },
        keyword: "const",
      },
    ],
  }),
);
export const held = cs.create(
  [20, 21, 23, 3],
  {
    version: "0.0.0",
    filePath: "action-constructor-arg.ts",
    fileHash: "t3cg066e2mwt",
    kind: "value",
    splices: { $Holder: Holder, $action: action },
    captures: [],
    spliceParams: { $Holder: [], $action: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [20, 24, 23, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [21, 3, 21, 34],
        name: {
          kind: "AstScriptIdentifier",
          loc: [21, 9, 21, 10],
          text: "h",
          bindingKey: "h$t3cg066e2mwt$1",
        },
        initializer: {
          kind: "AstScriptNewExpression",
          loc: [21, 13, 21, 33],
          expression: {
            kind: "AstScriptSplice",
            loc: [21, 17, 21, 24],
            key: "$Holder",
          },
          arguments: [
            {
              kind: "AstScriptSplice",
              loc: [21, 25, 21, 32],
              key: "$action",
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [22, 3, 22, 12],
        expression: {
          kind: "AstScriptNumericLiteral",
          loc: [22, 10, 22, 11],
          value: 1,
        },
      },
    ],
  }),
);
