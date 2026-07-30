import { cs } from "@backtickjs/core";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
export default cs.create(
  [6, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "for-per-turn-binding.ts",
    fileHash: "21o8qjv656zb3",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [6, 19, 12, 2],
      [
        v.variableDeclaration(
          [7, 3, 7, 22],
          "let",
          v.identifier([7, 7, 7, 11], "last", "last$21o8qjv656zb3$0"),
          v.arrow([7, 14, 7, 21], [], v.number([7, 20, 7, 21], 0)),
        ),
        v.for(
          [8, 3, 10, 4],
          v.variableDeclaration(
            [8, 8, 8, 17],
            "let",
            v.identifier([8, 12, 8, 13], "i", "i$21o8qjv656zb3$1"),
            v.number([8, 16, 8, 17], 0),
          ),
          v.binop(
            [8, 19, 8, 24],
            v.identifier([8, 19, 8, 20], "i", "i$21o8qjv656zb3$1"),
            "<",
            v.number([8, 23, 8, 24], 3),
          ),
          v.assignment(
            [8, 26, 8, 35],
            v.identifier([8, 26, 8, 27], "i", "i$21o8qjv656zb3$1"),
            v.binop(
              [8, 30, 8, 35],
              v.identifier([8, 30, 8, 31], "i", "i$21o8qjv656zb3$1"),
              "+",
              v.number([8, 34, 8, 35], 1),
            ),
          ),
          v.block(
            [8, 37, 10, 4],
            [
              v.assignment(
                [9, 5, 9, 19],
                v.identifier([9, 5, 9, 9], "last", "last$21o8qjv656zb3$0"),
                v.arrow(
                  [9, 12, 9, 19],
                  [],
                  v.identifier([9, 18, 9, 19], "i", "i$21o8qjv656zb3$1"),
                ),
              ),
            ],
          ),
        ),
        v.return(
          [11, 3, 11, 17],
          v.call(
            [11, 10, 11, 16],
            v.identifier([11, 10, 11, 14], "last", "last$21o8qjv656zb3$0"),
            [],
          ),
        ),
      ],
    ),
);
