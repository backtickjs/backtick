import { cs } from "@backtickjs/core";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
export default cs.create(
  [6, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "loop-jumps.ts",
    fileHash: "owiuoxfingdr",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [6, 19, 21, 2],
      [
        v.variableDeclaration(
          [7, 3, 7, 16],
          v.identifier([7, 7, 7, 10], "out", "out$owiuoxfingdr$0"),
          v.stringLiteral([7, 13, 7, 15], ""),
          "let",
        ),
        v.forStatement(
          [8, 3, 19, 4],
          v.variableDeclaration(
            [8, 8, 8, 17],
            v.identifier([8, 12, 8, 13], "i", "i$owiuoxfingdr$1"),
            v.numericLiteral([8, 16, 8, 17], 0),
            "let",
          ),
          v.binaryExpression(
            [8, 19, 8, 24],
            v.identifier([8, 19, 8, 20], "i", "i$owiuoxfingdr$1"),
            "<",
            v.numericLiteral([8, 23, 8, 24], 5),
          ),
          v.binaryExpression(
            [8, 26, 8, 35],
            v.identifier([8, 26, 8, 27], "i", "i$owiuoxfingdr$1"),
            "=",
            v.binaryExpression(
              [8, 30, 8, 35],
              v.identifier([8, 30, 8, 31], "i", "i$owiuoxfingdr$1"),
              "+",
              v.numericLiteral([8, 34, 8, 35], 1),
            ),
          ),
          v.block(
            [8, 37, 19, 4],
            [
              v.ifStatement(
                [9, 5, 11, 6],
                v.binaryExpression(
                  [9, 9, 9, 16],
                  v.identifier([9, 9, 9, 10], "i", "i$owiuoxfingdr$1"),
                  "===",
                  v.numericLiteral([9, 15, 9, 16], 1),
                ),
                v.block([9, 18, 11, 6], [v.continueStatement([10, 7, 10, 16])]),
                null,
              ),
              v.whileStatement(
                [12, 5, 15, 6],
                v.trueLiteral([12, 12, 12, 16]),
                v.block(
                  [12, 18, 15, 6],
                  [
                    v.binaryExpression(
                      [13, 7, 13, 20],
                      v.identifier(
                        [13, 7, 13, 10],
                        "out",
                        "out$owiuoxfingdr$0",
                      ),
                      "=",
                      v.binaryExpression(
                        [13, 13, 13, 20],
                        v.identifier(
                          [13, 13, 13, 16],
                          "out",
                          "out$owiuoxfingdr$0",
                        ),
                        "+",
                        v.identifier([13, 19, 13, 20], "i", "i$owiuoxfingdr$1"),
                      ),
                    ),
                    v.breakStatement([14, 7, 14, 13]),
                  ],
                ),
              ),
              v.ifStatement(
                [16, 5, 18, 6],
                v.binaryExpression(
                  [16, 9, 16, 16],
                  v.identifier([16, 9, 16, 10], "i", "i$owiuoxfingdr$1"),
                  "===",
                  v.numericLiteral([16, 15, 16, 16], 3),
                ),
                v.block([16, 18, 18, 6], [v.breakStatement([17, 7, 17, 13])]),
                null,
              ),
            ],
          ),
        ),
        v.returnStatement(
          [20, 3, 20, 14],
          v.identifier([20, 10, 20, 13], "out", "out$owiuoxfingdr$0"),
        ),
      ],
    ),
);
