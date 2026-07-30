import { cs } from "@backtickjs/core";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "array-index.ts",
    fileHash: "2287xz8ecscg5",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 19, 12, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 28],
          v.identifier([6, 9, 6, 14], "coins", "coins$2287xz8ecscg5$0"),
          v.arrayLiteralExpression(
            [6, 17, 6, 27],
            [
              v.numericLiteral([6, 18, 6, 19], 5),
              v.numericLiteral([6, 21, 6, 23], 31),
              v.numericLiteral([6, 25, 6, 26], 7),
            ],
          ),
          "const",
        ),
        v.variableDeclaration(
          [7, 3, 7, 17],
          v.identifier([7, 7, 7, 12], "total", "total$2287xz8ecscg5$1"),
          v.numericLiteral([7, 15, 7, 16], 0),
          "let",
        ),
        v.forStatement(
          [8, 3, 10, 4],
          v.variableDeclaration(
            [8, 8, 8, 17],
            v.identifier([8, 12, 8, 13], "i", "i$2287xz8ecscg5$2"),
            v.numericLiteral([8, 16, 8, 17], 0),
            "let",
          ),
          v.binaryExpression(
            [8, 19, 8, 35],
            v.identifier([8, 19, 8, 20], "i", "i$2287xz8ecscg5$2"),
            "<",
            v.propertyAccessExpression(
              [8, 23, 8, 35],
              v.identifier([8, 23, 8, 28], "coins", "coins$2287xz8ecscg5$0"),
              false,
              "length",
            ),
          ),
          v.binaryExpression(
            [8, 37, 8, 46],
            v.identifier([8, 37, 8, 38], "i", "i$2287xz8ecscg5$2"),
            "=",
            v.binaryExpression(
              [8, 41, 8, 46],
              v.identifier([8, 41, 8, 42], "i", "i$2287xz8ecscg5$2"),
              "+",
              v.numericLiteral([8, 45, 8, 46], 1),
            ),
          ),
          v.block(
            [8, 48, 10, 4],
            [
              v.binaryExpression(
                [9, 5, 9, 29],
                v.identifier([9, 5, 9, 10], "total", "total$2287xz8ecscg5$1"),
                "=",
                v.binaryExpression(
                  [9, 13, 9, 29],
                  v.identifier(
                    [9, 13, 9, 18],
                    "total",
                    "total$2287xz8ecscg5$1",
                  ),
                  "+",
                  v.elementAccessExpression(
                    [9, 21, 9, 29],
                    v.identifier(
                      [9, 21, 9, 26],
                      "coins",
                      "coins$2287xz8ecscg5$0",
                    ),
                    v.identifier([9, 27, 9, 28], "i", "i$2287xz8ecscg5$2"),
                  ),
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [11, 3, 11, 16],
          v.identifier([11, 10, 11, 15], "total", "total$2287xz8ecscg5$1"),
        ),
      ],
    ),
);
