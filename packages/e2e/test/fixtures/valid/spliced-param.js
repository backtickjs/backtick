import { cs } from "@backtickjs/core";
// A script parameter annotated with the host class directly: the spliced
// argument stays typed `Color`, and member access virtualizes — `c.r` reads
// the `Client<number>` field as `number` — so the natural spelling checks.
class Color {
  "@backtickjs" = "ClientObject";
  r;
  hex;
  constructor(r, hex) {
    this.r = r;
    this.hex = hex;
  }
  get update() {
    return cs.create(
      [19, 12, 19, 35],
      {
        filePath: "spliced-param.ts",
        fileHash: "22eb8gy7ghfko",
        splices: { $0splice0: this.r },
        captures: [],
        declarations: [],
      },
      (v) =>
        v.arrow(
          [19, 15, 19, 34],
          [],
          v.binop(
            [19, 21, 19, 34],
            v.splice([19, 21, 19, 30], "$0splice0"),
            "+",
            v.number([19, 33, 19, 34], 2),
          ),
        ),
    );
  }
}
export default cs.create(
  [23, 16, 26, 3],
  {
    filePath: "spliced-param.ts",
    fileHash: "22eb8gy7ghfko",
    splices: {
      $0splice0: new Color(
        cs.create(
          [25, 27, 25, 32],
          {
            filePath: "spliced-param.ts",
            fileHash: "22eb8gy7ghfko",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([25, 30, 25, 31], 7),
        ),
        "#123",
      ),
    },
    captures: [],
    declarations: ["pick$22eb8gy7ghfko$0", "c$22eb8gy7ghfko$1"],
  },
  (v) =>
    v.block(
      [23, 19, 26, 2],
      [
        v.variableDeclaration(
          [24, 3, 24, 38],
          "const",
          v.identifier([24, 9, 24, 13], "pick", "pick$22eb8gy7ghfko$0"),
          v.arrow(
            [24, 16, 24, 37],
            [v.identifier([24, 17, 24, 18], "c", "c$22eb8gy7ghfko$1")],
            v.binop(
              [24, 30, 24, 37],
              v.propertyAccess(
                [24, 30, 24, 33],
                v.identifier([24, 30, 24, 31], "c", "c$22eb8gy7ghfko$1"),
                "r",
              ),
              "+",
              v.number([24, 36, 24, 37], 1),
            ),
          ),
        ),
        v.return(
          [25, 3, 25, 44],
          v.call(
            [25, 10, 25, 43],
            v.identifier([25, 10, 25, 14], "pick", "pick$22eb8gy7ghfko$0"),
            [v.splice([25, 15, 25, 42], "$0splice0")],
          ),
        ),
      ],
    ),
);
