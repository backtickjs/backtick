import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "splice-sharing.ts",
      fileHash: "2veya8r3aoo5f",
      kind: "value",
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      spliceParams: { $lhs: [], $rhs: [] },
    },
    () => ({
      kind: "AstScriptBinaryExpression",
      loc: [4, 13, 4, 24],
      left: {
        kind: "AstScriptSplice",
        loc: [4, 13, 4, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "AstScriptSplice",
        loc: [4, 20, 4, 24],
        key: "$rhs",
      },
    }),
  );
}
export default cs.create(
  [7, 16, 10, 4],
  {
    version: "0.0.0",
    filePath: "splice-sharing.ts",
    fileHash: "2veya8r3aoo5f",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [8, 12, 8, 17],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [8, 15, 8, 16],
            value: 1,
          }),
        ),
        cs.create(
          [8, 19, 8, 24],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [8, 22, 8, 23],
            value: 2,
          }),
        ),
      ),
      $0splice1: add(
        cs.create(
          [9, 12, 9, 17],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [9, 15, 9, 16],
            value: 3,
          }),
        ),
        cs.create(
          [9, 19, 9, 24],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [9, 22, 9, 23],
            value: 4,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [7, 20, 10, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [8, 3, 8, 26],
        name: "x",
        initializer: {
          kind: "AstScriptSplice",
          loc: [8, 6, 8, 26],
          key: "$0splice0",
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [9, 3, 9, 26],
        name: "y",
        initializer: {
          kind: "AstScriptSplice",
          loc: [9, 6, 9, 26],
          key: "$0splice1",
        },
      },
    ],
  }),
);
