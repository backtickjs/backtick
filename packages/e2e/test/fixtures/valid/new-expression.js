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
  (v) =>
    v.block(
      [22, 19, 25, 2],
      [
        v.variableDeclaration(
          [23, 3, 23, 30],
          v.identifier([23, 9, 23, 10], "p", "p$y9r0n74bbbwa$0"),
          v.newExpression(
            [23, 13, 23, 29],
            v.splice([23, 17, 23, 23], "$Point"),
            [
              v.numericLiteral([23, 24, 23, 25], 1),
              v.numericLiteral([23, 27, 23, 28], 2),
            ],
          ),
          "const",
        ),
        v.returnStatement(
          [24, 3, 24, 20],
          v.binaryExpression(
            [24, 10, 24, 19],
            v.propertyAccessExpression(
              [24, 10, 24, 13],
              v.identifier([24, 10, 24, 11], "p", "p$y9r0n74bbbwa$0"),
              false,
              "x",
            ),
            "+",
            v.propertyAccessExpression(
              [24, 16, 24, 19],
              v.identifier([24, 16, 24, 17], "p", "p$y9r0n74bbbwa$0"),
              false,
              "y",
            ),
          ),
        ),
      ],
    ),
);
