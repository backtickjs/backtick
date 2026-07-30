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
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
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
class Segment {
  "@backtickjs" = "ClientObject";
  from;
  to;
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  get vertical() {
    return cs.create(
      [32, 12, 32, 53],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: { $0splice0: this.from.x, $0splice1: this.to.x },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
      },
      () => ({
        kind: "AstScriptArrowFunction",
        loc: [32, 15, 32, 52],
        parameters: [],
        body: {
          kind: "AstScriptBinaryExpression",
          loc: [32, 21, 32, 52],
          left: {
            kind: "AstScriptSplice",
            loc: [32, 21, 32, 35],
            key: "$0splice0",
          },
          operatorToken: "===",
          right: {
            kind: "AstScriptSplice",
            loc: [32, 40, 32, 52],
            key: "$0splice1",
          },
        },
      }),
    );
  }
}
const segment = new Segment(
  new Point(
    cs.create(
      [36, 39, 36, 44],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      () => ({
        kind: "AstScriptNumericLiteral",
        loc: [36, 42, 36, 43],
        value: 1,
      }),
    ),
    cs.create(
      [36, 46, 36, 51],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      () => ({
        kind: "AstScriptNumericLiteral",
        loc: [36, 49, 36, 50],
        value: 2,
      }),
    ),
  ),
  new Point(
    cs.create(
      [36, 64, 36, 69],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      () => ({
        kind: "AstScriptNumericLiteral",
        loc: [36, 67, 36, 68],
        value: 1,
      }),
    ),
    cs.create(
      [36, 71, 36, 76],
      {
        version: "0.0.0",
        filePath: "nested-reflected-client.ts",
        fileHash: "marvm6ddqnqk",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      () => ({
        kind: "AstScriptNumericLiteral",
        loc: [36, 74, 36, 75],
        value: 8,
      }),
    ),
  ),
);
export default cs.create(
  [38, 16, 45, 3],
  {
    version: "0.0.0",
    filePath: "nested-reflected-client.ts",
    fileHash: "marvm6ddqnqk",
    kind: "value",
    splices: { $segment: segment },
    captures: [],
    spliceParams: { $segment: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [38, 19, 45, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [39, 3, 39, 22],
        name: {
          kind: "AstScriptIdentifier",
          loc: [39, 9, 39, 10],
          text: "s",
          bindingKey: "s$marvm6ddqnqk$0",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [39, 13, 39, 21],
          key: "$segment",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [40, 3, 40, 34],
        name: {
          kind: "AstScriptIdentifier",
          loc: [40, 9, 40, 13],
          text: "rise",
          bindingKey: "rise$marvm6ddqnqk$1",
        },
        initializer: {
          kind: "AstScriptBinaryExpression",
          loc: [40, 16, 40, 33],
          left: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [40, 16, 40, 22],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [40, 16, 40, 20],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [40, 16, 40, 17],
                text: "s",
                bindingKey: "s$marvm6ddqnqk$0",
              },
              questionDotToken: false,
              name: "to",
            },
            questionDotToken: false,
            name: "y",
          },
          operatorToken: "-",
          right: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [40, 25, 40, 33],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [40, 25, 40, 31],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [40, 25, 40, 26],
                text: "s",
                bindingKey: "s$marvm6ddqnqk$0",
              },
              questionDotToken: false,
              name: "from",
            },
            questionDotToken: false,
            name: "y",
          },
        },
        keyword: "const",
      },
      {
        kind: "AstScriptIfStatement",
        loc: [41, 3, 43, 4],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [41, 7, 41, 19],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [41, 7, 41, 17],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [41, 7, 41, 8],
              text: "s",
              bindingKey: "s$marvm6ddqnqk$0",
            },
            questionDotToken: false,
            name: "vertical",
          },
          questionDotToken: false,
          arguments: [],
        },
        thenStatement: {
          kind: "AstScriptBlock",
          loc: [41, 21, 43, 4],
          statements: [
            {
              kind: "AstScriptReturnStatement",
              loc: [42, 5, 42, 17],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [42, 12, 42, 16],
                text: "rise",
                bindingKey: "rise$marvm6ddqnqk$1",
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [44, 3, 44, 36],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [44, 10, 44, 35],
          left: {
            kind: "AstScriptCallExpression",
            loc: [44, 10, 44, 20],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [44, 10, 44, 18],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [44, 10, 44, 14],
                expression: {
                  kind: "AstScriptIdentifier",
                  loc: [44, 10, 44, 11],
                  text: "s",
                  bindingKey: "s$marvm6ddqnqk$0",
                },
                questionDotToken: false,
                name: "to",
              },
              questionDotToken: false,
              name: "sum",
            },
            questionDotToken: false,
            arguments: [],
          },
          operatorToken: "-",
          right: {
            kind: "AstScriptCallExpression",
            loc: [44, 23, 44, 35],
            expression: {
              kind: "AstScriptPropertyAccessExpression",
              loc: [44, 23, 44, 33],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [44, 23, 44, 29],
                expression: {
                  kind: "AstScriptIdentifier",
                  loc: [44, 23, 44, 24],
                  text: "s",
                  bindingKey: "s$marvm6ddqnqk$0",
                },
                questionDotToken: false,
                name: "from",
              },
              questionDotToken: false,
              name: "sum",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
      },
    ],
  }),
);
