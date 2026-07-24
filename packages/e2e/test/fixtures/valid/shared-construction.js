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
      declarations: [],
    },
    (v) =>
      v.new([23, 13, 23, 26], v.splice([23, 17, 23, 23], "$Shape"), [
        v.number([23, 24, 23, 25], 5),
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
    declarations: [],
  },
  (v) =>
    v.block(
      [31, 19, 33, 2],
      [
        v.return(
          [32, 3, 32, 59],
          v.object([32, 10, 32, 58], {
            first: v.splice([32, 19, 32, 21], "$a"),
            second: v.splice([32, 31, 32, 33], "$b"),
            third: v.splice([32, 42, 32, 44], "$c"),
            fourth: v.splice([32, 54, 32, 56], "$d"),
          }),
        ),
      ],
    ),
);
