import { cs } from "@backtickjs/core";
// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number — `"0"` is a string, and
// no amount of it looking like a number changes that — and a plain object takes
// only a key its type names.
const point = { x: 1, y: 2 };
export default cs.create(
  [9, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "index-wrong-key.ts",
    fileHash: "2h9vfj6qbexsg",
    splices: { $point: point },
    captures: [],
    spliceParams: { $point: [] },
  },
  () => ({
    kind: 220,
    loc: [9, 19, 15, 2],
    parameters: [
      {
        kind: 170,
        loc: [9, 20, 9, 32],
        name: {
          kind: 80,
          loc: [9, 20, 9, 24],
          text: "name",
          bindingKey: "name$2h9vfj6qbexsg$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [9, 37, 15, 2],
      statements: [
        {
          kind: 244,
          loc: [10, 3, 10, 28],
          declarationList: {
            kind: 262,
            loc: [10, 3, 10, 27],
            declarations: [
              {
                kind: 261,
                loc: [10, 9, 10, 27],
                name: {
                  kind: 80,
                  loc: [10, 9, 10, 14],
                  text: "coins",
                  bindingKey: "coins$2h9vfj6qbexsg$1",
                },
                initializer: {
                  kind: 210,
                  loc: [10, 17, 10, 27],
                  elements: [
                    {
                      kind: 9,
                      loc: [10, 18, 10, 19],
                      value: 5,
                    },
                    {
                      kind: 9,
                      loc: [10, 21, 10, 23],
                      value: 31,
                    },
                    {
                      kind: 9,
                      loc: [10, 25, 10, 26],
                      value: 7,
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [11, 3, 11, 28],
          declarationList: {
            kind: 262,
            loc: [11, 3, 11, 27],
            declarations: [
              {
                kind: 261,
                loc: [11, 9, 11, 27],
                name: {
                  kind: 80,
                  loc: [11, 9, 11, 14],
                  text: "first",
                  bindingKey: "first$2h9vfj6qbexsg$2",
                },
                initializer: {
                  kind: 213,
                  loc: [11, 17, 11, 27],
                  expression: {
                    kind: 80,
                    loc: [11, 17, 11, 22],
                    text: "coins",
                    bindingKey: "coins$2h9vfj6qbexsg$1",
                  },
                  argumentExpression: {
                    kind: 11,
                    loc: [11, 23, 11, 26],
                    text: "0",
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [12, 3, 12, 29],
          declarationList: {
            kind: 262,
            loc: [12, 3, 12, 28],
            declarations: [
              {
                kind: 261,
                loc: [12, 9, 12, 28],
                name: {
                  kind: 80,
                  loc: [12, 9, 12, 14],
                  text: "wrong",
                  bindingKey: "wrong$2h9vfj6qbexsg$3",
                },
                initializer: {
                  kind: 213,
                  loc: [12, 17, 12, 28],
                  expression: {
                    kind: 80,
                    loc: [12, 17, 12, 22],
                    text: "coins",
                    bindingKey: "coins$2h9vfj6qbexsg$1",
                  },
                  argumentExpression: {
                    kind: 80,
                    loc: [12, 23, 12, 27],
                    text: "name",
                    bindingKey: "name$2h9vfj6qbexsg$0",
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [13, 3, 13, 30],
          declarationList: {
            kind: 262,
            loc: [13, 3, 13, 29],
            declarations: [
              {
                kind: 261,
                loc: [13, 9, 13, 29],
                name: {
                  kind: 80,
                  loc: [13, 9, 13, 14],
                  text: "which",
                  bindingKey: "which$2h9vfj6qbexsg$4",
                },
                initializer: {
                  kind: 213,
                  loc: [13, 17, 13, 29],
                  expression: {
                    kind: 1000,
                    loc: [13, 17, 13, 23],
                    key: "$point",
                  },
                  argumentExpression: {
                    kind: 80,
                    loc: [13, 24, 13, 28],
                    text: "name",
                    bindingKey: "name$2h9vfj6qbexsg$0",
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [14, 3, 14, 32],
          expression: {
            kind: 227,
            loc: [14, 10, 14, 31],
            left: {
              kind: 227,
              loc: [14, 10, 14, 23],
              left: {
                kind: 80,
                loc: [14, 10, 14, 15],
                text: "first",
                bindingKey: "first$2h9vfj6qbexsg$2",
              },
              operatorToken: "+",
              right: {
                kind: 80,
                loc: [14, 18, 14, 23],
                text: "wrong",
                bindingKey: "wrong$2h9vfj6qbexsg$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: 80,
              loc: [14, 26, 14, 31],
              text: "which",
              bindingKey: "which$2h9vfj6qbexsg$4",
            },
          },
        },
      ],
    },
  }),
);
