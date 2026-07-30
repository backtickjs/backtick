import { cs } from "@backtickjs/core";
// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-while-condition.ts",
    fileHash: "22k8zyijhbub1",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [5, 19, 11, 2],
      [
        v.parameterDeclaration(
          [5, 20, 5, 29],
          v.identifier([5, 20, 5, 21], "n", "n$22k8zyijhbub1$0"),
        ),
      ],
      v.block(
        [5, 34, 11, 2],
        [
          v.variableDeclaration(
            [6, 3, 6, 16],
            v.identifier([6, 7, 6, 11], "left", "left$22k8zyijhbub1$1"),
            v.identifier([6, 14, 6, 15], "n", "n$22k8zyijhbub1$0"),
            "let",
          ),
          v.whileStatement(
            [7, 3, 9, 4],
            v.identifier([7, 10, 7, 14], "left", "left$22k8zyijhbub1$1"),
            v.block(
              [7, 16, 9, 4],
              [
                v.binaryExpression(
                  [8, 5, 8, 20],
                  v.identifier([8, 5, 8, 9], "left", "left$22k8zyijhbub1$1"),
                  "=",
                  v.binaryExpression(
                    [8, 12, 8, 20],
                    v.identifier(
                      [8, 12, 8, 16],
                      "left",
                      "left$22k8zyijhbub1$1",
                    ),
                    "-",
                    v.numericLiteral([8, 19, 8, 20], 1),
                  ),
                ),
              ],
            ),
          ),
          v.returnStatement(
            [10, 3, 10, 15],
            v.identifier([10, 10, 10, 14], "left", "left$22k8zyijhbub1$1"),
          ),
        ],
      ),
    ),
);
