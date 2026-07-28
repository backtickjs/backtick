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
      [16, 12, 16, 43],
      {
        version: "0.0.0",
        filePath: "nested-client.ts",
        fileHash: "3b7boqu5f3cse",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        declarations: [],
        captured: [],
      },
      (v) =>
        v.arrow(
          [16, 15, 16, 42],
          [],
          v.binop(
            [16, 21, 16, 42],
            v.splice([16, 21, 16, 30], "$0splice0"),
            "+",
            v.splice([16, 33, 16, 42], "$0splice1"),
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
  [34, 16, 37, 3],
  {
    version: "0.0.0",
    filePath: "nested-client.ts",
    fileHash: "3b7boqu5f3cse",
    kind: "value",
    splices: { $Segment: Segment, $Point: Point },
    captures: [],
    declarations: ["s$3b7boqu5f3cse$0"],
    captured: [],
  },
  (v) =>
    v.block(
      [34, 19, 37, 2],
      [
        v.variableDeclaration(
          [35, 3, 35, 62],
          "const",
          v.identifier([35, 9, 35, 10], "s", "s$3b7boqu5f3cse$0"),
          v.new([35, 13, 35, 61], v.splice([35, 17, 35, 25], "$Segment"), [
            v.new([35, 26, 35, 42], v.splice([35, 30, 35, 36], "$Point"), [
              v.number([35, 37, 35, 38], 1),
              v.number([35, 40, 35, 41], 2),
            ]),
            v.new([35, 44, 35, 60], v.splice([35, 48, 35, 54], "$Point"), [
              v.number([35, 55, 35, 56], 1),
              v.number([35, 58, 35, 59], 2),
            ]),
          ]),
        ),
        v.return(
          [36, 3, 36, 36],
          v.binop(
            [36, 10, 36, 35],
            v.call(
              [36, 10, 36, 20],
              v.propertyAccess(
                [36, 10, 36, 18],
                v.propertyAccess(
                  [36, 10, 36, 14],
                  v.identifier([36, 10, 36, 11], "s", "s$3b7boqu5f3cse$0"),
                  "to",
                ),
                "sum",
              ),
              [],
            ),
            "-",
            v.call(
              [36, 23, 36, 35],
              v.propertyAccess(
                [36, 23, 36, 33],
                v.propertyAccess(
                  [36, 23, 36, 29],
                  v.identifier([36, 23, 36, 24], "s", "s$3b7boqu5f3cse$0"),
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
