import { cs } from "@backtickjs/core";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
export default cs.create(
  [5, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "array-members.ts",
    fileHash: "3kt9mhwly650i",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [5, 19, 18, 2],
    statements: [
      {
        kind: 244,
        loc: [6, 3, 6, 27],
        declarationList: {
          kind: 262,
          loc: [6, 3, 6, 26],
          declarations: [
            {
              kind: 261,
              loc: [6, 9, 6, 26],
              name: {
                kind: 80,
                loc: [6, 9, 6, 14],
                text: "coins",
                bindingKey: "coins$3kt9mhwly650i$0",
              },
              initializer: {
                kind: 210,
                loc: [6, 17, 6, 26],
                elements: [
                  {
                    kind: 9,
                    loc: [6, 18, 6, 19],
                    value: 1,
                  },
                  {
                    kind: 9,
                    loc: [6, 21, 6, 22],
                    value: 2,
                  },
                  {
                    kind: 9,
                    loc: [6, 24, 6, 25],
                    value: 3,
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
        loc: [7, 3, 7, 18],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 17],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 7, 17],
              name: {
                kind: 80,
                loc: [7, 9, 7, 13],
                text: "four",
                bindingKey: "four$3kt9mhwly650i$1",
              },
              initializer: {
                kind: 9,
                loc: [7, 16, 7, 17],
                value: 4,
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [8, 3, 17, 5],
        expression: {
          kind: 211,
          loc: [8, 10, 17, 4],
          properties: [
            {
              kind: 304,
              loc: [9, 5, 9, 24],
              name: "count",
              initializer: {
                kind: 212,
                loc: [9, 12, 9, 24],
                expression: {
                  kind: 80,
                  loc: [9, 12, 9, 17],
                  text: "coins",
                  bindingKey: "coins$3kt9mhwly650i$0",
                },
                questionDotToken: false,
                name: "length",
              },
            },
            {
              kind: 304,
              loc: [10, 5, 10, 30],
              name: "all",
              initializer: {
                kind: 214,
                loc: [10, 10, 10, 30],
                expression: {
                  kind: 212,
                  loc: [10, 10, 10, 22],
                  expression: {
                    kind: 80,
                    loc: [10, 10, 10, 15],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "concat",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 210,
                    loc: [10, 23, 10, 29],
                    elements: [
                      {
                        kind: 80,
                        loc: [10, 24, 10, 28],
                        text: "four",
                        bindingKey: "four$3kt9mhwly650i$1",
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [11, 5, 11, 28],
              name: "part",
              initializer: {
                kind: 214,
                loc: [11, 11, 11, 28],
                expression: {
                  kind: 212,
                  loc: [11, 11, 11, 22],
                  expression: {
                    kind: 80,
                    loc: [11, 11, 11, 16],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "slice",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [11, 23, 11, 24],
                    value: 0,
                  },
                  {
                    kind: 9,
                    loc: [11, 26, 11, 27],
                    value: 2,
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [12, 5, 12, 28],
              name: "where",
              initializer: {
                kind: 214,
                loc: [12, 12, 12, 28],
                expression: {
                  kind: 212,
                  loc: [12, 12, 12, 25],
                  expression: {
                    kind: 80,
                    loc: [12, 12, 12, 17],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "indexOf",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [12, 26, 12, 27],
                    value: 2,
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [13, 5, 13, 27],
              name: "has",
              initializer: {
                kind: 214,
                loc: [13, 10, 13, 27],
                expression: {
                  kind: 212,
                  loc: [13, 10, 13, 24],
                  expression: {
                    kind: 80,
                    loc: [13, 10, 13, 15],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "includes",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [13, 25, 13, 26],
                    value: 3,
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [14, 5, 14, 26],
              name: "text",
              initializer: {
                kind: 214,
                loc: [14, 11, 14, 26],
                expression: {
                  kind: 212,
                  loc: [14, 11, 14, 21],
                  expression: {
                    kind: 80,
                    loc: [14, 11, 14, 16],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "join",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [14, 22, 14, 25],
                    text: "-",
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [15, 5, 15, 37],
              name: "doubled",
              initializer: {
                kind: 214,
                loc: [15, 14, 15, 37],
                expression: {
                  kind: 212,
                  loc: [15, 14, 15, 23],
                  expression: {
                    kind: 80,
                    loc: [15, 14, 15, 19],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "map",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [15, 24, 15, 36],
                    parameters: [
                      {
                        kind: 170,
                        loc: [15, 25, 15, 26],
                        name: {
                          kind: 80,
                          loc: [15, 25, 15, 26],
                          text: "n",
                          bindingKey: "n$3kt9mhwly650i$2",
                        },
                      },
                    ],
                    body: {
                      kind: 227,
                      loc: [15, 31, 15, 36],
                      left: {
                        kind: 80,
                        loc: [15, 31, 15, 32],
                        text: "n",
                        bindingKey: "n$3kt9mhwly650i$2",
                      },
                      operatorToken: "*",
                      right: {
                        kind: 9,
                        loc: [15, 35, 15, 36],
                        value: 2,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: 304,
              loc: [16, 5, 16, 38],
              name: "small",
              initializer: {
                kind: 214,
                loc: [16, 12, 16, 38],
                expression: {
                  kind: 212,
                  loc: [16, 12, 16, 24],
                  expression: {
                    kind: 80,
                    loc: [16, 12, 16, 17],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  questionDotToken: false,
                  name: "filter",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [16, 25, 16, 37],
                    parameters: [
                      {
                        kind: 170,
                        loc: [16, 26, 16, 27],
                        name: {
                          kind: 80,
                          loc: [16, 26, 16, 27],
                          text: "n",
                          bindingKey: "n$3kt9mhwly650i$3",
                        },
                      },
                    ],
                    body: {
                      kind: 227,
                      loc: [16, 32, 16, 37],
                      left: {
                        kind: 80,
                        loc: [16, 32, 16, 33],
                        text: "n",
                        bindingKey: "n$3kt9mhwly650i$3",
                      },
                      operatorToken: "<",
                      right: {
                        kind: 9,
                        loc: [16, 36, 16, 37],
                        value: 3,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }),
);
