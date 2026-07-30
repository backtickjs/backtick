import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "deep-nested-scripts.ts",
      fileHash: "jmxp905pbgk8",
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
  [7, 16, 7, 40],
  {
    version: "0.0.0",
    filePath: "deep-nested-scripts.ts",
    fileHash: "jmxp905pbgk8",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [7, 25, 7, 30],
          {
            version: "0.0.0",
            filePath: "deep-nested-scripts.ts",
            fileHash: "jmxp905pbgk8",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [7, 28, 7, 29],
            value: 1,
          }),
        ),
        cs.create(
          [7, 32, 7, 37],
          {
            version: "0.0.0",
            filePath: "deep-nested-scripts.ts",
            fileHash: "jmxp905pbgk8",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptNumericLiteral",
            loc: [7, 35, 7, 36],
            value: 2,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: "AstScriptSplice",
    loc: [7, 19, 7, 39],
    key: "$0splice0",
  }),
);
