import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "shadowing.ts",
    fileHash: "wjl0rp4901n3",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [5, 16, 5, 25],
          {
            version: "0.0.0",
            filePath: "shadowing.ts",
            fileHash: "wjl0rp4901n3",
            kind: "value",
            splices: {},
            captures: ["total$wjl0rp4901n3$0"],
            spliceParams: {},
          },
          () => ({
            kind: "AstScriptIdentifier",
            loc: [5, 19, 5, 24],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$0",
          }),
        ),
        100,
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["total$wjl0rp4901n3$0"] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [4, 3, 4, 19],
        name: {
          kind: "AstScriptIdentifier",
          loc: [4, 9, 4, 14],
          text: "total",
          bindingKey: "total$wjl0rp4901n3$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [4, 17, 4, 18],
          value: 1,
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [5, 3, 5, 33],
        expression: {
          kind: "AstScriptSplice",
          loc: [5, 10, 5, 32],
          key: "$0splice0",
        },
      },
    ],
  }),
);
function add(lhs, rhs) {
  return cs.create(
    [9, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "shadowing.ts",
      fileHash: "wjl0rp4901n3",
      kind: "value",
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      spliceParams: { $lhs: [], $rhs: [] },
    },
    () => ({
      kind: "AstScriptBlock",
      loc: [9, 13, 14, 4],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [10, 5, 10, 19],
          name: {
            kind: "AstScriptIdentifier",
            loc: [10, 9, 10, 14],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [10, 17, 10, 18],
            value: 0,
          },
          keyword: "let",
        },
        {
          kind: "AstScriptBinaryExpression",
          loc: [11, 5, 11, 25],
          left: {
            kind: "AstScriptIdentifier",
            loc: [11, 5, 11, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [11, 13, 11, 25],
            left: {
              kind: "AstScriptIdentifier",
              loc: [11, 13, 11, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptSplice",
              loc: [11, 21, 11, 25],
              key: "$lhs",
            },
          },
        },
        {
          kind: "AstScriptBinaryExpression",
          loc: [12, 5, 12, 25],
          left: {
            kind: "AstScriptIdentifier",
            loc: [12, 5, 12, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [12, 13, 12, 25],
            left: {
              kind: "AstScriptIdentifier",
              loc: [12, 13, 12, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptSplice",
              loc: [12, 21, 12, 25],
              key: "$rhs",
            },
          },
        },
        {
          kind: "AstScriptReturnStatement",
          loc: [13, 5, 13, 18],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [13, 12, 13, 17],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
        },
      ],
    }),
  );
}
