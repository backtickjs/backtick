import { cs } from "@backtickjs/core";
const stored = cs.create(
  [8, 16, 11, 3],
  {
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["x$18uwl3j62c30b$0", "y$18uwl3j62c30b$1"],
  },
  (v) =>
    v.arrow(
      [8, 19, 11, 2],
      [v.identifier([8, 20, 8, 21], "x", "x$18uwl3j62c30b$0")],
      v.block(
        [8, 33, 11, 2],
        [
          v.variableDeclaration(
            [9, 3, 9, 15],
            "const",
            v.identifier([9, 9, 9, 10], "y", "y$18uwl3j62c30b$1"),
            v.identifier([9, 13, 9, 14], "x", "x$18uwl3j62c30b$0"),
          ),
          v.return([10, 3, 10, 12], v.number([10, 10, 10, 11], 1)),
        ],
      ),
    ),
);
const written = cs.create(
  [13, 17, 17, 3],
  {
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["x$18uwl3j62c30b$2", "y$18uwl3j62c30b$3"],
  },
  (v) =>
    v.arrow(
      [13, 20, 17, 2],
      [v.identifier([13, 21, 13, 22], "x", "x$18uwl3j62c30b$2")],
      v.block(
        [13, 34, 17, 2],
        [
          v.variableDeclaration(
            [14, 3, 14, 14],
            "let",
            v.identifier([14, 7, 14, 8], "y", "y$18uwl3j62c30b$3"),
            v.string([14, 11, 14, 13], ""),
          ),
          v.assignment(
            [15, 3, 15, 8],
            v.identifier([15, 3, 15, 4], "y", "y$18uwl3j62c30b$3"),
            v.identifier([15, 7, 15, 8], "x", "x$18uwl3j62c30b$2"),
          ),
          v.return([16, 3, 16, 12], v.number([16, 10, 16, 11], 1)),
        ],
      ),
    ),
);
