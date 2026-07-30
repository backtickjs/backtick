import { cs } from "@backtickjs/core";
// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
export default cs.create(
  [6, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "for-nested-shadowing.ts",
    fileHash: "2qq4wmxi2b090",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [6, 19, 15, 2],
      [
        v.variableDeclaration(
          [7, 3, 7, 16],
          v.identifier([7, 7, 7, 10], "out", "out$2qq4wmxi2b090$0"),
          v.stringLiteral([7, 13, 7, 15], ""),
          "let",
        ),
        v.forStatement(
          [8, 3, 13, 4],
          v.variableDeclaration(
            [8, 8, 8, 17],
            v.identifier([8, 12, 8, 13], "i", "i$2qq4wmxi2b090$1"),
            v.numericLiteral([8, 16, 8, 17], 0),
            "let",
          ),
          v.binaryExpression(
            [8, 19, 8, 24],
            v.identifier([8, 19, 8, 20], "i", "i$2qq4wmxi2b090$1"),
            "<",
            v.numericLiteral([8, 23, 8, 24], 2),
          ),
          v.binaryExpression(
            [8, 26, 8, 35],
            v.identifier([8, 26, 8, 27], "i", "i$2qq4wmxi2b090$1"),
            "=",
            v.binaryExpression(
              [8, 30, 8, 35],
              v.identifier([8, 30, 8, 31], "i", "i$2qq4wmxi2b090$1"),
              "+",
              v.numericLiteral([8, 34, 8, 35], 1),
            ),
          ),
          v.block(
            [8, 37, 13, 4],
            [
              v.variableDeclaration(
                [9, 5, 9, 19],
                v.identifier([9, 11, 9, 12], "i", "i$2qq4wmxi2b090$2"),
                v.stringLiteral([9, 15, 9, 18], "-"),
                "const",
              ),
              v.forStatement(
                [10, 5, 12, 6],
                v.variableDeclaration(
                  [10, 10, 10, 19],
                  v.identifier([10, 14, 10, 15], "j", "j$2qq4wmxi2b090$3"),
                  v.numericLiteral([10, 18, 10, 19], 0),
                  "let",
                ),
                v.binaryExpression(
                  [10, 21, 10, 26],
                  v.identifier([10, 21, 10, 22], "j", "j$2qq4wmxi2b090$3"),
                  "<",
                  v.numericLiteral([10, 25, 10, 26], 2),
                ),
                v.binaryExpression(
                  [10, 28, 10, 37],
                  v.identifier([10, 28, 10, 29], "j", "j$2qq4wmxi2b090$3"),
                  "=",
                  v.binaryExpression(
                    [10, 32, 10, 37],
                    v.identifier([10, 32, 10, 33], "j", "j$2qq4wmxi2b090$3"),
                    "+",
                    v.numericLiteral([10, 36, 10, 37], 1),
                  ),
                ),
                v.block(
                  [10, 39, 12, 6],
                  [
                    v.binaryExpression(
                      [11, 7, 11, 24],
                      v.identifier(
                        [11, 7, 11, 10],
                        "out",
                        "out$2qq4wmxi2b090$0",
                      ),
                      "=",
                      v.binaryExpression(
                        [11, 13, 11, 24],
                        v.binaryExpression(
                          [11, 13, 11, 20],
                          v.identifier(
                            [11, 13, 11, 16],
                            "out",
                            "out$2qq4wmxi2b090$0",
                          ),
                          "+",
                          v.identifier(
                            [11, 19, 11, 20],
                            "i",
                            "i$2qq4wmxi2b090$2",
                          ),
                        ),
                        "+",
                        v.identifier(
                          [11, 23, 11, 24],
                          "j",
                          "j$2qq4wmxi2b090$3",
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [14, 3, 14, 14],
          v.identifier([14, 10, 14, 13], "out", "out$2qq4wmxi2b090$0"),
        ),
      ],
    ),
);
