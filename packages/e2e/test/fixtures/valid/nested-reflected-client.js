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
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
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
class Segment {
  "@backtickjs" = "ClientObject";
  from;
  to;
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  get vertical() {
    return cs.create(
      [32, 12, 32, 53],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: { $0splice0: this.from.x, $0splice1: this.to.x },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
      },
      (v) =>
        v.arrow(
          [32, 15, 32, 52],
          [],
          v.binop(
            [32, 21, 32, 52],
            v.splice([32, 21, 32, 35], "$0splice0"),
            "===",
            v.splice([32, 40, 32, 52], "$0splice1"),
          ),
        ),
    );
  }
}
const segment = new Segment(
  new Point(
    cs.create(
      [36, 39, 36, 44],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      (v) => v.number([36, 42, 36, 43], 1),
    ),
    cs.create(
      [36, 46, 36, 51],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      (v) => v.number([36, 49, 36, 50], 2),
    ),
  ),
  new Point(
    cs.create(
      [36, 64, 36, 69],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      (v) => v.number([36, 67, 36, 68], 1),
    ),
    cs.create(
      [36, 71, 36, 76],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      (v) => v.number([36, 74, 36, 75], 8),
    ),
  ),
);
export default cs.create(
  [38, 16, 45, 3],
  {
    version: "0.0.0",
    filePath: "nested-reflected-client.ts",
    fileHash: "marvm6ddqnqk",
    kind: "value",
    splices: { $segment: segment },
    captures: [],
    spliceParams: { $segment: [] },
  },
  (v) =>
    v.block(
      [38, 19, 45, 2],
      [
        v.variableDeclaration(
          [39, 3, 39, 22],
          "const",
          v.identifier([39, 9, 39, 10], "s", "s$marvm6ddqnqk$0"),
          v.splice([39, 13, 39, 21], "$segment"),
        ),
        v.variableDeclaration(
          [40, 3, 40, 34],
          "const",
          v.identifier([40, 9, 40, 13], "rise", "rise$marvm6ddqnqk$1"),
          v.binop(
            [40, 16, 40, 33],
            v.propertyAccess(
              [40, 16, 40, 22],
              v.propertyAccess(
                [40, 16, 40, 20],
                v.identifier([40, 16, 40, 17], "s", "s$marvm6ddqnqk$0"),
                "to",
              ),
              "y",
            ),
            "-",
            v.propertyAccess(
              [40, 25, 40, 33],
              v.propertyAccess(
                [40, 25, 40, 31],
                v.identifier([40, 25, 40, 26], "s", "s$marvm6ddqnqk$0"),
                "from",
              ),
              "y",
            ),
          ),
        ),
        v.if(
          [41, 3, 43, 4],
          v.call(
            [41, 7, 41, 19],
            v.propertyAccess(
              [41, 7, 41, 17],
              v.identifier([41, 7, 41, 8], "s", "s$marvm6ddqnqk$0"),
              "vertical",
            ),
            [],
          ),
          v.block(
            [41, 21, 43, 4],
            [
              v.return(
                [42, 5, 42, 17],
                v.identifier([42, 12, 42, 16], "rise", "rise$marvm6ddqnqk$1"),
              ),
            ],
          ),
          null,
        ),
        v.return(
          [44, 3, 44, 36],
          v.binop(
            [44, 10, 44, 35],
            v.call(
              [44, 10, 44, 20],
              v.propertyAccess(
                [44, 10, 44, 18],
                v.propertyAccess(
                  [44, 10, 44, 14],
                  v.identifier([44, 10, 44, 11], "s", "s$marvm6ddqnqk$0"),
                  "to",
                ),
                "sum",
              ),
              [],
            ),
            "-",
            v.call(
              [44, 23, 44, 35],
              v.propertyAccess(
                [44, 23, 44, 33],
                v.propertyAccess(
                  [44, 23, 44, 29],
                  v.identifier([44, 23, 44, 24], "s", "s$marvm6ddqnqk$0"),
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
