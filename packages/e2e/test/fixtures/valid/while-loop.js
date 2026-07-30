import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "while-loop.ts",
    fileHash: "2c5ohtv8baju6",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [3, 19, 14, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 13],
          v.identifier([4, 7, 4, 8], "i", "i$2c5ohtv8baju6$0"),
          v.numericLiteral([4, 11, 4, 12], 0),
          "let",
        ),
        v.variableDeclaration(
          [5, 3, 5, 17],
          v.identifier([5, 7, 5, 12], "total", "total$2c5ohtv8baju6$1"),
          v.numericLiteral([5, 15, 5, 16], 0),
          "let",
        ),
        v.whileStatement(
          [6, 3, 12, 4],
          v.binaryExpression(
            [6, 10, 6, 15],
            v.identifier([6, 10, 6, 11], "i", "i$2c5ohtv8baju6$0"),
            "<",
            v.numericLiteral([6, 14, 6, 15], 5),
          ),
          v.block(
            [6, 17, 12, 4],
            [
              v.binaryExpression(
                [7, 5, 7, 22],
                v.identifier([7, 5, 7, 10], "total", "total$2c5ohtv8baju6$1"),
                "=",
                v.binaryExpression(
                  [7, 13, 7, 22],
                  v.identifier(
                    [7, 13, 7, 18],
                    "total",
                    "total$2c5ohtv8baju6$1",
                  ),
                  "+",
                  v.identifier([7, 21, 7, 22], "i", "i$2c5ohtv8baju6$0"),
                ),
              ),
              v.ifStatement(
                [8, 5, 10, 6],
                v.binaryExpression(
                  [8, 9, 8, 16],
                  v.identifier([8, 9, 8, 10], "i", "i$2c5ohtv8baju6$0"),
                  "===",
                  v.numericLiteral([8, 15, 8, 16], 3),
                ),
                v.block(
                  [8, 18, 10, 6],
                  [
                    v.returnStatement(
                      [9, 7, 9, 20],
                      v.identifier(
                        [9, 14, 9, 19],
                        "total",
                        "total$2c5ohtv8baju6$1",
                      ),
                    ),
                  ],
                ),
                null,
              ),
              v.binaryExpression(
                [11, 5, 11, 14],
                v.identifier([11, 5, 11, 6], "i", "i$2c5ohtv8baju6$0"),
                "=",
                v.binaryExpression(
                  [11, 9, 11, 14],
                  v.identifier([11, 9, 11, 10], "i", "i$2c5ohtv8baju6$0"),
                  "+",
                  v.numericLiteral([11, 13, 11, 14], 1),
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [13, 3, 13, 16],
          v.identifier([13, 10, 13, 15], "total", "total$2c5ohtv8baju6$1"),
        ),
      ],
    ),
);
