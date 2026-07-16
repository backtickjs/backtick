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
// A spliced class lowers to a function with one hole per constructor
// parameter, and a construction is a plain call of that value — so the
// class can pass through a local and be instantiated on another line.
export default cs.create(
  [19, 16, 23, 3],
  {
    filePath: "new-local-class.tsx",
    fileHash: "16o0u4jpvri74",
    splices: { $Point: Point },
    captures: [],
    declarations: ["C$16o0u4jpvri74$0", "p$16o0u4jpvri74$1"],
  },
  (v) =>
    v.block(
      [19, 19, 23, 2],
      [
        v.variableDeclaration(
          [20, 3, 20, 20],
          "const",
          v.identifier([20, 9, 20, 10], "C", "C$16o0u4jpvri74$0"),
          v.splice([20, 13, 20, 19], "$Point"),
        ),
        v.variableDeclaration(
          [21, 3, 21, 25],
          "const",
          v.identifier([21, 9, 21, 10], "p", "p$16o0u4jpvri74$1"),
          v.new(
            [21, 13, 21, 24],
            v.identifier([21, 17, 21, 18], "C", "C$16o0u4jpvri74$0"),
            [v.number([21, 19, 21, 20], 1), v.number([21, 22, 21, 23], 2)],
          ),
        ),
        v.return(
          [22, 3, 22, 20],
          v.binop(
            [22, 10, 22, 19],
            v.propertyAccess(
              [22, 10, 22, 13],
              v.identifier([22, 10, 22, 11], "p", "p$16o0u4jpvri74$1"),
              "x",
            ),
            "+",
            v.propertyAccess(
              [22, 16, 22, 19],
              v.identifier([22, 16, 22, 17], "p", "p$16o0u4jpvri74$1"),
              "y",
            ),
          ),
        ),
      ],
    ),
);
