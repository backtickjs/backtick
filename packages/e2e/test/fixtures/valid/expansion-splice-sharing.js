import { cs } from "@backtickjs/core";
// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a, b) {
  return cs.create(
    [9, 10, 9, 27],
    {
      version: "0.0.0",
      filePath: "expansion-splice-sharing.ts",
      fileHash: "2kc5czyfqafly",
      kind: "value",
      splices: { $a: a, $b: b },
      captures: [],
      spliceParams: { $a: [], $b: [] },
    },
    () => ({
      kind: "AstScriptArrowFunction",
      loc: [9, 13, 9, 26],
      parameters: [],
      body: {
        kind: "AstScriptBinaryExpression",
        loc: [9, 19, 9, 26],
        left: {
          kind: "AstScriptSplice",
          loc: [9, 19, 9, 21],
          key: "$a",
        },
        operatorToken: "+",
        right: {
          kind: "AstScriptSplice",
          loc: [9, 24, 9, 26],
          key: "$b",
        },
      },
    }),
  );
}
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get sum() {
    return sum(this.x, this.y);
  }
}
class Size {
  "@backtickjs" = "ClientObject";
  width;
  height;
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get sum() {
    return sum(this.width, this.height);
  }
}
export default cs.create(
  [44, 16, 48, 3],
  {
    version: "0.0.0",
    filePath: "expansion-splice-sharing.ts",
    fileHash: "2kc5czyfqafly",
    kind: "value",
    splices: { $Point: Point, $Size: Size },
    captures: [],
    spliceParams: { $Point: [], $Size: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [44, 19, 48, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [45, 3, 45, 30],
        name: {
          kind: "AstScriptIdentifier",
          loc: [45, 9, 45, 10],
          text: "p",
          bindingKey: "p$2kc5czyfqafly$0",
        },
        initializer: {
          kind: "AstScriptNewExpression",
          loc: [45, 13, 45, 29],
          expression: {
            kind: "AstScriptSplice",
            loc: [45, 17, 45, 23],
            key: "$Point",
          },
          arguments: [
            {
              kind: "AstScriptNumericLiteral",
              loc: [45, 24, 45, 25],
              value: 1,
            },
            {
              kind: "AstScriptNumericLiteral",
              loc: [45, 27, 45, 28],
              value: 2,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [46, 3, 46, 29],
        name: {
          kind: "AstScriptIdentifier",
          loc: [46, 9, 46, 10],
          text: "s",
          bindingKey: "s$2kc5czyfqafly$1",
        },
        initializer: {
          kind: "AstScriptNewExpression",
          loc: [46, 13, 46, 28],
          expression: {
            kind: "AstScriptSplice",
            loc: [46, 17, 46, 22],
            key: "$Size",
          },
          arguments: [
            {
              kind: "AstScriptNumericLiteral",
              loc: [46, 23, 46, 24],
              value: 3,
            },
            {
              kind: "AstScriptNumericLiteral",
              loc: [46, 26, 46, 27],
              value: 4,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [47, 3, 47, 28],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [47, 10, 47, 27],
          left: {
            kind: "AstScriptCallExpression",
            loc: [47, 10, 47, 17],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [47, 10, 47, 15],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [47, 10, 47, 11],
                text: "p",
                bindingKey: "p$2kc5czyfqafly$0",
              },
              questionDotToken: false,
              name: "sum",
            },
            questionDotToken: false,
            arguments: [],
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptCallExpression",
            loc: [47, 20, 47, 27],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [47, 20, 47, 25],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [47, 20, 47, 21],
                text: "s",
                bindingKey: "s$2kc5czyfqafly$1",
              },
              questionDotToken: false,
              name: "sum",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
      },
    ],
  }),
);
