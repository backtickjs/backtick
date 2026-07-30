import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 3, 75],
  {
    version: "0.0.0",
    filePath: "runtime-values.ts",
    fileHash: "1rjo8fz06u9rg",
    kind: "value",
    splices: { $0splice0: [1, "two", true, null], $0splice1: { k: 3 } },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [3, 20, 3, 73],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [3, 22, 3, 53],
        name: "list",
        initializer: {
          kind: "AstScriptSplice",
          loc: [3, 28, 3, 53],
          key: "$0splice0",
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [3, 55, 3, 71],
        name: "obj",
        initializer: {
          kind: "AstScriptSplice",
          loc: [3, 60, 3, 71],
          key: "$0splice1",
        },
      },
    ],
  }),
);
