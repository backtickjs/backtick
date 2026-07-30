import { cs } from "@backtickjs/core";
class Circle {
  "@backtickjs" = "ClientObject";
  r;
  constructor(r) {
    this.r = r;
  }
}
class Square {
  "@backtickjs" = "ClientObject";
  side;
  constructor(side) {
    this.side = side;
  }
}
// ONE template, ONE source location — but each call splices a different
// class into it.
function make(Shape) {
  return cs.create(
    [23, 10, 23, 27],
    {
      version: "0.0.0",
      filePath: "shared-construction.ts",
      fileHash: "3cp3uvwlsfvqo",
      kind: "value",
      splices: { $Shape: Shape },
      captures: [],
      spliceParams: { $Shape: [] },
    },
    (v) =>
      v.newExpression([23, 13, 23, 26], v.splice([23, 17, 23, 23], "$Shape"), [
        v.numericLiteral([23, 24, 23, 25], 5),
      ]),
  );
}
const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);
export default cs.create(
  [31, 16, 33, 3],
  {
    version: "0.0.0",
    filePath: "shared-construction.ts",
    fileHash: "3cp3uvwlsfvqo",
    kind: "value",
    splices: { $a: a, $b: b, $c: c, $d: d },
    captures: [],
    spliceParams: { $a: [], $b: [], $c: [], $d: [] },
  },
  (v) =>
    v.block(
      [31, 19, 33, 2],
      [
        v.returnStatement(
          [32, 3, 32, 59],
          v.objectLiteralExpression(
            [32, 10, 32, 58],
            [
              v.propertyAssignment(
                [32, 12, 32, 21],
                "first",
                v.splice([32, 19, 32, 21], "$a"),
              ),
              v.propertyAssignment(
                [32, 23, 32, 33],
                "second",
                v.splice([32, 31, 32, 33], "$b"),
              ),
              v.propertyAssignment(
                [32, 35, 32, 44],
                "third",
                v.splice([32, 42, 32, 44], "$c"),
              ),
              v.propertyAssignment(
                [32, 46, 32, 56],
                "fourth",
                v.splice([32, 54, 32, 56], "$d"),
              ),
            ],
          ),
        ),
      ],
    ),
);
