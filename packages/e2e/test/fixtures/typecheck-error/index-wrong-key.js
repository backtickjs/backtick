import { cs } from "@backtickjs/core";
// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number, and a plain object only
// a key its type names.
const point = { x: 1, y: 2 };
export default cs.create(
  [8, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "index-wrong-key.ts",
    fileHash: "6wasi1o08l4",
    kind: "value",
    splices: { $point: point },
    captures: [],
    spliceParams: { $point: [] },
  },
  (v) =>
    v.arrow(
      [8, 19, 13, 2],
      [v.identifier([8, 20, 8, 24], "name", "name$6wasi1o08l4$0")],
      v.block(
        [8, 37, 13, 2],
        [
          v.variableDeclaration(
            [9, 3, 9, 28],
            "const",
            v.identifier([9, 9, 9, 14], "coins", "coins$6wasi1o08l4$1"),
            v.array(
              [9, 17, 9, 27],
              [
                v.number([9, 18, 9, 19], 5),
                v.number([9, 21, 9, 23], 31),
                v.number([9, 25, 9, 26], 7),
              ],
            ),
          ),
          v.variableDeclaration(
            [10, 3, 10, 29],
            "const",
            v.identifier([10, 9, 10, 14], "first", "first$6wasi1o08l4$2"),
            v.index(
              [10, 17, 10, 28],
              v.identifier([10, 17, 10, 22], "coins", "coins$6wasi1o08l4$1"),
              v.identifier([10, 23, 10, 27], "name", "name$6wasi1o08l4$0"),
            ),
          ),
          v.variableDeclaration(
            [11, 3, 11, 30],
            "const",
            v.identifier([11, 9, 11, 14], "which", "which$6wasi1o08l4$3"),
            v.index(
              [11, 17, 11, 29],
              v.splice([11, 17, 11, 23], "$point"),
              v.identifier([11, 24, 11, 28], "name", "name$6wasi1o08l4$0"),
            ),
          ),
          v.return(
            [12, 3, 12, 24],
            v.binop(
              [12, 10, 12, 23],
              v.identifier([12, 10, 12, 15], "first", "first$6wasi1o08l4$2"),
              "+",
              v.identifier([12, 18, 12, 23], "which", "which$6wasi1o08l4$3"),
            ),
          ),
        ],
      ),
    ),
);
