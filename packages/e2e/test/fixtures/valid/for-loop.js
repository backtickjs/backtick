import { cs } from "@backtickjs/core";
// `i++` is not an operator in a client script, so the update is an assignment.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "for-loop.ts",
    fileHash: "zkms5nlgp0g3",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [4, 19, 10, 2],
      [
        v.variableDeclaration(
          [5, 3, 5, 17],
          v.identifier([5, 7, 5, 12], "total", "total$zkms5nlgp0g3$0"),
          v.numericLiteral([5, 15, 5, 16], 0),
          "let",
        ),
        v.forStatement(
          [6, 3, 8, 4],
          v.variableDeclaration(
            [6, 8, 6, 17],
            v.identifier([6, 12, 6, 13], "i", "i$zkms5nlgp0g3$1"),
            v.numericLiteral([6, 16, 6, 17], 0),
            "let",
          ),
          v.binaryExpression(
            [6, 19, 6, 24],
            v.identifier([6, 19, 6, 20], "i", "i$zkms5nlgp0g3$1"),
            "<",
            v.numericLiteral([6, 23, 6, 24], 5),
          ),
          v.binaryExpression(
            [6, 26, 6, 35],
            v.identifier([6, 26, 6, 27], "i", "i$zkms5nlgp0g3$1"),
            "=",
            v.binaryExpression(
              [6, 30, 6, 35],
              v.identifier([6, 30, 6, 31], "i", "i$zkms5nlgp0g3$1"),
              "+",
              v.numericLiteral([6, 34, 6, 35], 1),
            ),
          ),
          v.block(
            [6, 37, 8, 4],
            [
              v.binaryExpression(
                [7, 5, 7, 22],
                v.identifier([7, 5, 7, 10], "total", "total$zkms5nlgp0g3$0"),
                "=",
                v.binaryExpression(
                  [7, 13, 7, 22],
                  v.identifier([7, 13, 7, 18], "total", "total$zkms5nlgp0g3$0"),
                  "+",
                  v.identifier([7, 21, 7, 22], "i", "i$zkms5nlgp0g3$1"),
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [9, 3, 9, 16],
          v.identifier([9, 10, 9, 15], "total", "total$zkms5nlgp0g3$0"),
        ),
      ],
    ),
);
