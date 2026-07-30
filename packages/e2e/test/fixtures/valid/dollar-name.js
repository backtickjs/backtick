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
      spliceParams: { $lhs: [] },
    },
    () => ({
      kind: "AstScriptBinaryExpression",
      loc: [8, 13, 8, 21],
      left: {
        kind: "AstScriptSplice",
        loc: [8, 13, 8, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "AstScriptNumericLiteral",
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
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptIdentifier",
            loc: [13, 19, 13, 23],
            text: "foo$",
            bindingKey: "foo$$3r8prbdxxrtje$0",
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["foo$$3r8prbdxxrtje$0"] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [11, 19, 14, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [12, 3, 12, 18],
        name: {
          kind: "AstScriptIdentifier",
          loc: [12, 9, 12, 13],
          text: "foo$",
          bindingKey: "foo$$3r8prbdxxrtje$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [12, 16, 12, 17],
          value: 1,
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [13, 3, 13, 27],
        expression: {
          kind: "AstScriptSplice",
          loc: [13, 10, 13, 26],
          key: "$0splice0",
        },
      },
    ],
  }),
);
