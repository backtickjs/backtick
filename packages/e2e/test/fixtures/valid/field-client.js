import { cs } from "@backtickjs/core";
class Color {
  "@backtickjs" = "ClientObject";
  r;
  g;
  b;
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
export default cs.create(
  [18, 16, 25, 3],
  {
    filePath: "field-client.ts",
    fileHash: "241uh6e4843k4",
    splices: {
      $0splice0: new Color(
        cs.create(
          [19, 25, 19, 31],
          {
            filePath: "field-client.ts",
            fileHash: "241uh6e4843k4",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([19, 28, 19, 30], 30),
        ),
        cs.create(
          [19, 33, 19, 40],
          {
            filePath: "field-client.ts",
            fileHash: "241uh6e4843k4",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([19, 36, 19, 39], 144),
        ),
        cs.create(
          [19, 42, 19, 49],
          {
            filePath: "field-client.ts",
            fileHash: "241uh6e4843k4",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([19, 45, 19, 48], 255),
        ),
      ),
    },
    captures: [],
    declarations: ["c$241uh6e4843k4$0", "brightness$241uh6e4843k4$1"],
  },
  (v) =>
    v.block(
      [18, 19, 25, 2],
      [
        v.variableDeclaration(
          [19, 3, 19, 52],
          "const",
          v.identifier([19, 9, 19, 10], "c", "c$241uh6e4843k4$0"),
          v.splice([19, 13, 19, 51], "$0splice0"),
        ),
        v.variableDeclaration(
          [20, 3, 20, 38],
          "const",
          v.identifier(
            [20, 9, 20, 19],
            "brightness",
            "brightness$241uh6e4843k4$1",
          ),
          v.binop(
            [20, 22, 20, 37],
            v.binop(
              [20, 22, 20, 31],
              v.propertyAccess(
                [20, 22, 20, 25],
                v.identifier([20, 22, 20, 23], "c", "c$241uh6e4843k4$0"),
                "r",
              ),
              "+",
              v.propertyAccess(
                [20, 28, 20, 31],
                v.identifier([20, 28, 20, 29], "c", "c$241uh6e4843k4$0"),
                "g",
              ),
            ),
            "+",
            v.propertyAccess(
              [20, 34, 20, 37],
              v.identifier([20, 34, 20, 35], "c", "c$241uh6e4843k4$0"),
              "b",
            ),
          ),
        ),
        v.if(
          [21, 3, 23, 4],
          v.binop(
            [21, 7, 21, 23],
            v.identifier(
              [21, 7, 21, 17],
              "brightness",
              "brightness$241uh6e4843k4$1",
            ),
            ">",
            v.number([21, 20, 21, 23], 382),
          ),
          v.block(
            [21, 25, 23, 4],
            [v.return([22, 5, 22, 20], v.string([22, 12, 22, 19], "light"))],
          ),
          null,
        ),
        v.return([24, 3, 24, 17], v.string([24, 10, 24, 16], "dark")),
      ],
    ),
);
