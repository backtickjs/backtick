import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// A construction and a plain call lower identically — a spliced class is a
// function with holes by the time the client runs — so the typechecker is
// what keeps them apart: the virtual code types a spliced class as the
// class itself, and calling a constructor without `new` is a type error.
export default cs.create(
  [20, 16, 23, 3],
  {
    version: "0.0.0",
    filePath: "class-without-new.tsx",
    fileHash: "1n6hvxiblc91f",
    kind: "value",
    splices: { $Point: Point },
    captures: [],
    spliceParams: { $Point: [] },
  },
  (v) =>
    v.block(
      [20, 19, 23, 2],
      [
        v.variableDeclaration(
          [21, 3, 21, 20],
          v.identifier([21, 9, 21, 10], "C", "C$1n6hvxiblc91f$0"),
          v.splice([21, 13, 21, 19], "$Point"),
          "const",
        ),
        v.returnStatement(
          [22, 3, 22, 18],
          v.callExpression(
            [22, 10, 22, 17],
            v.identifier([22, 10, 22, 11], "C", "C$1n6hvxiblc91f$0"),
            false,
            [
              v.numericLiteral([22, 12, 22, 13], 1),
              v.numericLiteral([22, 15, 22, 16], 2),
            ],
          ),
        ),
      ],
    ),
);
