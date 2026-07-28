import { cs } from "@backtickjs/core";
// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.create(
  [10, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "nested-non-boolean-operand.ts",
    fileHash: "1yqqpc9g2l4nh",
    kind: "value",
    splices: {},
    captures: [],
    spliceScopes: {},
  },
  (v) =>
    v.arrow(
      [10, 19, 16, 2],
      [v.identifier([10, 20, 10, 25], "count", "count$1yqqpc9g2l4nh$0")],
      v.block(
        [10, 38, 16, 2],
        [
          v.variableDeclaration(
            [11, 3, 11, 36],
            "const",
            v.identifier([11, 9, 11, 13], "keep", "keep$1yqqpc9g2l4nh$1"),
            v.arrow(
              [11, 16, 11, 35],
              [v.identifier([11, 17, 11, 19], "on", "on$1yqqpc9g2l4nh$2")],
              v.identifier([11, 33, 11, 35], "on", "on$1yqqpc9g2l4nh$2"),
            ),
          ),
          v.if(
            [12, 3, 14, 4],
            v.call(
              [12, 7, 12, 31],
              v.identifier([12, 7, 12, 11], "keep", "keep$1yqqpc9g2l4nh$1"),
              [
                v.binop(
                  [12, 12, 12, 30],
                  v.identifier(
                    [12, 12, 12, 17],
                    "count",
                    "count$1yqqpc9g2l4nh$0",
                  ),
                  "&&",
                  v.binop(
                    [12, 21, 12, 30],
                    v.identifier(
                      [12, 21, 12, 26],
                      "count",
                      "count$1yqqpc9g2l4nh$0",
                    ),
                    ">",
                    v.number([12, 29, 12, 30], 0),
                  ),
                ),
              ],
            ),
            v.block(
              [12, 33, 14, 4],
              [v.return([13, 5, 13, 19], v.string([13, 12, 13, 18], "kept"))],
            ),
            null,
          ),
          v.return([15, 3, 15, 20], v.string([15, 10, 15, 19], "dropped")),
        ],
      ),
    ),
);
