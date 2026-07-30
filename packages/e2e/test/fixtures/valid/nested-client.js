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
        filePath: "nested-client.ts",
        fileHash: "3b7boqu5f3cse",
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
}
// A client object nested inside another: `Segment` holds `Point` fragments,
// so the script reaches `s.to.sum` two levels deep.
class Segment {
  "@backtickjs" = "ClientObject";
  from;
  to;
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}
export default cs.create(
  [34, 16, 37, 3],
  {
    version: "0.0.0",
    filePath: "nested-client.ts",
    fileHash: "3b7boqu5f3cse",
    kind: "value",
    splices: { $Segment: Segment, $Point: Point },
    captures: [],
    spliceParams: { $Segment: [], $Point: [] },
  },
  () => ({
    kind: 242,
    loc: [34, 19, 37, 2],
    statements: [
      {
        kind: 244,
        loc: [35, 3, 35, 62],
        declarationList: {
          kind: 262,
          loc: [35, 3, 35, 61],
          declarations: [
            {
              kind: 261,
              loc: [35, 9, 35, 61],
              name: {
                kind: 80,
                loc: [35, 9, 35, 10],
                text: "s",
                bindingKey: "s$3b7boqu5f3cse$0",
              },
              initializer: {
                kind: 215,
                loc: [35, 13, 35, 61],
                expression: {
                  kind: 1000,
                  loc: [35, 17, 35, 25],
                  key: "$Segment",
                },
                arguments: [
                  {
                    kind: 215,
                    loc: [35, 26, 35, 42],
                    expression: {
                      kind: 1000,
                      loc: [35, 30, 35, 36],
                      key: "$Point",
                    },
                    arguments: [
                      {
                        kind: 9,
                        loc: [35, 37, 35, 38],
                        value: 1,
                      },
                      {
                        kind: 9,
                        loc: [35, 40, 35, 41],
                        value: 2,
                      },
                    ],
                  },
                  {
                    kind: 215,
                    loc: [35, 44, 35, 60],
                    expression: {
                      kind: 1000,
                      loc: [35, 48, 35, 54],
                      key: "$Point",
                    },
                    arguments: [
                      {
                        kind: 9,
                        loc: [35, 55, 35, 56],
                        value: 1,
                      },
                      {
                        kind: 9,
                        loc: [35, 58, 35, 59],
                        value: 2,
                      },
                    ],
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [36, 3, 36, 36],
        expression: {
          kind: 227,
          loc: [36, 10, 36, 35],
          left: {
            kind: 214,
            loc: [36, 10, 36, 20],
            expression: {
              kind: 212,
              loc: [36, 10, 36, 18],
              expression: {
                kind: 212,
                loc: [36, 10, 36, 14],
                expression: {
                  kind: 80,
                  loc: [36, 10, 36, 11],
                  text: "s",
                  bindingKey: "s$3b7boqu5f3cse$0",
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
            kind: 214,
            loc: [36, 23, 36, 35],
            expression: {
              kind: 212,
              loc: [36, 23, 36, 33],
              expression: {
                kind: 212,
                loc: [36, 23, 36, 29],
                expression: {
                  kind: 80,
                  loc: [36, 23, 36, 24],
                  text: "s",
                  bindingKey: "s$3b7boqu5f3cse$0",
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
