import { cs } from "@backtickjs/core";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "captured-counter.ts",
    fileHash: "31t2pc3vo9x5y",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["count$31t2pc3vo9x5y$0", "bump$31t2pc3vo9x5y$1"],
    captured: [],
  },
  (v) =>
    v.block(
      [5, 19, 12, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 17],
          "let",
          v.identifier([6, 7, 6, 12], "count", "count$31t2pc3vo9x5y$0"),
          v.number([6, 15, 6, 16], 0),
        ),
        v.variableDeclaration(
          [7, 3, 10, 5],
          "const",
          v.identifier([7, 9, 7, 13], "bump", "bump$31t2pc3vo9x5y$1"),
          v.arrow(
            [7, 16, 10, 4],
            [],
            v.block(
              [7, 22, 10, 4],
              [
                v.assignment(
                  [8, 5, 8, 22],
                  v.identifier([8, 5, 8, 10], "count", "count$31t2pc3vo9x5y$0"),
                  v.binop(
                    [8, 13, 8, 22],
                    v.identifier(
                      [8, 13, 8, 18],
                      "count",
                      "count$31t2pc3vo9x5y$0",
                    ),
                    "+",
                    v.number([8, 21, 8, 22], 1),
                  ),
                ),
                v.return(
                  [9, 5, 9, 18],
                  v.identifier(
                    [9, 12, 9, 17],
                    "count",
                    "count$31t2pc3vo9x5y$0",
                  ),
                ),
              ],
            ),
          ),
        ),
        v.return(
          [11, 3, 11, 26],
          v.binop(
            [11, 10, 11, 25],
            v.call(
              [11, 10, 11, 16],
              v.identifier([11, 10, 11, 14], "bump", "bump$31t2pc3vo9x5y$1"),
              [],
            ),
            "+",
            v.call(
              [11, 19, 11, 25],
              v.identifier([11, 19, 11, 23], "bump", "bump$31t2pc3vo9x5y$1"),
              [],
            ),
          ),
        ),
      ],
    ),
);
