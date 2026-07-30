import { cs } from "@backtickjs/core";
class Color {
  "@backtickjs" = "ClientObject";
  r;
  g;
  b;
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
export default cs.create(
  [18, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "field-client.ts",
    fileHash: "3o65fk6h8ba4e",
    kind: "value",
    splices: {
      $0splice0: new Color(
        cs.create(
          [19, 25, 19, 31],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([19, 28, 19, 30], 30),
        ),
        cs.create(
          [19, 33, 19, 40],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([19, 36, 19, 39], 144),
        ),
        cs.create(
          [19, 42, 19, 49],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([19, 45, 19, 48], 255),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) =>
    v.block(
      [18, 19, 25, 2],
      [
        v.variableDeclaration(
          [19, 3, 19, 52],
          v.identifier([19, 9, 19, 10], "c", "c$3o65fk6h8ba4e$0"),
          v.splice([19, 13, 19, 51], "$0splice0"),
          "const",
        ),
        v.variableDeclaration(
          [20, 3, 20, 38],
          v.identifier(
            [20, 9, 20, 19],
            "brightness",
            "brightness$3o65fk6h8ba4e$1",
          ),
          v.binaryExpression(
            [20, 22, 20, 37],
            v.binaryExpression(
              [20, 22, 20, 31],
              v.propertyAccessExpression(
                [20, 22, 20, 25],
                v.identifier([20, 22, 20, 23], "c", "c$3o65fk6h8ba4e$0"),
                false,
                "r",
              ),
              "+",
              v.propertyAccessExpression(
                [20, 28, 20, 31],
                v.identifier([20, 28, 20, 29], "c", "c$3o65fk6h8ba4e$0"),
                false,
                "g",
              ),
            ),
            "+",
            v.propertyAccessExpression(
              [20, 34, 20, 37],
              v.identifier([20, 34, 20, 35], "c", "c$3o65fk6h8ba4e$0"),
              false,
              "b",
            ),
          ),
          "const",
        ),
        v.ifStatement(
          [21, 3, 23, 4],
          v.binaryExpression(
            [21, 7, 21, 23],
            v.identifier(
              [21, 7, 21, 17],
              "brightness",
              "brightness$3o65fk6h8ba4e$1",
            ),
            ">",
            v.numericLiteral([21, 20, 21, 23], 382),
          ),
          v.block(
            [21, 25, 23, 4],
            [
              v.returnStatement(
                [22, 5, 22, 20],
                v.stringLiteral([22, 12, 22, 19], "light"),
              ),
            ],
          ),
          null,
        ),
        v.returnStatement(
          [24, 3, 24, 17],
          v.stringLiteral([24, 10, 24, 16], "dark"),
        ),
      ],
    ),
);
