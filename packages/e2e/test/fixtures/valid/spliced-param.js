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
        kind: "AstScriptArrowFunction",
        loc: [19, 15, 19, 34],
        parameters: [],
        body: {
          kind: "AstScriptBinaryExpression",
          loc: [19, 21, 19, 34],
          left: {
            kind: "AstScriptSplice",
            loc: [19, 21, 19, 30],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptNumericLiteral",
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
            kind: "AstScriptNumericLiteral",
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
    kind: "AstScriptBlock",
    loc: [23, 19, 26, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [24, 3, 24, 38],
        name: {
          kind: "AstScriptIdentifier",
          loc: [24, 9, 24, 13],
          text: "pick",
          bindingKey: "pick$22eb8gy7ghfko$0",
        },
        initializer: {
          kind: "AstScriptArrowFunction",
          loc: [24, 16, 24, 37],
          parameters: [
            {
              kind: "AstScriptParameterDeclaration",
              loc: [24, 17, 24, 25],
              name: {
                kind: "AstScriptIdentifier",
                loc: [24, 17, 24, 18],
                text: "c",
                bindingKey: "c$22eb8gy7ghfko$1",
              },
            },
          ],
          body: {
            kind: "AstScriptBinaryExpression",
            loc: [24, 30, 24, 37],
            left: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [24, 30, 24, 33],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [24, 30, 24, 31],
                text: "c",
                bindingKey: "c$22eb8gy7ghfko$1",
              },
              questionDotToken: false,
              name: "r",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [24, 36, 24, 37],
              value: 1,
            },
          },
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [25, 3, 25, 44],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [25, 10, 25, 43],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [25, 10, 25, 14],
            text: "pick",
            bindingKey: "pick$22eb8gy7ghfko$0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptSplice",
              loc: [25, 15, 25, 42],
              key: "$0splice0",
            },
          ],
        },
      },
    ],
  }),
);
