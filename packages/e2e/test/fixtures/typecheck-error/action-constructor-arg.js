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
  (v) =>
    v.block(
      [16, 19, 18, 2],
      [
        v.variableDeclaration(
          [17, 3, 17, 15],
          v.identifier([17, 9, 17, 10], "x", "x$t3cg066e2mwt$0"),
          v.numericLiteral([17, 13, 17, 14], 1),
          "const",
        ),
      ],
    ),
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
  (v) =>
    v.block(
      [20, 24, 23, 2],
      [
        v.variableDeclaration(
          [21, 3, 21, 34],
          v.identifier([21, 9, 21, 10], "h", "h$t3cg066e2mwt$1"),
          v.newExpression(
            [21, 13, 21, 33],
            v.splice([21, 17, 21, 24], "$Holder"),
            [v.splice([21, 25, 21, 32], "$action")],
          ),
          "const",
        ),
        v.returnStatement(
          [22, 3, 22, 12],
          v.numericLiteral([22, 10, 22, 11], 1),
        ),
      ],
    ),
);
