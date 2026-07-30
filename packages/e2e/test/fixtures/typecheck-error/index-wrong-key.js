import { cs } from "@backtickjs/core";
// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number — `"0"` is a string, and
// no amount of it looking like a number changes that — and a plain object takes
// only a key its type names.
const point = { x: 1, y: 2 };
export default cs.create(
  [9, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "index-wrong-key.ts",
    fileHash: "2h9vfj6qbexsg",
    kind: "value",
    splices: { $point: point },
    captures: [],
    spliceParams: { $point: [] },
  },
  (v) =>
    v.arrow(
      [9, 19, 15, 2],
      [v.identifier([9, 20, 9, 24], "name", "name$2h9vfj6qbexsg$0")],
      v.block(
        [9, 37, 15, 2],
        [
          v.variableDeclaration(
            [10, 3, 10, 28],
            "const",
            v.identifier([10, 9, 10, 14], "coins", "coins$2h9vfj6qbexsg$1"),
            v.array(
              [10, 17, 10, 27],
              [
                v.number([10, 18, 10, 19], 5),
                v.number([10, 21, 10, 23], 31),
                v.number([10, 25, 10, 26], 7),
              ],
            ),
          ),
          v.variableDeclaration(
            [11, 3, 11, 28],
            "const",
            v.identifier([11, 9, 11, 14], "first", "first$2h9vfj6qbexsg$2"),
            v.index(
              [11, 17, 11, 27],
              v.identifier([11, 17, 11, 22], "coins", "coins$2h9vfj6qbexsg$1"),
              v.string([11, 23, 11, 26], "0"),
            ),
          ),
          v.variableDeclaration(
            [12, 3, 12, 29],
            "const",
            v.identifier([12, 9, 12, 14], "wrong", "wrong$2h9vfj6qbexsg$3"),
            v.index(
              [12, 17, 12, 28],
              v.identifier([12, 17, 12, 22], "coins", "coins$2h9vfj6qbexsg$1"),
              v.identifier([12, 23, 12, 27], "name", "name$2h9vfj6qbexsg$0"),
            ),
          ),
          v.variableDeclaration(
            [13, 3, 13, 30],
            "const",
            v.identifier([13, 9, 13, 14], "which", "which$2h9vfj6qbexsg$4"),
            v.index(
              [13, 17, 13, 29],
              v.splice([13, 17, 13, 23], "$point"),
              v.identifier([13, 24, 13, 28], "name", "name$2h9vfj6qbexsg$0"),
            ),
          ),
          v.return(
            [14, 3, 14, 32],
            v.binop(
              [14, 10, 14, 31],
              v.binop(
                [14, 10, 14, 23],
                v.identifier(
                  [14, 10, 14, 15],
                  "first",
                  "first$2h9vfj6qbexsg$2",
                ),
                "+",
                v.identifier(
                  [14, 18, 14, 23],
                  "wrong",
                  "wrong$2h9vfj6qbexsg$3",
                ),
              ),
              "+",
              v.identifier([14, 26, 14, 31], "which", "which$2h9vfj6qbexsg$4"),
            ),
          ),
        ],
      ),
    ),
);
