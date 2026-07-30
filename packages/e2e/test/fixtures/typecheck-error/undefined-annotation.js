import { cs } from "@backtickjs/core";
const stored = cs.create(
  [8, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [8, 19, 11, 2],
      [
        v.parameterDeclaration(
          [8, 20, 8, 28],
          v.identifier([8, 20, 8, 21], "x", "x$18uwl3j62c30b$0"),
        ),
      ],
      v.block(
        [8, 33, 11, 2],
        [
          v.variableDeclaration(
            [9, 3, 9, 15],
            v.identifier([9, 9, 9, 10], "y", "y$18uwl3j62c30b$1"),
            v.identifier([9, 13, 9, 14], "x", "x$18uwl3j62c30b$0"),
            "const",
          ),
          v.returnStatement(
            [10, 3, 10, 12],
            v.numericLiteral([10, 10, 10, 11], 1),
          ),
        ],
      ),
    ),
);
const written = cs.create(
  [13, 17, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [13, 20, 17, 2],
      [
        v.parameterDeclaration(
          [13, 21, 13, 29],
          v.identifier([13, 21, 13, 22], "x", "x$18uwl3j62c30b$2"),
        ),
      ],
      v.block(
        [13, 34, 17, 2],
        [
          v.variableDeclaration(
            [14, 3, 14, 14],
            v.identifier([14, 7, 14, 8], "y", "y$18uwl3j62c30b$3"),
            v.stringLiteral([14, 11, 14, 13], ""),
            "let",
          ),
          v.binaryExpression(
            [15, 3, 15, 8],
            v.identifier([15, 3, 15, 4], "y", "y$18uwl3j62c30b$3"),
            "=",
            v.identifier([15, 7, 15, 8], "x", "x$18uwl3j62c30b$2"),
          ),
          v.returnStatement(
            [16, 3, 16, 12],
            v.numericLiteral([16, 10, 16, 11], 1),
          ),
        ],
      ),
    ),
);
