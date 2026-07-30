import { cs } from "@backtickjs/core";
// A client-constructible class. The bundler expands the construction at
// bundle time: the constructor runs once with one opaque hole per
// argument, and the instance it returns is serialized with the holes marking
// where the client's argument values bind. The constructor parameters are
// `Client<…>`-typed to say exactly that: the values are opaque on the host —
// stored, never computed with — and exist only when the client runs.
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export default cs.create(
  [22, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "new-expression.ts",
    fileHash: "y9r0n74bbbwa",
    kind: "value",
    splices: { $Point: Point },
    captures: [],
    spliceParams: { $Point: [] },
  },
  () => ({
    kind: 242,
    loc: [22, 19, 25, 2],
    statements: [
      {
        kind: 261,
        loc: [23, 3, 23, 30],
        name: {
          kind: 80,
          loc: [23, 9, 23, 10],
          text: "p",
          bindingKey: "p$y9r0n74bbbwa$0",
        },
        initializer: {
          kind: 215,
          loc: [23, 13, 23, 29],
          expression: {
            kind: 1000,
            loc: [23, 17, 23, 23],
            key: "$Point",
          },
          arguments: [
            {
              kind: 9,
              loc: [23, 24, 23, 25],
              value: 1,
            },
            {
              kind: 9,
              loc: [23, 27, 23, 28],
              value: 2,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [24, 3, 24, 20],
        expression: {
          kind: 227,
          loc: [24, 10, 24, 19],
          left: {
            kind: 212,
            loc: [24, 10, 24, 13],
            expression: {
              kind: 80,
              loc: [24, 10, 24, 11],
              text: "p",
              bindingKey: "p$y9r0n74bbbwa$0",
            },
            questionDotToken: false,
            name: "x",
          },
          operatorToken: "+",
          right: {
            kind: 212,
            loc: [24, 16, 24, 19],
            expression: {
              kind: 80,
              loc: [24, 16, 24, 17],
              text: "p",
              bindingKey: "p$y9r0n74bbbwa$0",
            },
            questionDotToken: false,
            name: "y",
          },
        },
      },
    ],
  }),
);
