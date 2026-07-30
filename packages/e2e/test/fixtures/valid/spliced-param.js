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
      () => ({
        kind: 220,
        loc: [19, 15, 19, 34],
        parameters: [],
        body: {
          kind: 227,
          loc: [19, 21, 19, 34],
          left: {
            kind: 1000,
            loc: [19, 21, 19, 30],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: 9,
            loc: [19, 33, 19, 34],
            value: 2,
          },
        },
      }),
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
          () => ({
            kind: 9,
            loc: [25, 30, 25, 31],
            value: 7,
          }),
        ),
        "#123",
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 242,
    loc: [23, 19, 26, 2],
    statements: [
      {
        kind: 261,
        loc: [24, 3, 24, 38],
        name: {
          kind: 80,
          loc: [24, 9, 24, 13],
          text: "pick",
          bindingKey: "pick$22eb8gy7ghfko$0",
        },
        initializer: {
          kind: 220,
          loc: [24, 16, 24, 37],
          parameters: [
            {
              kind: 170,
              loc: [24, 17, 24, 25],
              name: {
                kind: 80,
                loc: [24, 17, 24, 18],
                text: "c",
                bindingKey: "c$22eb8gy7ghfko$1",
              },
            },
          ],
          body: {
            kind: 227,
            loc: [24, 30, 24, 37],
            left: {
              kind: 212,
              loc: [24, 30, 24, 33],
              expression: {
                kind: 80,
                loc: [24, 30, 24, 31],
                text: "c",
                bindingKey: "c$22eb8gy7ghfko$1",
              },
              questionDotToken: false,
              name: "r",
            },
            operatorToken: "+",
            right: {
              kind: 9,
              loc: [24, 36, 24, 37],
              value: 1,
            },
          },
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [25, 3, 25, 44],
        expression: {
          kind: 214,
          loc: [25, 10, 25, 43],
          expression: {
            kind: 80,
            loc: [25, 10, 25, 14],
            text: "pick",
            bindingKey: "pick$22eb8gy7ghfko$0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 1000,
              loc: [25, 15, 25, 42],
              key: "$0splice0",
            },
          ],
        },
      },
    ],
  }),
);
