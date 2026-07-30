import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "try-catch.ts",
    fileHash: "2osmwga78xnj6",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [3, 19, 13, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 26],
          v.identifier([4, 9, 4, 16], "message", "message$2osmwga78xnj6$0"),
          v.stringLiteral([4, 19, 4, 25], "boom"),
          "const",
        ),
        v.tryStatement(
          [5, 3, 12, 4],
          v.block(
            [5, 7, 7, 4],
            [
              v.throwStatement(
                [6, 5, 6, 19],
                v.identifier(
                  [6, 11, 6, 18],
                  "message",
                  "message$2osmwga78xnj6$0",
                ),
              ),
            ],
          ),
          v.catchClause(
            [7, 5, 12, 4],
            v.identifier([7, 12, 7, 17], "error", "error$2osmwga78xnj6$1"),
            v.block(
              [7, 19, 12, 4],
              [
                v.ifStatement(
                  [8, 5, 10, 6],
                  v.binaryExpression(
                    [8, 9, 8, 26],
                    v.identifier(
                      [8, 9, 8, 14],
                      "error",
                      "error$2osmwga78xnj6$1",
                    ),
                    "===",
                    v.identifier(
                      [8, 19, 8, 26],
                      "message",
                      "message$2osmwga78xnj6$0",
                    ),
                  ),
                  v.block(
                    [8, 28, 10, 6],
                    [
                      v.returnStatement(
                        [9, 7, 9, 28],
                        v.stringLiteral([9, 14, 9, 27], "caught boom"),
                      ),
                    ],
                  ),
                  null,
                ),
                v.returnStatement(
                  [11, 5, 11, 36],
                  v.stringLiteral([11, 12, 11, 35], "caught something else"),
                ),
              ],
            ),
          ),
        ),
      ],
    ),
);
