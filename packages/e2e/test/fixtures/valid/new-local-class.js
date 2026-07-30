import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// A spliced class lowers to a function with one hole per constructor
// parameter, and a construction is a plain call of that value — so the
// class can pass through a local and be instantiated on another line.
export default cs.create(
  [19, 16, 23, 3],
  {
    version: "0.0.0",
    filePath: "new-local-class.tsx",
    fileHash: "2pik4a0v1yd8w",
    kind: "value",
    splices: { $Point: Point },
    captures: [],
    spliceParams: { $Point: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [19, 19, 23, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [20, 3, 20, 20],
        name: {
          kind: "AstScriptIdentifier",
          loc: [20, 9, 20, 10],
          text: "C",
          bindingKey: "C$2pik4a0v1yd8w$0",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [20, 13, 20, 19],
          key: "$Point",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [21, 3, 21, 25],
        name: {
          kind: "AstScriptIdentifier",
          loc: [21, 9, 21, 10],
          text: "p",
          bindingKey: "p$2pik4a0v1yd8w$1",
        },
        initializer: {
          kind: "AstScriptNewExpression",
          loc: [21, 13, 21, 24],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [21, 17, 21, 18],
            text: "C",
            bindingKey: "C$2pik4a0v1yd8w$0",
          },
          arguments: [
            {
              kind: "AstScriptNumericLiteral",
              loc: [21, 19, 21, 20],
              value: 1,
            },
            {
              kind: "AstScriptNumericLiteral",
              loc: [21, 22, 21, 23],
              value: 2,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [22, 3, 22, 20],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [22, 10, 22, 19],
          left: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [22, 10, 22, 13],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [22, 10, 22, 11],
              text: "p",
              bindingKey: "p$2pik4a0v1yd8w$1",
            },
            questionDotToken: false,
            name: "x",
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [22, 16, 22, 19],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [22, 16, 22, 17],
              text: "p",
              bindingKey: "p$2pik4a0v1yd8w$1",
            },
            questionDotToken: false,
            name: "y",
          },
        },
      },
    ],
  }),
);
