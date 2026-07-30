import { cs } from "@backtickjs/core";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [6, 17, 8, 2],
      [
        v.parameterDeclaration(
          [6, 18, 6, 41],
          v.identifier([6, 18, 6, 19], "p", "p$1k96f1nwptp9k$0"),
        ),
      ],
      v.block(
        [6, 46, 8, 2],
        [
          v.returnStatement(
            [7, 3, 7, 15],
            v.propertyAccessExpression(
              [7, 10, 7, 14],
              v.identifier([7, 10, 7, 11], "p", "p$1k96f1nwptp9k$0"),
              true,
              "x",
            ),
          ),
        ],
      ),
    ),
);
const deep = cs.create(
  [10, 14, 12, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [10, 17, 12, 2],
      [
        v.parameterDeclaration(
          [10, 18, 10, 59],
          v.identifier([10, 18, 10, 19], "o", "o$1k96f1nwptp9k$1"),
        ),
      ],
      v.block(
        [10, 64, 12, 2],
        [
          v.returnStatement(
            [11, 3, 11, 22],
            v.propertyAccessExpression(
              [11, 10, 11, 21],
              v.propertyAccessExpression(
                [11, 10, 11, 18],
                v.identifier([11, 10, 11, 11], "o", "o$1k96f1nwptp9k$1"),
                true,
                "inner",
              ),
              true,
              "z",
            ),
          ),
        ],
      ),
    ),
);
const shout = cs.create(
  [14, 15, 16, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [14, 18, 16, 2],
      [
        v.parameterDeclaration(
          [14, 19, 14, 35],
          v.identifier([14, 19, 14, 20], "s", "s$1k96f1nwptp9k$2"),
        ),
      ],
      v.block(
        [14, 40, 16, 2],
        [
          v.returnStatement(
            [15, 3, 15, 25],
            v.callExpression(
              [15, 10, 15, 24],
              v.propertyAccessExpression(
                [15, 10, 15, 19],
                v.identifier([15, 10, 15, 11], "s", "s$1k96f1nwptp9k$2"),
                true,
                "concat",
              ),
              false,
              [v.stringLiteral([15, 20, 15, 23], "!")],
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [18, 16, 26, 4],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: { $pick: pick, $deep: deep, $shout: shout },
    captures: [],
    spliceParams: { $pick: [], $deep: [], $shout: [] },
  },
  (v) =>
    v.objectLiteralExpression(
      [18, 20, 26, 2],
      [
        v.propertyAssignment(
          [19, 3, 19, 25],
          "found",
          v.callExpression(
            [19, 10, 19, 25],
            v.splice([19, 10, 19, 15], "$pick"),
            false,
            [
              v.objectLiteralExpression(
                [19, 16, 19, 24],
                [
                  v.propertyAssignment(
                    [19, 18, 19, 22],
                    "x",
                    v.numericLiteral([19, 21, 19, 22], 5),
                  ),
                ],
              ),
            ],
          ),
        ),
        v.propertyAssignment(
          [20, 3, 20, 23],
          "missing",
          v.callExpression(
            [20, 12, 20, 23],
            v.splice([20, 12, 20, 17], "$pick"),
            false,
            [v.nullLiteral([20, 18, 20, 22])],
          ),
        ),
        v.propertyAssignment(
          [21, 3, 21, 35],
          "deep",
          v.callExpression(
            [21, 9, 21, 35],
            v.splice([21, 9, 21, 14], "$deep"),
            false,
            [
              v.objectLiteralExpression(
                [21, 15, 21, 34],
                [
                  v.propertyAssignment(
                    [21, 17, 21, 32],
                    "inner",
                    v.objectLiteralExpression(
                      [21, 24, 21, 32],
                      [
                        v.propertyAssignment(
                          [21, 26, 21, 30],
                          "z",
                          v.numericLiteral([21, 29, 21, 30], 7),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        v.propertyAssignment(
          [22, 3, 22, 30],
          "cut",
          v.callExpression(
            [22, 8, 22, 30],
            v.splice([22, 8, 22, 13], "$deep"),
            false,
            [
              v.objectLiteralExpression(
                [22, 14, 22, 29],
                [
                  v.propertyAssignment(
                    [22, 16, 22, 27],
                    "inner",
                    v.nullLiteral([22, 23, 22, 27]),
                  ),
                ],
              ),
            ],
          ),
        ),
        v.propertyAssignment(
          [23, 3, 23, 19],
          "top",
          v.callExpression(
            [23, 8, 23, 19],
            v.splice([23, 8, 23, 13], "$deep"),
            false,
            [v.nullLiteral([23, 14, 23, 18])],
          ),
        ),
        v.propertyAssignment(
          [24, 3, 24, 21],
          "loud",
          v.callExpression(
            [24, 9, 24, 21],
            v.splice([24, 9, 24, 15], "$shout"),
            false,
            [v.stringLiteral([24, 16, 24, 20], "hi")],
          ),
        ),
        v.propertyAssignment(
          [25, 3, 25, 23],
          "silent",
          v.callExpression(
            [25, 11, 25, 23],
            v.splice([25, 11, 25, 17], "$shout"),
            false,
            [v.nullLiteral([25, 18, 25, 22])],
          ),
        ),
      ],
    ),
);
