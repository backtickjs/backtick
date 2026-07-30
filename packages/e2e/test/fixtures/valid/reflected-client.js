import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get valid() {
    return cs.create(
      [16, 12, 16, 43],
      {
        version: "0.0.0",
        filePath: "reflected-client.ts",
        fileHash: "1n3zukooyw7a6",
        kind: "value",
        splices: { $0splice0: this.x, $0splice1: this.y },
        captures: [],
        spliceParams: { $0splice0: [], $0splice1: [] },
      },
      () => ({
        kind: 220,
        loc: [16, 15, 16, 42],
        parameters: [],
        body: {
          kind: 227,
          loc: [16, 21, 16, 42],
          left: {
            kind: 1000,
            loc: [16, 21, 16, 30],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: 1000,
            loc: [16, 33, 16, 42],
            key: "$0splice1",
          },
        },
      }),
    );
  }
  get invalid() {
    return;
  }
}
export default cs.create(
  [24, 16, 28, 3],
  {
    version: "0.0.0",
    filePath: "reflected-client.ts",
    fileHash: "1n3zukooyw7a6",
    kind: "action",
    splices: {
      $0splice0: new Point(
        cs.create(
          [25, 25, 25, 30],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [25, 28, 25, 29],
            value: 1,
          }),
        ),
        cs.create(
          [25, 32, 25, 37],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [25, 35, 25, 36],
            value: 2,
          }),
        ),
      ),
      $0splice1: new Point(
        cs.create(
          [26, 25, 26, 30],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [26, 28, 26, 29],
            value: 3,
          }),
        ),
        cs.create(
          [26, 32, 26, 37],
          {
            version: "0.0.0",
            filePath: "reflected-client.ts",
            fileHash: "1n3zukooyw7a6",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [26, 35, 26, 36],
            value: 4,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 242,
    loc: [24, 19, 28, 2],
    statements: [
      {
        kind: 261,
        loc: [25, 3, 25, 40],
        name: {
          kind: 80,
          loc: [25, 9, 25, 10],
          text: "a",
          bindingKey: "a$1n3zukooyw7a6$0",
        },
        initializer: {
          kind: 1000,
          loc: [25, 13, 25, 39],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [26, 3, 26, 40],
        name: {
          kind: 80,
          loc: [26, 9, 26, 10],
          text: "b",
          bindingKey: "b$1n3zukooyw7a6$1",
        },
        initializer: {
          kind: 1000,
          loc: [26, 13, 26, 39],
          key: "$0splice1",
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [27, 3, 27, 37],
        name: {
          kind: 80,
          loc: [27, 9, 27, 12],
          text: "sum",
          bindingKey: "sum$1n3zukooyw7a6$2",
        },
        initializer: {
          kind: 227,
          loc: [27, 15, 27, 36],
          left: {
            kind: 214,
            loc: [27, 15, 27, 24],
            expression: {
              kind: 212,
              loc: [27, 15, 27, 22],
              expression: {
                kind: 80,
                loc: [27, 15, 27, 16],
                text: "a",
                bindingKey: "a$1n3zukooyw7a6$0",
              },
              questionDotToken: false,
              name: "valid",
            },
            questionDotToken: false,
            arguments: [],
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [27, 27, 27, 36],
            expression: {
              kind: 212,
              loc: [27, 27, 27, 34],
              expression: {
                kind: 80,
                loc: [27, 27, 27, 28],
                text: "b",
                bindingKey: "b$1n3zukooyw7a6$1",
              },
              questionDotToken: false,
              name: "valid",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
        keyword: "const",
      },
    ],
  }),
);
