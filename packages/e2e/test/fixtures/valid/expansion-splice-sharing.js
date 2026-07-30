import { cs } from "@backtickjs/core";
// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a, b) {
  return cs.create(
    [9, 10, 9, 27],
    {
      version: "0.0.0",
      filePath: "expansion-splice-sharing.ts",
      fileHash: "2kc5czyfqafly",
      kind: "value",
      splices: { $a: a, $b: b },
      captures: [],
      spliceParams: { $a: [], $b: [] },
    },
    (v) =>
      v.arrowFunction(
        [9, 13, 9, 26],
        [],
        v.binaryExpression(
          [9, 19, 9, 26],
          v.splice([9, 19, 9, 21], "$a"),
          "+",
          v.splice([9, 24, 9, 26], "$b"),
        ),
      ),
  );
}
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get sum() {
    return sum(this.x, this.y);
  }
}
class Size {
  "@backtickjs" = "ClientObject";
  width;
  height;
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get sum() {
    return sum(this.width, this.height);
  }
}
export default cs.create(
  [44, 16, 48, 3],
  {
    version: "0.0.0",
    filePath: "expansion-splice-sharing.ts",
    fileHash: "2kc5czyfqafly",
    kind: "value",
    splices: { $Point: Point, $Size: Size },
    captures: [],
    spliceParams: { $Point: [], $Size: [] },
  },
  (v) =>
    v.block(
      [44, 19, 48, 2],
      [
        v.variableDeclaration(
          [45, 3, 45, 30],
          v.identifier([45, 9, 45, 10], "p", "p$2kc5czyfqafly$0"),
          v.newExpression(
            [45, 13, 45, 29],
            v.splice([45, 17, 45, 23], "$Point"),
            [
              v.numericLiteral([45, 24, 45, 25], 1),
              v.numericLiteral([45, 27, 45, 28], 2),
            ],
          ),
          "const",
        ),
        v.variableDeclaration(
          [46, 3, 46, 29],
          v.identifier([46, 9, 46, 10], "s", "s$2kc5czyfqafly$1"),
          v.newExpression(
            [46, 13, 46, 28],
            v.splice([46, 17, 46, 22], "$Size"),
            [
              v.numericLiteral([46, 23, 46, 24], 3),
              v.numericLiteral([46, 26, 46, 27], 4),
            ],
          ),
          "const",
        ),
        v.returnStatement(
          [47, 3, 47, 28],
          v.binaryExpression(
            [47, 10, 47, 27],
            v.callExpression(
              [47, 10, 47, 17],
              v.propertyAccessExpression(
                [47, 10, 47, 15],
                v.identifier([47, 10, 47, 11], "p", "p$2kc5czyfqafly$0"),
                false,
                "sum",
              ),
              false,
              [],
            ),
            "+",
            v.callExpression(
              [47, 20, 47, 27],
              v.propertyAccessExpression(
                [47, 20, 47, 25],
                v.identifier([47, 20, 47, 21], "s", "s$2kc5czyfqafly$1"),
                false,
                "sum",
              ),
              false,
              [],
            ),
          ),
        ),
      ],
    ),
);
