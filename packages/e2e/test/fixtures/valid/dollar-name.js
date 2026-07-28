import { cs } from "@backtickjs/core";
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
  return cs.create(
    [8, 10, 8, 22],
    {
      version: "0.0.0",
      filePath: "dollar-name.ts",
      fileHash: "3r8prbdxxrtje",
      kind: "value",
      splices: { $lhs: lhs },
      captures: [],
      spliceScopes: { $lhs: [] },
    },
    (v) =>
      v.binop(
        [8, 13, 8, 21],
        v.splice([8, 13, 8, 17], "$lhs"),
        "+",
        v.number([8, 20, 8, 21], 2),
      ),
  );
}
export default cs.create(
  [11, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "dollar-name.ts",
    fileHash: "3r8prbdxxrtje",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [13, 16, 13, 24],
          {
            version: "0.0.0",
            filePath: "dollar-name.ts",
            fileHash: "3r8prbdxxrtje",
            kind: "value",
            splices: {},
            captures: ["foo$$3r8prbdxxrtje$0"],
            spliceScopes: {},
          },
          (v) => v.identifier([13, 19, 13, 23], "foo$", "foo$$3r8prbdxxrtje$0"),
        ),
      ),
    },
    captures: [],
    spliceScopes: { $0splice0: ["foo$$3r8prbdxxrtje$0"] },
  },
  (v) =>
    v.block(
      [11, 19, 14, 2],
      [
        v.variableDeclaration(
          [12, 3, 12, 18],
          "const",
          v.identifier([12, 9, 12, 13], "foo$", "foo$$3r8prbdxxrtje$0"),
          v.number([12, 16, 12, 17], 1),
        ),
        v.return([13, 3, 13, 27], v.splice([13, 10, 13, 26], "$0splice0")),
      ],
    ),
);
