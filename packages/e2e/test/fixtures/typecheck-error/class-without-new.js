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
// A construction and a plain call lower identically — a spliced class is a
// function with holes by the time the client runs — so the typechecker is
// what keeps them apart: the virtual code types a spliced class as the
// class itself, and calling a constructor without `new` is a type error.
export default cs.create(
  [20, 16, 23, 3],
  {
    version: "0.0.0",
    filePath: "class-without-new.tsx",
    fileHash: "1n6hvxiblc91f",
    kind: "value",
    splices: { $Point: Point },
    captures: [],
    spliceParams: { $Point: [] },
  },
  () => ({
    kind: 242,
    loc: [20, 19, 23, 2],
    statements: [
      {
        kind: 261,
        loc: [21, 3, 21, 20],
        name: {
          kind: 80,
          loc: [21, 9, 21, 10],
          text: "C",
          bindingKey: "C$1n6hvxiblc91f$0",
        },
        initializer: {
          kind: 1000,
          loc: [21, 13, 21, 19],
          key: "$Point",
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [22, 3, 22, 18],
        expression: {
          kind: 214,
          loc: [22, 10, 22, 17],
          expression: {
            kind: 80,
            loc: [22, 10, 22, 11],
            text: "C",
            bindingKey: "C$1n6hvxiblc91f$0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 9,
              loc: [22, 12, 22, 13],
              value: 1,
            },
            {
              kind: 9,
              loc: [22, 15, 22, 16],
              value: 2,
            },
          ],
        },
      },
    ],
  }),
);
