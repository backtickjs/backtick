import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get valid() {
    return cs.create(
      [16, 12, 16, 43],
      {
        filePath: "reflected-client.ts",
        fileHash: "1hgvbayhy1yv1",
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
  get invalid() {
    return;
  }
}
export default cs.create(
  [24, 16, 28, 3],
  {
    filePath: "reflected-client.ts",
    fileHash: "1hgvbayhy1yv1",
    splices: {
      $0splice0: new Point(
        cs.create(
          [25, 25, 25, 30],
          {
            filePath: "reflected-client.ts",
            fileHash: "1hgvbayhy1yv1",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([25, 28, 25, 29], 1),
        ),
        cs.create(
          [25, 32, 25, 37],
          {
            filePath: "reflected-client.ts",
            fileHash: "1hgvbayhy1yv1",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([25, 35, 25, 36], 2),
        ),
      ),
      $0splice1: new Point(
        cs.create(
          [26, 25, 26, 30],
          {
            filePath: "reflected-client.ts",
            fileHash: "1hgvbayhy1yv1",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([26, 28, 26, 29], 3),
        ),
        cs.create(
          [26, 32, 26, 37],
          {
            filePath: "reflected-client.ts",
            fileHash: "1hgvbayhy1yv1",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([26, 35, 26, 36], 4),
        ),
      ),
    },
    captures: [],
    declarations: ["a$1hgvbayhy1yv1$0", "b$1hgvbayhy1yv1$1"],
  },
  (v) =>
    v.block(
      [24, 19, 28, 2],
      [
        v.variableDeclaration(
          [25, 3, 25, 40],
          "const",
          v.identifier([25, 9, 25, 10], "a", "a$1hgvbayhy1yv1$0"),
          v.splice([25, 13, 25, 39], "$0splice0"),
        ),
        v.variableDeclaration(
          [26, 3, 26, 40],
          "const",
          v.identifier([26, 9, 26, 10], "b", "b$1hgvbayhy1yv1$1"),
          v.splice([26, 13, 26, 39], "$0splice1"),
        ),
        v.call(
          [27, 3, 27, 12],
          v.propertyAccess(
            [27, 3, 27, 10],
            v.identifier([27, 3, 27, 4], "a", "a$1hgvbayhy1yv1$0"),
            "valid",
          ),
          [],
        ),
      ],
    ),
);
