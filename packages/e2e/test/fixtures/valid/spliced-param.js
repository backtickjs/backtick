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
        version: "0.0.0",
        filePath: "spliced-param.ts",
        fileHash: "22eb8gy7ghfko",
        kind: "value",
        splices: { $0splice0: this.r },
        captures: [],
        spliceParams: { $0splice0: [] },
      },
      (v) =>
        v.arrowFunction(
          [19, 15, 19, 34],
          [],
          v.binaryExpression(
            [19, 21, 19, 34],
            v.splice([19, 21, 19, 30], "$0splice0"),
            "+",
            v.numericLiteral([19, 33, 19, 34], 2),
          ),
        ),
    );
  }
}
export default cs.create(
  [23, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "spliced-param.ts",
    fileHash: "22eb8gy7ghfko",
    kind: "value",
    splices: {
      $0splice0: new Color(
        cs.create(
          [25, 27, 25, 32],
          {
            version: "0.0.0",
            filePath: "spliced-param.ts",
            fileHash: "22eb8gy7ghfko",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([25, 30, 25, 31], 7),
        ),
        "#123",
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) =>
    v.block(
      [23, 19, 26, 2],
      [
        v.variableDeclaration(
          [24, 3, 24, 38],
          v.identifier([24, 9, 24, 13], "pick", "pick$22eb8gy7ghfko$0"),
          v.arrowFunction(
            [24, 16, 24, 37],
            [
              v.parameterDeclaration(
                [24, 17, 24, 25],
                v.identifier([24, 17, 24, 18], "c", "c$22eb8gy7ghfko$1"),
              ),
            ],
            v.binaryExpression(
              [24, 30, 24, 37],
              v.propertyAccessExpression(
                [24, 30, 24, 33],
                v.identifier([24, 30, 24, 31], "c", "c$22eb8gy7ghfko$1"),
                false,
                "r",
              ),
              "+",
              v.numericLiteral([24, 36, 24, 37], 1),
            ),
          ),
          "const",
        ),
        v.returnStatement(
          [25, 3, 25, 44],
          v.callExpression(
            [25, 10, 25, 43],
            v.identifier([25, 10, 25, 14], "pick", "pick$22eb8gy7ghfko$0"),
            false,
            [v.splice([25, 15, 25, 42], "$0splice0")],
          ),
        ),
      ],
    ),
);
