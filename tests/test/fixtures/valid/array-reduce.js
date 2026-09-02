import { cs } from "@backtickjs/core";
// `reduce` takes its initial value, where the standard library lets it be left
// out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
export default cs.create(
  [7, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "array-reduce.ts",
    fileHash: "3lzby6qavzyep",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [7, 19, 20, 2],
    statements: [
      {
        kind: 244,
        loc: [8, 3, 8, 33],
        declarationList: {
          kind: 262,
          loc: [8, 3, 8, 32],
          declarations: [
            {
              kind: 261,
              loc: [8, 9, 8, 32],
              name: {
                kind: 80,
                loc: [8, 9, 8, 15],
                text: "prices",
                bindingKey: "prices$3lzby6qavzyep$0",
              },
              initializer: {
                kind: 210,
                loc: [8, 18, 8, 32],
                elements: [
                  {
                    kind: 9,
                    loc: [8, 19, 8, 22],
                    value: 4.5,
                  },
                  {
                    kind: 9,
                    loc: [8, 24, 8, 28],
                    value: 3.25,
                  },
                  {
                    kind: 9,
                    loc: [8, 30, 8, 31],
                    value: 2,
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
        loc: [9, 3, 9, 63],
        declarationList: {
          kind: 262,
          loc: [9, 3, 9, 62],
          declarations: [
            {
              kind: 261,
              loc: [9, 9, 9, 62],
              name: {
                kind: 80,
                loc: [9, 9, 9, 14],
                text: "total",
                bindingKey: "total$3lzby6qavzyep$1",
              },
              initializer: {
                kind: 214,
                loc: [9, 17, 9, 62],
                expression: {
                  kind: 212,
                  loc: [9, 17, 9, 30],
                  expression: {
                    kind: 80,
                    loc: [9, 17, 9, 23],
                    text: "prices",
                    bindingKey: "prices$3lzby6qavzyep$0",
                  },
                  questionDotToken: false,
                  name: "reduce",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [9, 31, 9, 58],
                    parameters: [
                      {
                        kind: 170,
                        loc: [9, 32, 9, 35],
                        name: {
                          kind: 80,
                          loc: [9, 32, 9, 35],
                          text: "sum",
                          bindingKey: "sum$3lzby6qavzyep$5",
                        },
                      },
                      {
                        kind: 170,
                        loc: [9, 37, 9, 42],
                        name: {
                          kind: 80,
                          loc: [9, 37, 9, 42],
                          text: "price",
                          bindingKey: "price$3lzby6qavzyep$6",
                        },
                      },
                    ],
                    body: {
                      kind: 227,
                      loc: [9, 47, 9, 58],
                      left: {
                        kind: 80,
                        loc: [9, 47, 9, 50],
                        text: "sum",
                        bindingKey: "sum$3lzby6qavzyep$5",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [9, 53, 9, 58],
                        text: "price",
                        bindingKey: "price$3lzby6qavzyep$6",
                      },
                    },
                  },
                  {
                    kind: 9,
                    loc: [9, 60, 9, 61],
                    value: 0,
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
        loc: [10, 3, 10, 33],
        declarationList: {
          kind: 262,
          loc: [10, 3, 10, 32],
          declarations: [
            {
              kind: 261,
              loc: [10, 9, 10, 32],
              name: {
                kind: 80,
                loc: [10, 9, 10, 14],
                text: "names",
                bindingKey: "names$3lzby6qavzyep$2",
              },
              initializer: {
                kind: 210,
                loc: [10, 17, 10, 32],
                elements: [
                  {
                    kind: 11,
                    loc: [10, 18, 10, 21],
                    text: "a",
                  },
                  {
                    kind: 11,
                    loc: [10, 23, 10, 26],
                    text: "b",
                  },
                  {
                    kind: 11,
                    loc: [10, 28, 10, 31],
                    text: "c",
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
        loc: [11, 3, 11, 75],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 74],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 74],
              name: {
                kind: 80,
                loc: [11, 9, 11, 15],
                text: "joined",
                bindingKey: "joined$3lzby6qavzyep$3",
              },
              initializer: {
                kind: 214,
                loc: [11, 18, 11, 74],
                expression: {
                  kind: 212,
                  loc: [11, 18, 11, 30],
                  expression: {
                    kind: 80,
                    loc: [11, 18, 11, 23],
                    text: "names",
                    bindingKey: "names$3lzby6qavzyep$2",
                  },
                  questionDotToken: false,
                  name: "reduce",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [11, 31, 11, 69],
                    parameters: [
                      {
                        kind: 170,
                        loc: [11, 32, 11, 35],
                        name: {
                          kind: 80,
                          loc: [11, 32, 11, 35],
                          text: "all",
                          bindingKey: "all$3lzby6qavzyep$7",
                        },
                      },
                      {
                        kind: 170,
                        loc: [11, 37, 11, 40],
                        name: {
                          kind: 80,
                          loc: [11, 37, 11, 40],
                          text: "one",
                          bindingKey: "one$3lzby6qavzyep$8",
                        },
                      },
                      {
                        kind: 170,
                        loc: [11, 42, 11, 47],
                        name: {
                          kind: 80,
                          loc: [11, 42, 11, 47],
                          text: "index",
                          bindingKey: "index$3lzby6qavzyep$9",
                        },
                      },
                    ],
                    body: {
                      kind: 227,
                      loc: [11, 52, 11, 69],
                      left: {
                        kind: 227,
                        loc: [11, 52, 11, 63],
                        left: {
                          kind: 80,
                          loc: [11, 52, 11, 55],
                          text: "all",
                          bindingKey: "all$3lzby6qavzyep$7",
                        },
                        operatorToken: "+",
                        right: {
                          kind: 80,
                          loc: [11, 58, 11, 63],
                          text: "index",
                          bindingKey: "index$3lzby6qavzyep$9",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [11, 66, 11, 69],
                        text: "one",
                        bindingKey: "one$3lzby6qavzyep$8",
                      },
                    },
                  },
                  {
                    kind: 11,
                    loc: [11, 71, 11, 73],
                    text: "",
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
        loc: [12, 3, 12, 30],
        declarationList: {
          kind: 262,
          loc: [12, 3, 12, 29],
          declarations: [
            {
              kind: 261,
              loc: [12, 9, 12, 29],
              name: {
                kind: 80,
                loc: [12, 9, 12, 14],
                text: "empty",
                bindingKey: "empty$3lzby6qavzyep$4",
              },
              initializer: {
                kind: 210,
                loc: [12, 27, 12, 29],
                elements: [],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [13, 3, 19, 5],
        expression: {
          kind: 227,
          loc: [14, 5, 18, 45],
          left: {
            kind: 227,
            loc: [14, 5, 17, 8],
            left: {
              kind: 227,
              loc: [14, 5, 16, 11],
              left: {
                kind: 227,
                loc: [14, 5, 15, 8],
                left: {
                  kind: 214,
                  loc: [14, 5, 14, 21],
                  expression: {
                    kind: 212,
                    loc: [14, 5, 14, 18],
                    expression: {
                      kind: 80,
                      loc: [14, 5, 14, 10],
                      text: "total",
                      bindingKey: "total$3lzby6qavzyep$1",
                    },
                    questionDotToken: false,
                    name: "toFixed",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [14, 19, 14, 20],
                      value: 2,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: 11,
                  loc: [15, 5, 15, 8],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: 80,
                loc: [16, 5, 16, 11],
                text: "joined",
                bindingKey: "joined$3lzby6qavzyep$3",
              },
            },
            operatorToken: "+",
            right: {
              kind: 11,
              loc: [17, 5, 17, 8],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [18, 5, 18, 45],
            expression: {
              kind: 212,
              loc: [18, 5, 18, 17],
              expression: {
                kind: 80,
                loc: [18, 5, 18, 10],
                text: "empty",
                bindingKey: "empty$3lzby6qavzyep$4",
              },
              questionDotToken: false,
              name: "reduce",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [18, 18, 18, 41],
                parameters: [
                  {
                    kind: 170,
                    loc: [18, 19, 18, 22],
                    name: {
                      kind: 80,
                      loc: [18, 19, 18, 22],
                      text: "sum",
                      bindingKey: "sum$3lzby6qavzyep$10",
                    },
                  },
                  {
                    kind: 170,
                    loc: [18, 24, 18, 27],
                    name: {
                      kind: 80,
                      loc: [18, 24, 18, 27],
                      text: "one",
                      bindingKey: "one$3lzby6qavzyep$11",
                    },
                  },
                ],
                body: {
                  kind: 227,
                  loc: [18, 32, 18, 41],
                  left: {
                    kind: 80,
                    loc: [18, 32, 18, 35],
                    text: "sum",
                    bindingKey: "sum$3lzby6qavzyep$10",
                  },
                  operatorToken: "+",
                  right: {
                    kind: 80,
                    loc: [18, 38, 18, 41],
                    text: "one",
                    bindingKey: "one$3lzby6qavzyep$11",
                  },
                },
              },
              {
                kind: 9,
                loc: [18, 43, 18, 44],
                value: 0,
              },
            ],
          },
        },
      },
    ],
  }),
);
