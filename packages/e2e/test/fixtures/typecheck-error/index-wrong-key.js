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
    v.arrowFunction(
      [9, 19, 15, 2],
      [v.identifier([9, 20, 9, 24], "name", "name$2h9vfj6qbexsg$0")],
      v.block(
        [9, 37, 15, 2],
        [
          v.variableDeclaration(
            [10, 3, 10, 28],
            v.identifier([10, 9, 10, 14], "coins", "coins$2h9vfj6qbexsg$1"),
            v.arrayLiteralExpression(
              [10, 17, 10, 27],
              [
                v.numericLiteral([10, 18, 10, 19], 5),
                v.numericLiteral([10, 21, 10, 23], 31),
                v.numericLiteral([10, 25, 10, 26], 7),
              ],
            ),
            "const",
          ),
          v.variableDeclaration(
            [11, 3, 11, 28],
            v.identifier([11, 9, 11, 14], "first", "first$2h9vfj6qbexsg$2"),
            v.elementAccessExpression(
              [11, 17, 11, 27],
              v.identifier([11, 17, 11, 22], "coins", "coins$2h9vfj6qbexsg$1"),
              v.stringLiteral([11, 23, 11, 26], "0"),
            ),
            "const",
          ),
          v.variableDeclaration(
            [12, 3, 12, 29],
            v.identifier([12, 9, 12, 14], "wrong", "wrong$2h9vfj6qbexsg$3"),
            v.elementAccessExpression(
              [12, 17, 12, 28],
              v.identifier([12, 17, 12, 22], "coins", "coins$2h9vfj6qbexsg$1"),
              v.identifier([12, 23, 12, 27], "name", "name$2h9vfj6qbexsg$0"),
            ),
            "const",
          ),
          v.variableDeclaration(
            [13, 3, 13, 30],
            v.identifier([13, 9, 13, 14], "which", "which$2h9vfj6qbexsg$4"),
            v.elementAccessExpression(
              [13, 17, 13, 29],
              v.splice([13, 17, 13, 23], "$point"),
              v.identifier([13, 24, 13, 28], "name", "name$2h9vfj6qbexsg$0"),
            ),
            "const",
          ),
          v.returnStatement(
            [14, 3, 14, 32],
            v.binaryExpression(
              [14, 10, 14, 31],
              v.binaryExpression(
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
