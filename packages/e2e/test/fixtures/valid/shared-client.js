import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get sum() {
    return cs.create(
      [16, 12, 16, 43],
      {
        version: "0.0.0",
        filePath: "shared-client.ts",
        fileHash: "2dmd79xnh14ui",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
      },
      () => ({
        kind: "AstScriptArrowFunction",
        loc: [16, 15, 16, 42],
        parameters: [],
        body: {
          kind: "AstScriptBinaryExpression",
          loc: [16, 21, 16, 42],
          left: {
            kind: "AstScriptSplice",
            loc: [16, 21, 16, 30],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptSplice",
            loc: [16, 33, 16, 42],
            key: "$0splice1",
          },
        },
      }),
    );
  }
}
// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point(
  cs.create(
    [22, 26, 22, 31],
    {
      version: "0.0.0",
      filePath: "shared-client.ts",
      fileHash: "2dmd79xnh14ui",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: "AstScriptNumericLiteral",
      loc: [22, 29, 22, 30],
      value: 1,
    }),
  ),
  cs.create(
    [22, 33, 22, 38],
    {
      version: "0.0.0",
      filePath: "shared-client.ts",
      fileHash: "2dmd79xnh14ui",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: "AstScriptNumericLiteral",
      loc: [22, 36, 22, 37],
      value: 2,
    }),
  ),
);
const left = cs.create(
  [24, 14, 27, 3],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $shared: shared },
    captures: [],
    spliceParams: { $shared: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [24, 17, 27, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [25, 3, 25, 21],
        name: {
          kind: "AstScriptIdentifier",
          loc: [25, 9, 25, 10],
          text: "p",
          bindingKey: "p$2dmd79xnh14ui$0",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [25, 13, 25, 20],
          key: "$shared",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [26, 3, 26, 18],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [26, 10, 26, 17],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [26, 10, 26, 15],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [26, 10, 26, 11],
              text: "p",
              bindingKey: "p$2dmd79xnh14ui$0",
            },
            questionDotToken: false,
            name: "sum",
          },
          questionDotToken: false,
          arguments: [],
        },
      },
    ],
  }),
);
const right = cs.create(
  [29, 15, 32, 3],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $shared: shared },
    captures: [],
    spliceParams: { $shared: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [29, 18, 32, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [30, 3, 30, 21],
        name: {
          kind: "AstScriptIdentifier",
          loc: [30, 9, 30, 10],
          text: "p",
          bindingKey: "p$2dmd79xnh14ui$1",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [30, 13, 30, 20],
          key: "$shared",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [31, 3, 31, 14],
        expression: {
          kind: "AstScriptPropertyAccessExpression",
          loc: [31, 10, 31, 13],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [31, 10, 31, 11],
            text: "p",
            bindingKey: "p$2dmd79xnh14ui$1",
          },
          questionDotToken: false,
          name: "x",
        },
      },
    ],
  }),
);
export default cs.create(
  [34, 16, 34, 34],
  {
    version: "0.0.0",
    filePath: "shared-client.ts",
    fileHash: "2dmd79xnh14ui",
    kind: "value",
    splices: { $left: left, $right: right },
    captures: [],
    spliceParams: { $left: [], $right: [] },
  },
  () => ({
    kind: "AstScriptBinaryExpression",
    loc: [34, 19, 34, 33],
    left: {
      kind: "AstScriptSplice",
      loc: [34, 19, 34, 24],
      key: "$left",
    },
    operatorToken: "+",
    right: {
      kind: "AstScriptSplice",
      loc: [34, 27, 34, 33],
      key: "$right",
    },
  }),
);
