import { cs } from "@backtickjs/core";
// The copying members: each answers with a new array and leaves the one it was
// given alone, which is what lets an array be a value here. `sort`, `reverse`
// and `splice` — the ones that write into the array instead — are absent.
export default cs.create(
  [6, 16, 23, 3],
  {
    version: "0.0.0",
    filePath: "array-copying-members.ts",
    fileHash: "1a4hzwemnca39",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [6, 19, 23, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 26],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 25],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 7, 25],
              name: {
                kind: 80,
                loc: [7, 9, 7, 13],
                text: "rows",
                bindingKey: "rows$1a4hzwemnca39$0",
              },
              initializer: {
                kind: 210,
                loc: [7, 16, 7, 25],
                elements: [
                  {
                    kind: 9,
                    loc: [7, 17, 7, 18],
                    value: 3,
                  },
                  {
                    kind: 9,
                    loc: [7, 20, 7, 21],
                    value: 1,
                  },
                  {
                    kind: 9,
                    loc: [7, 23, 7, 24],
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
        loc: [8, 3, 8, 49],
        declarationList: {
          kind: 262,
          loc: [8, 3, 8, 48],
          declarations: [
            {
              kind: 261,
              loc: [8, 9, 8, 48],
              name: {
                kind: 80,
                loc: [8, 9, 8, 15],
                text: "sorted",
                bindingKey: "sorted$1a4hzwemnca39$1",
              },
              initializer: {
                kind: 214,
                loc: [8, 18, 8, 48],
                expression: {
                  kind: 212,
                  loc: [8, 18, 8, 31],
                  expression: {
                    kind: 80,
                    loc: [8, 18, 8, 22],
                    text: "rows",
                    bindingKey: "rows$1a4hzwemnca39$0",
                  },
                  questionDotToken: false,
                  name: "toSorted",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [8, 32, 8, 47],
                    parameters: [
                      {
                        kind: 170,
                        loc: [8, 33, 8, 34],
                        name: {
                          kind: 80,
                          loc: [8, 33, 8, 34],
                          text: "a",
                          bindingKey: "a$1a4hzwemnca39$5",
                        },
                      },
                      {
                        kind: 170,
                        loc: [8, 36, 8, 37],
                        name: {
                          kind: 80,
                          loc: [8, 36, 8, 37],
                          text: "b",
                          bindingKey: "b$1a4hzwemnca39$6",
                        },
                      },
                    ],
                    body: {
                      kind: 227,
                      loc: [8, 42, 8, 47],
                      left: {
                        kind: 80,
                        loc: [8, 42, 8, 43],
                        text: "a",
                        bindingKey: "a$1a4hzwemnca39$5",
                      },
                      operatorToken: "-",
                      right: {
                        kind: 80,
                        loc: [8, 46, 8, 47],
                        text: "b",
                        bindingKey: "b$1a4hzwemnca39$6",
                      },
                    },
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
        loc: [9, 3, 9, 38],
        declarationList: {
          kind: 262,
          loc: [9, 3, 9, 37],
          declarations: [
            {
              kind: 261,
              loc: [9, 9, 9, 37],
              name: {
                kind: 80,
                loc: [9, 9, 9, 17],
                text: "reversed",
                bindingKey: "reversed$1a4hzwemnca39$2",
              },
              initializer: {
                kind: 214,
                loc: [9, 20, 9, 37],
                expression: {
                  kind: 212,
                  loc: [9, 20, 9, 35],
                  expression: {
                    kind: 80,
                    loc: [9, 20, 9, 24],
                    text: "rows",
                    bindingKey: "rows$1a4hzwemnca39$0",
                  },
                  questionDotToken: false,
                  name: "toReversed",
                },
                questionDotToken: false,
                arguments: [],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 244,
        loc: [10, 3, 10, 40],
        declarationList: {
          kind: 262,
          loc: [10, 3, 10, 39],
          declarations: [
            {
              kind: 261,
              loc: [10, 9, 10, 39],
              name: {
                kind: 80,
                loc: [10, 9, 10, 16],
                text: "spliced",
                bindingKey: "spliced$1a4hzwemnca39$3",
              },
              initializer: {
                kind: 214,
                loc: [10, 19, 10, 39],
                expression: {
                  kind: 212,
                  loc: [10, 19, 10, 33],
                  expression: {
                    kind: 80,
                    loc: [10, 19, 10, 23],
                    text: "rows",
                    bindingKey: "rows$1a4hzwemnca39$0",
                  },
                  questionDotToken: false,
                  name: "toSpliced",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [10, 34, 10, 35],
                    value: 1,
                  },
                  {
                    kind: 9,
                    loc: [10, 37, 10, 38],
                    value: 1,
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
        loc: [11, 3, 11, 44],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 43],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 43],
              name: {
                kind: 80,
                loc: [11, 9, 11, 17],
                text: "inserted",
                bindingKey: "inserted$1a4hzwemnca39$4",
              },
              initializer: {
                kind: 214,
                loc: [11, 20, 11, 43],
                expression: {
                  kind: 212,
                  loc: [11, 20, 11, 34],
                  expression: {
                    kind: 80,
                    loc: [11, 20, 11, 24],
                    text: "rows",
                    bindingKey: "rows$1a4hzwemnca39$0",
                  },
                  questionDotToken: false,
                  name: "toSpliced",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [11, 35, 11, 36],
                    value: 1,
                  },
                  {
                    kind: 9,
                    loc: [11, 38, 11, 39],
                    value: 0,
                  },
                  {
                    kind: 9,
                    loc: [11, 41, 11, 42],
                    value: 9,
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
        loc: [12, 3, 22, 5],
        expression: {
          kind: 227,
          loc: [13, 5, 21, 19],
          left: {
            kind: 227,
            loc: [13, 5, 20, 8],
            left: {
              kind: 227,
              loc: [13, 5, 19, 23],
              left: {
                kind: 227,
                loc: [13, 5, 18, 8],
                left: {
                  kind: 227,
                  loc: [13, 5, 17, 22],
                  left: {
                    kind: 227,
                    loc: [13, 5, 16, 8],
                    left: {
                      kind: 227,
                      loc: [13, 5, 15, 23],
                      left: {
                        kind: 227,
                        loc: [13, 5, 14, 8],
                        left: {
                          kind: 214,
                          loc: [13, 5, 13, 21],
                          expression: {
                            kind: 212,
                            loc: [13, 5, 13, 16],
                            expression: {
                              kind: 80,
                              loc: [13, 5, 13, 11],
                              text: "sorted",
                              bindingKey: "sorted$1a4hzwemnca39$1",
                            },
                            questionDotToken: false,
                            name: "join",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 11,
                              loc: [13, 17, 13, 20],
                              text: ",",
                            },
                          ],
                        },
                        operatorToken: "+",
                        right: {
                          kind: 11,
                          loc: [14, 5, 14, 8],
                          text: "|",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: 214,
                        loc: [15, 5, 15, 23],
                        expression: {
                          kind: 212,
                          loc: [15, 5, 15, 18],
                          expression: {
                            kind: 80,
                            loc: [15, 5, 15, 13],
                            text: "reversed",
                            bindingKey: "reversed$1a4hzwemnca39$2",
                          },
                          questionDotToken: false,
                          name: "join",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 11,
                            loc: [15, 19, 15, 22],
                            text: ",",
                          },
                        ],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 11,
                      loc: [16, 5, 16, 8],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: 214,
                    loc: [17, 5, 17, 22],
                    expression: {
                      kind: 212,
                      loc: [17, 5, 17, 17],
                      expression: {
                        kind: 80,
                        loc: [17, 5, 17, 12],
                        text: "spliced",
                        bindingKey: "spliced$1a4hzwemnca39$3",
                      },
                      questionDotToken: false,
                      name: "join",
                    },
                    questionDotToken: false,
                    arguments: [
                      {
                        kind: 11,
                        loc: [17, 18, 17, 21],
                        text: ",",
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 11,
                  loc: [18, 5, 18, 8],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: 214,
                loc: [19, 5, 19, 23],
                expression: {
                  kind: 212,
                  loc: [19, 5, 19, 18],
                  expression: {
                    kind: 80,
                    loc: [19, 5, 19, 13],
                    text: "inserted",
                    bindingKey: "inserted$1a4hzwemnca39$4",
                  },
                  questionDotToken: false,
                  name: "join",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [19, 19, 19, 22],
                    text: ",",
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: 11,
              loc: [20, 5, 20, 8],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [21, 5, 21, 19],
            expression: {
              kind: 212,
              loc: [21, 5, 21, 14],
              expression: {
                kind: 80,
                loc: [21, 5, 21, 9],
                text: "rows",
                bindingKey: "rows$1a4hzwemnca39$0",
              },
              questionDotToken: false,
              name: "join",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 11,
                loc: [21, 15, 21, 18],
                text: ",",
              },
            ],
          },
        },
      },
    ],
  }),
);
