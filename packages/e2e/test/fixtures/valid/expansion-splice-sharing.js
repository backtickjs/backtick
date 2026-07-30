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
      kind: 220,
      loc: [9, 13, 9, 26],
      parameters: [],
      body: {
        kind: 227,
        loc: [9, 19, 9, 26],
        left: {
          kind: 1000,
          loc: [9, 19, 9, 21],
          key: "$a",
        },
        operatorToken: "+",
        right: {
          kind: 1000,
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
    kind: 242,
    loc: [44, 19, 48, 2],
    statements: [
      {
        kind: 244,
        loc: [45, 3, 45, 30],
        declarationList: {
          kind: 262,
          loc: [45, 3, 45, 29],
          declarations: [
            {
              kind: 261,
              loc: [45, 9, 45, 29],
              name: {
                kind: 80,
                loc: [45, 9, 45, 10],
                text: "p",
                bindingKey: "p$2kc5czyfqafly$0",
              },
              initializer: {
                kind: 215,
                loc: [45, 13, 45, 29],
                expression: {
                  kind: 1000,
                  loc: [45, 17, 45, 23],
                  key: "$Point",
                },
                arguments: [
                  {
                    kind: 9,
                    loc: [45, 24, 45, 25],
                    value: 1,
                  },
                  {
                    kind: 9,
                    loc: [45, 27, 45, 28],
                    value: 2,
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 244,
        loc: [46, 3, 46, 29],
        declarationList: {
          kind: 262,
          loc: [46, 3, 46, 28],
          declarations: [
            {
              kind: 261,
              loc: [46, 9, 46, 28],
              name: {
                kind: 80,
                loc: [46, 9, 46, 10],
                text: "s",
                bindingKey: "s$2kc5czyfqafly$1",
              },
              initializer: {
                kind: 215,
                loc: [46, 13, 46, 28],
                expression: {
                  kind: 1000,
                  loc: [46, 17, 46, 22],
                  key: "$Size",
                },
                arguments: [
                  {
                    kind: 9,
                    loc: [46, 23, 46, 24],
                    value: 3,
                  },
                  {
                    kind: 9,
                    loc: [46, 26, 46, 27],
                    value: 4,
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [47, 3, 47, 28],
        expression: {
          kind: 227,
          loc: [47, 10, 47, 27],
          left: {
            kind: 214,
            loc: [47, 10, 47, 17],
            expression: {
              kind: 212,
              loc: [47, 10, 47, 15],
              expression: {
                kind: 80,
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
            kind: 214,
            loc: [47, 20, 47, 27],
            expression: {
              kind: 212,
              loc: [47, 20, 47, 25],
              expression: {
                kind: 80,
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
