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
    version: "0.0.0",
    filePath: "field-client.ts",
    fileHash: "3o65fk6h8ba4e",
    kind: "value",
    splices: {
      $0splice0: new Color(
        cs.create(
          [19, 25, 19, 31],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [19, 28, 19, 30],
            value: 30,
          }),
        ),
        cs.create(
          [19, 33, 19, 40],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [19, 36, 19, 39],
            value: 144,
          }),
        ),
        cs.create(
          [19, 42, 19, 49],
          {
            version: "0.0.0",
            filePath: "field-client.ts",
            fileHash: "3o65fk6h8ba4e",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [19, 45, 19, 48],
            value: 255,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 242,
    loc: [18, 19, 25, 2],
    statements: [
      {
        kind: 261,
        loc: [19, 3, 19, 52],
        name: {
          kind: 80,
          loc: [19, 9, 19, 10],
          text: "c",
          bindingKey: "c$3o65fk6h8ba4e$0",
        },
        initializer: {
          kind: 1000,
          loc: [19, 13, 19, 51],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [20, 3, 20, 38],
        name: {
          kind: 80,
          loc: [20, 9, 20, 19],
          text: "brightness",
          bindingKey: "brightness$3o65fk6h8ba4e$1",
        },
        initializer: {
          kind: 227,
          loc: [20, 22, 20, 37],
          left: {
            kind: 227,
            loc: [20, 22, 20, 31],
            left: {
              kind: 212,
              loc: [20, 22, 20, 25],
              expression: {
                kind: 80,
                loc: [20, 22, 20, 23],
                text: "c",
                bindingKey: "c$3o65fk6h8ba4e$0",
              },
              questionDotToken: false,
              name: "r",
            },
            operatorToken: "+",
            right: {
              kind: 212,
              loc: [20, 28, 20, 31],
              expression: {
                kind: 80,
                loc: [20, 28, 20, 29],
                text: "c",
                bindingKey: "c$3o65fk6h8ba4e$0",
              },
              questionDotToken: false,
              name: "g",
            },
          },
          operatorToken: "+",
          right: {
            kind: 212,
            loc: [20, 34, 20, 37],
            expression: {
              kind: 80,
              loc: [20, 34, 20, 35],
              text: "c",
              bindingKey: "c$3o65fk6h8ba4e$0",
            },
            questionDotToken: false,
            name: "b",
          },
        },
        keyword: "const",
      },
      {
        kind: 246,
        loc: [21, 3, 23, 4],
        expression: {
          kind: 227,
          loc: [21, 7, 21, 23],
          left: {
            kind: 80,
            loc: [21, 7, 21, 17],
            text: "brightness",
            bindingKey: "brightness$3o65fk6h8ba4e$1",
          },
          operatorToken: ">",
          right: {
            kind: 9,
            loc: [21, 20, 21, 23],
            value: 382,
          },
        },
        thenStatement: {
          kind: 242,
          loc: [21, 25, 23, 4],
          statements: [
            {
              kind: 254,
              loc: [22, 5, 22, 20],
              expression: {
                kind: 11,
                loc: [22, 12, 22, 19],
                text: "light",
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: 254,
        loc: [24, 3, 24, 17],
        expression: {
          kind: 11,
          loc: [24, 10, 24, 16],
          text: "dark",
        },
      },
    ],
  }),
);
