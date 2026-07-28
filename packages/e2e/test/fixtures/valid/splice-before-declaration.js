import { cs } from "@backtickjs/core";
// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function wrap(fragment) {
  return cs.create(
    [14, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "splice-before-declaration.ts",
      fileHash: "2r40h7jqt1118",
      kind: "value",
      splices: { $fragment: fragment },
      captures: [],
      spliceScopes: { $fragment: ["before$2r40h7jqt1118$0"] },
    },
    (v) =>
      v.block(
        [14, 13, 19, 4],
        [
          v.variableDeclaration(
            [15, 5, 15, 22],
            "const",
            v.identifier([15, 11, 15, 17], "before", "before$2r40h7jqt1118$0"),
            v.number([15, 20, 15, 21], 1),
          ),
          v.variableDeclaration(
            [16, 5, 16, 31],
            "const",
            v.identifier(
              [16, 11, 16, 18],
              "spliced",
              "spliced$2r40h7jqt1118$1",
            ),
            v.splice([16, 21, 16, 30], "$fragment"),
          ),
          v.variableDeclaration(
            [17, 5, 17, 21],
            "const",
            v.identifier([17, 11, 17, 16], "after", "after$2r40h7jqt1118$2"),
            v.number([17, 19, 17, 20], 2),
          ),
          v.return(
            [18, 5, 18, 37],
            v.binop(
              [18, 12, 18, 36],
              v.binop(
                [18, 12, 18, 28],
                v.identifier(
                  [18, 12, 18, 18],
                  "before",
                  "before$2r40h7jqt1118$0",
                ),
                "+",
                v.identifier(
                  [18, 21, 18, 28],
                  "spliced",
                  "spliced$2r40h7jqt1118$1",
                ),
              ),
              "+",
              v.identifier([18, 31, 18, 36], "after", "after$2r40h7jqt1118$2"),
            ),
          ),
        ],
      ),
  );
}
export default cs.create(
  [22, 16, 22, 53],
  {
    version: "0.0.0",
    filePath: "splice-before-declaration.ts",
    fileHash: "2r40h7jqt1118",
    kind: "value",
    splices: {
      $0splice0: wrap(
        cs.create(
          [22, 26, 22, 32],
          {
            version: "0.0.0",
            filePath: "splice-before-declaration.ts",
            fileHash: "2r40h7jqt1118",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([22, 29, 22, 31], 10),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [22, 44, 22, 50],
          {
            version: "0.0.0",
            filePath: "splice-before-declaration.ts",
            fileHash: "2r40h7jqt1118",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([22, 47, 22, 49], 20),
        ),
      ),
    },
    captures: [],
    spliceScopes: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.binop(
      [22, 19, 22, 52],
      v.splice([22, 19, 22, 34], "$0splice0"),
      "+",
      v.splice([22, 37, 22, 52], "$0splice1"),
    ),
);
