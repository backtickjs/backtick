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
        filePath: "shared-client.ts",
        fileHash: "2dmd79xnh14ui",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        spliceScopes: { $0splice0: [], $0splice1: [] },
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
// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point(
  cs.create(
    [22, 26, 22, 31],
    {
      version: "0.0.0",
      filePath: "shared-client.ts",
      fileHash: "2dmd79xnh14ui",
      kind: "value",
      splices: {},
      captures: [],
      spliceScopes: {},
    },
    (v) => v.number([22, 29, 22, 30], 1),
  ),
  cs.create(
    [22, 33, 22, 38],
    {
      version: "0.0.0",
      filePath: "shared-client.ts",
      fileHash: "2dmd79xnh14ui",
      kind: "value",
      splices: {},
      captures: [],
      spliceScopes: {},
    },
    (v) => v.number([22, 36, 22, 37], 2),
  ),
);
const left = cs.create(
  [24, 14, 27, 3],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $shared: shared },
    captures: [],
    spliceScopes: { $shared: [] },
  },
  (v) =>
    v.block(
      [24, 17, 27, 2],
      [
        v.variableDeclaration(
          [25, 3, 25, 21],
          "const",
          v.identifier([25, 9, 25, 10], "p", "p$2dmd79xnh14ui$0"),
          v.splice([25, 13, 25, 20], "$shared"),
        ),
        v.return(
          [26, 3, 26, 18],
          v.call(
            [26, 10, 26, 17],
            v.propertyAccess(
              [26, 10, 26, 15],
              v.identifier([26, 10, 26, 11], "p", "p$2dmd79xnh14ui$0"),
              "sum",
            ),
            [],
          ),
        ),
      ],
    ),
);
const right = cs.create(
  [29, 15, 32, 3],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $shared: shared },
    captures: [],
    spliceScopes: { $shared: [] },
  },
  (v) =>
    v.block(
      [29, 18, 32, 2],
      [
        v.variableDeclaration(
          [30, 3, 30, 21],
          "const",
          v.identifier([30, 9, 30, 10], "p", "p$2dmd79xnh14ui$1"),
          v.splice([30, 13, 30, 20], "$shared"),
        ),
        v.return(
          [31, 3, 31, 14],
          v.propertyAccess(
            [31, 10, 31, 13],
            v.identifier([31, 10, 31, 11], "p", "p$2dmd79xnh14ui$1"),
            "x",
          ),
        ),
      ],
    ),
);
export default cs.create(
  [34, 16, 34, 34],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $left: left, $right: right },
    captures: [],
    spliceScopes: { $left: [], $right: [] },
  },
  (v) =>
    v.binop(
      [34, 19, 34, 33],
      v.splice([34, 19, 34, 24], "$left"),
      "+",
      v.splice([34, 27, 34, 33], "$right"),
    ),
);
