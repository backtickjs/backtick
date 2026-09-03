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
      splices: { $lhs: { value: lhs, params: [] } },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [8, 13, 8, 21],
      left: {
        kind: "splice",
        loc: [8, 13, 8, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "number",
        loc: [8, 20, 8, 21],
        value: 2,
      },
    }),
  );
}
export default cs.create(
  [11, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "dollar-name.ts",
    fileHash: "3r8prbdxxrtje",
    splices: {
      $0splice0: {
        value: add(
          cs.create(
            [13, 16, 13, 24],
            {
              version: "0.0.0",
              filePath: "dollar-name.ts",
              fileHash: "3r8prbdxxrtje",
              splices: {},
              captures: ["foo$$3r8prbdxxrtje$0"],
            },
            () => ({
              kind: "id",
              loc: [13, 19, 13, 23],
              text: "foo$",
              bindingKey: "foo$$3r8prbdxxrtje$0",
            }),
          ),
        ),
        params: ["foo$$3r8prbdxxrtje$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 19, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 18],
        name: {
          kind: "id",
          loc: [12, 9, 12, 13],
          text: "foo$",
          bindingKey: "foo$$3r8prbdxxrtje$0",
        },
        initializer: {
          kind: "number",
          loc: [12, 16, 12, 17],
          value: 1,
        },
      },
      {
        kind: "return",
        loc: [13, 3, 13, 27],
        expression: {
          kind: "splice",
          loc: [13, 10, 13, 26],
          key: "$0splice0",
        },
      },
    ],
  }),
);
