import { cs } from "@backtickjs/core";
// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate = cs.create(
  [9, 58, 18, 3],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrow(
      [9, 61, 18, 2],
      [
        v.identifier([10, 3, 10, 4], "a", "a$2nymys98gllff$0"),
        v.identifier([11, 3, 11, 4], "b", "b$2nymys98gllff$1"),
      ],
      v.block(
        [12, 6, 18, 2],
        [
          v.variableDeclaration(
            [13, 3, 13, 36],
            "const",
            v.identifier([13, 9, 13, 13], "keep", "keep$2nymys98gllff$2"),
            v.arrow(
              [13, 16, 13, 35],
              [v.identifier([13, 17, 13, 19], "on", "on$2nymys98gllff$3")],
              v.identifier([13, 33, 13, 35], "on", "on$2nymys98gllff$3"),
            ),
          ),
          v.if(
            [14, 3, 16, 4],
            v.call(
              [14, 7, 14, 19],
              v.identifier([14, 7, 14, 11], "keep", "keep$2nymys98gllff$2"),
              [
                v.binop(
                  [14, 12, 14, 18],
                  v.identifier([14, 12, 14, 13], "a", "a$2nymys98gllff$0"),
                  "&&",
                  v.identifier([14, 17, 14, 18], "b", "b$2nymys98gllff$1"),
                ),
              ],
            ),
            v.block(
              [14, 21, 16, 4],
              [v.return([15, 5, 15, 19], v.string([15, 12, 15, 18], "kept"))],
            ),
            null,
          ),
          v.return([17, 3, 17, 20], v.string([17, 10, 17, 19], "dropped")),
        ],
      ),
    ),
);
export default cs.create(
  [20, 16, 23, 4],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: { $gate: gate },
    captures: [],
    spliceParams: { $gate: [] },
  },
  (v) =>
    v.object([20, 20, 23, 2], {
      both: v.call([21, 9, 21, 26], v.splice([21, 9, 21, 14], "$gate"), [
        v.boolean([21, 15, 21, 19], true),
        v.boolean([21, 21, 21, 25], true),
      ]),
      one: v.call([22, 8, 22, 26], v.splice([22, 8, 22, 13], "$gate"), [
        v.boolean([22, 14, 22, 18], true),
        v.boolean([22, 20, 22, 25], false),
      ]),
    }),
);
