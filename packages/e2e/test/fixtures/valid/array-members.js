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
    declarations: [
      "coins$3kt9mhwly650i$0",
      "four$3kt9mhwly650i$1",
      "n$3kt9mhwly650i$2",
      "n$3kt9mhwly650i$3",
    ],
  },
  (v) =>
    v.block(
      [5, 19, 18, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 27],
          "const",
          v.identifier([6, 9, 6, 14], "coins", "coins$3kt9mhwly650i$0"),
          v.array(
            [6, 17, 6, 26],
            [
              v.number([6, 18, 6, 19], 1),
              v.number([6, 21, 6, 22], 2),
              v.number([6, 24, 6, 25], 3),
            ],
          ),
        ),
        v.variableDeclaration(
          [7, 3, 7, 18],
          "const",
          v.identifier([7, 9, 7, 13], "four", "four$3kt9mhwly650i$1"),
          v.number([7, 16, 7, 17], 4),
        ),
        v.return(
          [8, 3, 17, 5],
          v.object([8, 10, 17, 4], {
            count: v.propertyAccess(
              [9, 12, 9, 24],
              v.identifier([9, 12, 9, 17], "coins", "coins$3kt9mhwly650i$0"),
              "length",
            ),
            all: v.call(
              [10, 10, 10, 30],
              v.propertyAccess(
                [10, 10, 10, 22],
                v.identifier(
                  [10, 10, 10, 15],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "concat",
              ),
              [
                v.array(
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
            part: v.call(
              [11, 11, 11, 28],
              v.propertyAccess(
                [11, 11, 11, 22],
                v.identifier(
                  [11, 11, 11, 16],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "slice",
              ),
              [v.number([11, 23, 11, 24], 0), v.number([11, 26, 11, 27], 2)],
            ),
            where: v.call(
              [12, 12, 12, 28],
              v.propertyAccess(
                [12, 12, 12, 25],
                v.identifier(
                  [12, 12, 12, 17],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "indexOf",
              ),
              [v.number([12, 26, 12, 27], 2)],
            ),
            has: v.call(
              [13, 10, 13, 27],
              v.propertyAccess(
                [13, 10, 13, 24],
                v.identifier(
                  [13, 10, 13, 15],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "includes",
              ),
              [v.number([13, 25, 13, 26], 3)],
            ),
            text: v.call(
              [14, 11, 14, 26],
              v.propertyAccess(
                [14, 11, 14, 21],
                v.identifier(
                  [14, 11, 14, 16],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "join",
              ),
              [v.string([14, 22, 14, 25], "-")],
            ),
            doubled: v.call(
              [15, 14, 15, 37],
              v.propertyAccess(
                [15, 14, 15, 23],
                v.identifier(
                  [15, 14, 15, 19],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "map",
              ),
              [
                v.arrow(
                  [15, 24, 15, 36],
                  [v.identifier([15, 25, 15, 26], "n", "n$3kt9mhwly650i$2")],
                  v.binop(
                    [15, 31, 15, 36],
                    v.identifier([15, 31, 15, 32], "n", "n$3kt9mhwly650i$2"),
                    "*",
                    v.number([15, 35, 15, 36], 2),
                  ),
                ),
              ],
            ),
            small: v.call(
              [16, 12, 16, 38],
              v.propertyAccess(
                [16, 12, 16, 24],
                v.identifier(
                  [16, 12, 16, 17],
                  "coins",
                  "coins$3kt9mhwly650i$0",
                ),
                "filter",
              ),
              [
                v.arrow(
                  [16, 25, 16, 37],
                  [v.identifier([16, 26, 16, 27], "n", "n$3kt9mhwly650i$3")],
                  v.binop(
                    [16, 32, 16, 37],
                    v.identifier([16, 32, 16, 33], "n", "n$3kt9mhwly650i$3"),
                    "<",
                    v.number([16, 36, 16, 37], 3),
                  ),
                ),
              ],
            ),
          }),
        ),
      ],
    ),
);
