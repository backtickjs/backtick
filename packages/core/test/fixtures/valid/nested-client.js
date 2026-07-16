import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get sum() {
    return cs.create(
      [20, 12, 20, 43],
      {
        filePath: "nested-client.ts",
        fileHash: "3toq0fkcgj0qw",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        declarations: [],
      },
      (v) =>
        v.arrow(
          [20, 15, 20, 42],
          [],
          v.binop(
            [20, 21, 20, 42],
            v.splice([20, 21, 20, 30], "$0splice0"),
            "+",
            v.splice([20, 33, 20, 42], "$0splice1"),
          ),
        ),
    );
  }
}
// A client object nested inside another: `Segment` holds `Point` fragments,
// so the script reaches `s.to.sum` two levels deep.
class Segment {
  "@backtickjs" = "ClientObject";
  from;
  to;
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}
export default cs.create(
  [38, 16, 41, 3],
  {
    filePath: "nested-client.ts",
    fileHash: "3toq0fkcgj0qw",
    splices: { $Segment: Segment, $Point: Point },
    captures: [],
    declarations: ["s$3toq0fkcgj0qw$0"],
  },
  (v) =>
    v.block(
      [38, 19, 41, 2],
      [
        v.variableDeclaration(
          [39, 3, 39, 62],
          "const",
          v.identifier([39, 9, 39, 10], "s", "s$3toq0fkcgj0qw$0"),
          v.new([39, 13, 39, 61], v.splice([39, 17, 39, 25], "$Segment"), [
            v.new([39, 26, 39, 42], v.splice([39, 30, 39, 36], "$Point"), [
              v.number([39, 37, 39, 38], 1),
              v.number([39, 40, 39, 41], 2),
            ]),
            v.new([39, 44, 39, 60], v.splice([39, 48, 39, 54], "$Point"), [
              v.number([39, 55, 39, 56], 1),
              v.number([39, 58, 39, 59], 2),
            ]),
          ]),
        ),
        v.return(
          [40, 3, 40, 36],
          v.binop(
            [40, 10, 40, 35],
            v.call(
              [40, 10, 40, 20],
              v.propertyAccess(
                [40, 10, 40, 18],
                v.propertyAccess(
                  [40, 10, 40, 14],
                  v.identifier([40, 10, 40, 11], "s", "s$3toq0fkcgj0qw$0"),
                  "to",
                ),
                "sum",
              ),
              [],
            ),
            "-",
            v.call(
              [40, 23, 40, 35],
              v.propertyAccess(
                [40, 23, 40, 33],
                v.propertyAccess(
                  [40, 23, 40, 29],
                  v.identifier([40, 23, 40, 24], "s", "s$3toq0fkcgj0qw$0"),
                  "from",
                ),
                "sum",
              ),
              [],
            ),
          ),
        ),
      ],
    ),
);
