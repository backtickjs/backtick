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
    filePath: "class-without-new.tsx",
    fileHash: "13txm1ruybpj5",
    splices: { $0splice0: Point },
    captures: [],
    declarations: ["C$13txm1ruybpj5$0"],
  },
  (v) =>
    v.block(
      [20, 19, 23, 2],
      [
        v.variableDeclaration(
          [21, 3, 21, 22],
          "const",
          v.identifier([21, 9, 21, 10], "C", "C$13txm1ruybpj5$0"),
          v.splice([21, 13, 21, 21], "$0splice0"),
        ),
        v.return(
          [22, 3, 22, 18],
          v.call(
            [22, 10, 22, 17],
            v.identifier([22, 10, 22, 11], "C", "C$13txm1ruybpj5$0"),
            [v.number([22, 12, 22, 13], 1), v.number([22, 15, 22, 16], 2)],
          ),
        ),
      ],
    ),
);
