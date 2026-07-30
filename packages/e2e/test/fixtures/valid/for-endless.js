import { cs } from "@backtickjs/core";
// `for (;;)` has no condition, so `break` is the only way out.
export default cs.create(
  [4, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "for-endless.ts",
    fileHash: "3o3sdrk94c5tr",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [4, 19, 13, 2],
      [
        v.variableDeclaration(
          [5, 3, 5, 13],
          v.identifier([5, 7, 5, 8], "i", "i$3o3sdrk94c5tr$0"),
          v.numericLiteral([5, 11, 5, 12], 0),
          "let",
        ),
        v.forStatement(
          [6, 3, 11, 4],
          null,
          null,
          null,
          v.block(
            [6, 12, 11, 4],
            [
              v.ifStatement(
                [7, 5, 9, 6],
                v.binaryExpression(
                  [7, 9, 7, 16],
                  v.identifier([7, 9, 7, 10], "i", "i$3o3sdrk94c5tr$0"),
                  "===",
                  v.numericLiteral([7, 15, 7, 16], 4),
                ),
                v.block([7, 18, 9, 6], [v.breakStatement([8, 7, 8, 13])]),
                null,
              ),
              v.binaryExpression(
                [10, 5, 10, 14],
                v.identifier([10, 5, 10, 6], "i", "i$3o3sdrk94c5tr$0"),
                "=",
                v.binaryExpression(
                  [10, 9, 10, 14],
                  v.identifier([10, 9, 10, 10], "i", "i$3o3sdrk94c5tr$0"),
                  "+",
                  v.numericLiteral([10, 13, 10, 14], 1),
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [12, 3, 12, 12],
          v.identifier([12, 10, 12, 11], "i", "i$3o3sdrk94c5tr$0"),
        ),
      ],
    ),
);
