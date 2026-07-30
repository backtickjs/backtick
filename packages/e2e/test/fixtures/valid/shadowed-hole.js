import { cs } from "@backtickjs/core";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. Only a
// binding an entry *captures* ever needed a distinct name, and those now live in
// `$env` where they cannot collide with a local at all.
function wrap(fragment) {
  return cs.create(
    [12, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "shadowed-hole.ts",
      fileHash: "2jup3dk7x37m7",
      kind: "value",
      splices: { $fragment: fragment },
      captures: [],
      spliceParams: { $fragment: [] },
    },
    () => ({
      kind: "AstScriptBlock",
      loc: [12, 13, 18, 4],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [13, 5, 13, 21],
          name: {
            kind: "AstScriptIdentifier",
            loc: [13, 11, 13, 16],
            text: "total",
            bindingKey: "total$2jup3dk7x37m7$0",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [13, 19, 13, 20],
            value: 1,
          },
          keyword: "const",
        },
        {
          kind: "AstScriptBlock",
          loc: [14, 5, 17, 6],
          statements: [
            {
              kind: "AstScriptVariableDeclaration",
              loc: [15, 7, 15, 23],
              name: {
                kind: "AstScriptIdentifier",
                loc: [15, 13, 15, 18],
                text: "total",
                bindingKey: "total$2jup3dk7x37m7$1",
              },
              initializer: {
                kind: "AstScriptNumericLiteral",
                loc: [15, 21, 15, 22],
                value: 2,
              },
              keyword: "const",
            },
            {
              kind: "AstScriptReturnStatement",
              loc: [16, 7, 16, 32],
              expression: {
                kind: "AstScriptBinaryExpression",
                loc: [16, 14, 16, 31],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [16, 14, 16, 19],
                  text: "total",
                  bindingKey: "total$2jup3dk7x37m7$1",
                },
                operatorToken: "+",
                right: {
                  kind: "AstScriptSplice",
                  loc: [16, 22, 16, 31],
                  key: "$fragment",
                },
              },
            },
          ],
        },
      ],
    }),
  );
}
export default cs.create(
  [21, 16, 21, 53],
  {
    version: "0.0.0",
    filePath: "shadowed-hole.ts",
    fileHash: "2jup3dk7x37m7",
    kind: "value",
    splices: {
      $0splice0: wrap(
        cs.create(
          [21, 26, 21, 32],
          {
            version: "0.0.0",
            filePath: "shadowed-hole.ts",
            fileHash: "2jup3dk7x37m7",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [21, 29, 21, 31],
            value: 10,
          }),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [21, 44, 21, 50],
          {
            version: "0.0.0",
            filePath: "shadowed-hole.ts",
            fileHash: "2jup3dk7x37m7",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [21, 47, 21, 49],
            value: 20,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: "AstScriptBinaryExpression",
    loc: [21, 19, 21, 52],
    left: {
      kind: "AstScriptSplice",
      loc: [21, 19, 21, 34],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "AstScriptSplice",
      loc: [21, 37, 21, 52],
      key: "$0splice1",
    },
  }),
);
