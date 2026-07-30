import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "nested-scripts.ts",
    fileHash: "3d1j5mxf94bs6",
    kind: "value",
    splices: {
      $0splice0: cs.create(
        [5, 12, 5, 17],
        {
          version: "0.0.0",
          filePath: "nested-scripts.ts",
          fileHash: "3d1j5mxf94bs6",
          kind: "value",
          splices: {},
          captures: ["x$3d1j5mxf94bs6$0"],
          spliceParams: {},
        },
        () => ({
          kind: "AstScriptIdentifier",
          loc: [5, 15, 5, 16],
          text: "x",
          bindingKey: "x$3d1j5mxf94bs6$0",
        }),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["x$3d1j5mxf94bs6$0"] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [4, 3, 4, 15],
        name: {
          kind: "AstScriptIdentifier",
          loc: [4, 9, 4, 10],
          text: "x",
          bindingKey: "x$3d1j5mxf94bs6$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [4, 13, 4, 14],
          value: 0,
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [5, 3, 5, 19],
        expression: {
          kind: "AstScriptSplice",
          loc: [5, 10, 5, 18],
          key: "$0splice0",
        },
      },
    ],
  }),
);
