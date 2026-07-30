import { cs } from "@backtickjs/core";
class Circle {
  "@backtickjs" = "ClientObject";
  r;
  constructor(r) {
    this.r = r;
  }
}
class Square {
  "@backtickjs" = "ClientObject";
  side;
  constructor(side) {
    this.side = side;
  }
}
// ONE template, ONE source location — but each call splices a different
// class into it.
function make(Shape) {
  return cs.create(
    [23, 10, 23, 27],
    {
      version: "0.0.0",
      filePath: "shared-construction.ts",
      fileHash: "3cp3uvwlsfvqo",
      kind: "value",
      splices: { $Shape: Shape },
      captures: [],
      spliceParams: { $Shape: [] },
    },
    () => ({
      kind: "AstScriptNewExpression",
      loc: [23, 13, 23, 26],
      expression: {
        kind: "AstScriptSplice",
        loc: [23, 17, 23, 23],
        key: "$Shape",
      },
      arguments: [
        {
          kind: "AstScriptNumericLiteral",
          loc: [23, 24, 23, 25],
          value: 5,
        },
      ],
    }),
  );
}
const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);
export default cs.create(
  [31, 16, 33, 3],
  {
    version: "0.0.0",
    filePath: "shared-construction.ts",
    fileHash: "3cp3uvwlsfvqo",
    kind: "value",
    splices: { $a: a, $b: b, $c: c, $d: d },
    captures: [],
    spliceParams: { $a: [], $b: [], $c: [], $d: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [31, 19, 33, 2],
    statements: [
      {
        kind: "AstScriptReturnStatement",
        loc: [32, 3, 32, 59],
        expression: {
          kind: "AstScriptObjectLiteralExpression",
          loc: [32, 10, 32, 58],
          properties: [
            {
              kind: "AstScriptPropertyAssignment",
              loc: [32, 12, 32, 21],
              name: "first",
              initializer: {
                kind: "AstScriptSplice",
                loc: [32, 19, 32, 21],
                key: "$a",
              },
            },
            {
              kind: "AstScriptPropertyAssignment",
              loc: [32, 23, 32, 33],
              name: "second",
              initializer: {
                kind: "AstScriptSplice",
                loc: [32, 31, 32, 33],
                key: "$b",
              },
            },
            {
              kind: "AstScriptPropertyAssignment",
              loc: [32, 35, 32, 44],
              name: "third",
              initializer: {
                kind: "AstScriptSplice",
                loc: [32, 42, 32, 44],
                key: "$c",
              },
            },
            {
              kind: "AstScriptPropertyAssignment",
              loc: [32, 46, 32, 56],
              name: "fourth",
              initializer: {
                kind: "AstScriptSplice",
                loc: [32, 54, 32, 56],
                key: "$d",
              },
            },
          ],
        },
      },
    ],
  }),
);
