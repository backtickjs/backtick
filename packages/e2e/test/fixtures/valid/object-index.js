import { cs } from "@backtickjs/core";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
export default cs.create(
  [9, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "object-index.ts",
    fileHash: "1cte50r1xtec2",
    kind: "value",
    splices: { $rates: rates },
    captures: [],
    spliceParams: { $rates: [] },
  },
  (v) =>
    v.arrow(
      [9, 19, 14, 2],
      [v.identifier([9, 20, 9, 28], "currency", "currency$1cte50r1xtec2$0")],
      v.block(
        [9, 41, 14, 2],
        [
          v.variableDeclaration(
            [10, 3, 10, 24],
            "const",
            v.identifier([10, 9, 10, 14], "table", "table$1cte50r1xtec2$1"),
            v.splice([10, 17, 10, 23], "$rates"),
          ),
          v.variableDeclaration(
            [11, 3, 11, 38],
            "const",
            v.identifier([11, 9, 11, 14], "asked", "asked$1cte50r1xtec2$2"),
            v.binop(
              [11, 17, 11, 37],
              v.index(
                [11, 17, 11, 32],
                v.identifier(
                  [11, 17, 11, 22],
                  "table",
                  "table$1cte50r1xtec2$1",
                ),
                v.identifier(
                  [11, 23, 11, 31],
                  "currency",
                  "currency$1cte50r1xtec2$0",
                ),
              ),
              "??",
              v.number([11, 36, 11, 37], 0),
            ),
          ),
          v.variableDeclaration(
            [12, 3, 12, 33],
            "const",
            v.identifier([12, 9, 12, 12], "usd", "usd$1cte50r1xtec2$3"),
            v.binop(
              [12, 15, 12, 32],
              v.index(
                [12, 15, 12, 27],
                v.identifier(
                  [12, 15, 12, 20],
                  "table",
                  "table$1cte50r1xtec2$1",
                ),
                v.string([12, 21, 12, 26], "usd"),
              ),
              "??",
              v.number([12, 31, 12, 32], 0),
            ),
          ),
          v.return(
            [13, 3, 13, 22],
            v.binop(
              [13, 10, 13, 21],
              v.identifier([13, 10, 13, 15], "asked", "asked$1cte50r1xtec2$2"),
              "+",
              v.identifier([13, 18, 13, 21], "usd", "usd$1cte50r1xtec2$3"),
            ),
          ),
        ],
      ),
    ),
);
