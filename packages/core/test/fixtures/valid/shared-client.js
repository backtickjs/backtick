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
        filePath: "shared-client.ts",
        fileHash: "35oezixq0fkxm",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        declarations: [],
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
      filePath: "shared-client.ts",
      fileHash: "35oezixq0fkxm",
      splices: {},
      captures: [],
      declarations: [],
    },
    (v) => v.number([22, 29, 22, 30], 1),
  ),
  cs.create(
    [22, 33, 22, 38],
    {
      filePath: "shared-client.ts",
      fileHash: "35oezixq0fkxm",
      splices: {},
      captures: [],
      declarations: [],
    },
    (v) => v.number([22, 36, 22, 37], 2),
  ),
);
const left = cs.create(
  [24, 14, 27, 3],
  {
    filePath: "shared-client.ts",
    fileHash: "35oezixq0fkxm",
    splices: { $0splice0: shared },
    captures: [],
    declarations: ["p$35oezixq0fkxm$0"],
  },
  (v) =>
    v.block(
      [24, 17, 27, 2],
      [
        v.variableDeclaration(
          [25, 3, 25, 23],
          "const",
          v.identifier([25, 9, 25, 10], "p", "p$35oezixq0fkxm$0"),
          v.splice([25, 13, 25, 22], "$0splice0"),
        ),
        v.return(
          [26, 3, 26, 18],
          v.call(
            [26, 10, 26, 17],
            v.propertyAccess(
              [26, 10, 26, 15],
              v.identifier([26, 10, 26, 11], "p", "p$35oezixq0fkxm$0"),
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
    filePath: "shared-client.ts",
    fileHash: "35oezixq0fkxm",
    splices: { $0splice0: shared },
    captures: [],
    declarations: ["p$35oezixq0fkxm$1"],
  },
  (v) =>
    v.block(
      [29, 18, 32, 2],
      [
        v.variableDeclaration(
          [30, 3, 30, 23],
          "const",
          v.identifier([30, 9, 30, 10], "p", "p$35oezixq0fkxm$1"),
          v.splice([30, 13, 30, 22], "$0splice0"),
        ),
        v.return(
          [31, 3, 31, 14],
          v.propertyAccess(
            [31, 10, 31, 13],
            v.identifier([31, 10, 31, 11], "p", "p$35oezixq0fkxm$1"),
            "x",
          ),
        ),
      ],
    ),
);
export default cs.create(
  [34, 16, 34, 38],
  {
    filePath: "shared-client.ts",
    fileHash: "35oezixq0fkxm",
    splices: { $0splice0: left, $0splice1: right },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.binop(
      [34, 19, 34, 37],
      v.splice([34, 19, 34, 26], "$0splice0"),
      "+",
      v.splice([34, 29, 34, 37], "$0splice1"),
    ),
);
