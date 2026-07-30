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
        version: "0.0.0",
        filePath: "reflected-client.ts",
        fileHash: "1n3zukooyw7a6",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
      },
      (v) =>
        v.arrowFunction(
          [16, 15, 16, 42],
          [],
          v.binaryExpression(
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
    version: "0.0.0",
    filePath: "reflected-client.ts",
    fileHash: "1n3zukooyw7a6",
    kind: "action",
    splices: {
      $0splice0: new Point(
        cs.create(
          [25, 25, 25, 30],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([25, 28, 25, 29], 1),
        ),
        cs.create(
          [25, 32, 25, 37],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([25, 35, 25, 36], 2),
        ),
      ),
      $0splice1: new Point(
        cs.create(
          [26, 25, 26, 30],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([26, 28, 26, 29], 3),
        ),
        cs.create(
          [26, 32, 26, 37],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([26, 35, 26, 36], 4),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.block(
      [24, 19, 28, 2],
      [
        v.variableDeclaration(
          [25, 3, 25, 40],
          v.identifier([25, 9, 25, 10], "a", "a$1n3zukooyw7a6$0"),
          v.splice([25, 13, 25, 39], "$0splice0"),
          "const",
        ),
        v.variableDeclaration(
          [26, 3, 26, 40],
          v.identifier([26, 9, 26, 10], "b", "b$1n3zukooyw7a6$1"),
          v.splice([26, 13, 26, 39], "$0splice1"),
          "const",
        ),
        v.variableDeclaration(
          [27, 3, 27, 37],
          v.identifier([27, 9, 27, 12], "sum", "sum$1n3zukooyw7a6$2"),
          v.binaryExpression(
            [27, 15, 27, 36],
            v.callExpression(
              [27, 15, 27, 24],
              v.propertyAccessExpression(
                [27, 15, 27, 22],
                v.identifier([27, 15, 27, 16], "a", "a$1n3zukooyw7a6$0"),
                false,
                "valid",
              ),
              false,
              [],
            ),
            "+",
            v.callExpression(
              [27, 27, 27, 36],
              v.propertyAccessExpression(
                [27, 27, 27, 34],
                v.identifier([27, 27, 27, 28], "b", "b$1n3zukooyw7a6$1"),
                false,
                "valid",
              ),
              false,
              [],
            ),
          ),
          "const",
        ),
      ],
    ),
);
