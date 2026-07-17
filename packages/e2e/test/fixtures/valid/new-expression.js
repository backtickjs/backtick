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
    filePath: "new-expression.ts",
    fileHash: "y9r0n74bbbwa",
    splices: { $Point: Point },
    captures: [],
    declarations: ["p$y9r0n74bbbwa$0"],
  },
  (v) =>
    v.block(
      [22, 19, 25, 2],
      [
        v.variableDeclaration(
          [23, 3, 23, 30],
          "const",
          v.identifier([23, 9, 23, 10], "p", "p$y9r0n74bbbwa$0"),
          v.new([23, 13, 23, 29], v.splice([23, 17, 23, 23], "$Point"), [
            v.number([23, 24, 23, 25], 1),
            v.number([23, 27, 23, 28], 2),
          ]),
        ),
        v.return(
          [24, 3, 24, 20],
          v.binop(
            [24, 10, 24, 19],
            v.propertyAccess(
              [24, 10, 24, 13],
              v.identifier([24, 10, 24, 11], "p", "p$y9r0n74bbbwa$0"),
              "x",
            ),
            "+",
            v.propertyAccess(
              [24, 16, 24, 19],
              v.identifier([24, 16, 24, 17], "p", "p$y9r0n74bbbwa$0"),
              "y",
            ),
          ),
        ),
      ],
    ),
);
