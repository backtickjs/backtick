import { cs } from "@backtickjs/core";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
export default cs.create(
  [5, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "array-members.ts",
    fileHash: "3kt9mhwly650i",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 19, 18, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 27],
          v.identifier([6, 9, 6, 14], "coins", "coins$3kt9mhwly650i$0"),
          v.arrayLiteralExpression(
            [6, 17, 6, 26],
            [
              v.numericLiteral([6, 18, 6, 19], 1),
              v.numericLiteral([6, 21, 6, 22], 2),
              v.numericLiteral([6, 24, 6, 25], 3),
            ],
          ),
          "const",
        ),
        v.variableDeclaration(
          [7, 3, 7, 18],
          v.identifier([7, 9, 7, 13], "four", "four$3kt9mhwly650i$1"),
          v.numericLiteral([7, 16, 7, 17], 4),
          "const",
        ),
        v.returnStatement(
          [8, 3, 17, 5],
          v.objectLiteralExpression(
            [8, 10, 17, 4],
            [
              v.propertyAssignment(
                [9, 5, 9, 24],
                "count",
                v.propertyAccessExpression(
                  [9, 12, 9, 24],
                  v.identifier(
                    [9, 12, 9, 17],
                    "coins",
                    "coins$3kt9mhwly650i$0",
                  ),
                  false,
                  "length",
                ),
              ),
              v.propertyAssignment(
                [10, 5, 10, 30],
                "all",
                v.callExpression(
                  [10, 10, 10, 30],
                  v.propertyAccessExpression(
                    [10, 10, 10, 22],
                    v.identifier(
                      [10, 10, 10, 15],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "concat",
                  ),
                  false,
                  [
                    v.arrayLiteralExpression(
                      [10, 23, 10, 29],
                      [
                        v.identifier(
                          [10, 24, 10, 28],
                          "four",
                          "four$3kt9mhwly650i$1",
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              v.propertyAssignment(
                [11, 5, 11, 28],
                "part",
                v.callExpression(
                  [11, 11, 11, 28],
                  v.propertyAccessExpression(
                    [11, 11, 11, 22],
                    v.identifier(
                      [11, 11, 11, 16],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "slice",
                  ),
                  false,
                  [
                    v.numericLiteral([11, 23, 11, 24], 0),
                    v.numericLiteral([11, 26, 11, 27], 2),
                  ],
                ),
              ),
              v.propertyAssignment(
                [12, 5, 12, 28],
                "where",
                v.callExpression(
                  [12, 12, 12, 28],
                  v.propertyAccessExpression(
                    [12, 12, 12, 25],
                    v.identifier(
                      [12, 12, 12, 17],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "indexOf",
                  ),
                  false,
                  [v.numericLiteral([12, 26, 12, 27], 2)],
                ),
              ),
              v.propertyAssignment(
                [13, 5, 13, 27],
                "has",
                v.callExpression(
                  [13, 10, 13, 27],
                  v.propertyAccessExpression(
                    [13, 10, 13, 24],
                    v.identifier(
                      [13, 10, 13, 15],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "includes",
                  ),
                  false,
                  [v.numericLiteral([13, 25, 13, 26], 3)],
                ),
              ),
              v.propertyAssignment(
                [14, 5, 14, 26],
                "text",
                v.callExpression(
                  [14, 11, 14, 26],
                  v.propertyAccessExpression(
                    [14, 11, 14, 21],
                    v.identifier(
                      [14, 11, 14, 16],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "join",
                  ),
                  false,
                  [v.stringLiteral([14, 22, 14, 25], "-")],
                ),
              ),
              v.propertyAssignment(
                [15, 5, 15, 37],
                "doubled",
                v.callExpression(
                  [15, 14, 15, 37],
                  v.propertyAccessExpression(
                    [15, 14, 15, 23],
                    v.identifier(
                      [15, 14, 15, 19],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "map",
                  ),
                  false,
                  [
                    v.arrowFunction(
                      [15, 24, 15, 36],
                      [
                        v.parameterDeclaration(
                          [15, 25, 15, 26],
                          v.identifier(
                            [15, 25, 15, 26],
                            "n",
                            "n$3kt9mhwly650i$2",
                          ),
                        ),
                      ],
                      v.binaryExpression(
                        [15, 31, 15, 36],
                        v.identifier(
                          [15, 31, 15, 32],
                          "n",
                          "n$3kt9mhwly650i$2",
                        ),
                        "*",
                        v.numericLiteral([15, 35, 15, 36], 2),
                      ),
                    ),
                  ],
                ),
              ),
              v.propertyAssignment(
                [16, 5, 16, 38],
                "small",
                v.callExpression(
                  [16, 12, 16, 38],
                  v.propertyAccessExpression(
                    [16, 12, 16, 24],
                    v.identifier(
                      [16, 12, 16, 17],
                      "coins",
                      "coins$3kt9mhwly650i$0",
                    ),
                    false,
                    "filter",
                  ),
                  false,
                  [
                    v.arrowFunction(
                      [16, 25, 16, 37],
                      [
                        v.parameterDeclaration(
                          [16, 26, 16, 27],
                          v.identifier(
                            [16, 26, 16, 27],
                            "n",
                            "n$3kt9mhwly650i$3",
                          ),
                        ),
                      ],
                      v.binaryExpression(
                        [16, 32, 16, 37],
                        v.identifier(
                          [16, 32, 16, 33],
                          "n",
                          "n$3kt9mhwly650i$3",
                        ),
                        "<",
                        v.numericLiteral([16, 36, 16, 37], 3),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    ),
);
