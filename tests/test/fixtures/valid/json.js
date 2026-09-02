import { cs } from "@backtickjs/core";
// Text in, value out, and back again. What round-trips is the format's to say —
// so what is here is what every host spells the same way, and a value a host
// could not hand back is not a value this admits.
export default cs.create(
  [6, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "json.ts",
    fileHash: "39hmn3sz8gacq",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [6, 19, 25, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 45],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 44],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 7, 44],
              name: {
                kind: 80,
                loc: [7, 9, 7, 16],
                text: "numbers",
                bindingKey: "numbers$39hmn3sz8gacq$0",
              },
              initializer: {
                kind: 214,
                loc: [7, 19, 7, 44],
                expression: {
                  kind: 1001,
                  loc: [7, 19, 7, 33],
                  name: "JSON.stringify",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 210,
                    loc: [7, 34, 7, 43],
                    elements: [
                      {
                        kind: 9,
                        loc: [7, 35, 7, 36],
                        value: 1,
                      },
                      {
                        kind: 9,
                        loc: [7, 38, 7, 39],
                        value: 2,
                      },
                      {
                        kind: 9,
                        loc: [7, 41, 7, 42],
                        value: 3,
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
        kind: 244,
        loc: [8, 3, 8, 37],
        declarationList: {
          kind: 262,
          loc: [8, 3, 8, 36],
          declarations: [
            {
              kind: 261,
              loc: [8, 9, 8, 36],
              name: {
                kind: 80,
                loc: [8, 9, 8, 13],
                text: "text",
                bindingKey: "text$39hmn3sz8gacq$1",
              },
              initializer: {
                kind: 214,
                loc: [8, 16, 8, 36],
                expression: {
                  kind: 1001,
                  loc: [8, 16, 8, 30],
                  name: "JSON.stringify",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [8, 31, 8, 35],
                    text: "hi",
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
        loc: [9, 3, 9, 37],
        declarationList: {
          kind: 262,
          loc: [9, 3, 9, 36],
          declarations: [
            {
              kind: 261,
              loc: [9, 9, 9, 36],
              name: {
                kind: 80,
                loc: [9, 9, 9, 13],
                text: "flag",
                bindingKey: "flag$39hmn3sz8gacq$2",
              },
              initializer: {
                kind: 214,
                loc: [9, 16, 9, 36],
                expression: {
                  kind: 1001,
                  loc: [9, 16, 9, 30],
                  name: "JSON.stringify",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 112,
                    loc: [9, 31, 9, 35],
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
        loc: [10, 3, 10, 51],
        declarationList: {
          kind: 262,
          loc: [10, 3, 10, 50],
          declarations: [
            {
              kind: 261,
              loc: [10, 9, 10, 50],
              name: {
                kind: 80,
                loc: [10, 9, 10, 13],
                text: "held",
                bindingKey: "held$39hmn3sz8gacq$3",
              },
              initializer: {
                kind: 214,
                loc: [10, 16, 10, 50],
                expression: {
                  kind: 1001,
                  loc: [10, 16, 10, 30],
                  name: "JSON.stringify",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 211,
                    loc: [10, 31, 10, 49],
                    properties: [
                      {
                        kind: 304,
                        loc: [10, 33, 10, 37],
                        name: "a",
                        initializer: {
                          kind: 9,
                          loc: [10, 36, 10, 37],
                          value: 1,
                        },
                      },
                      {
                        kind: 304,
                        loc: [10, 39, 10, 47],
                        name: "b",
                        initializer: {
                          kind: 11,
                          loc: [10, 42, 10, 47],
                          text: "two",
                        },
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
        kind: 244,
        loc: [11, 3, 11, 36],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 35],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 35],
              name: {
                kind: 80,
                loc: [11, 9, 11, 13],
                text: "back",
                bindingKey: "back$39hmn3sz8gacq$4",
              },
              initializer: {
                kind: 214,
                loc: [11, 16, 11, 35],
                expression: {
                  kind: 1001,
                  loc: [11, 16, 11, 26],
                  name: "JSON.parse",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 80,
                    loc: [11, 27, 11, 34],
                    text: "numbers",
                    bindingKey: "numbers$39hmn3sz8gacq$0",
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
        loc: [12, 3, 24, 5],
        expression: {
          kind: 227,
          loc: [13, 5, 23, 37],
          left: {
            kind: 227,
            loc: [13, 5, 22, 8],
            left: {
              kind: 227,
              loc: [13, 5, 21, 25],
              left: {
                kind: 227,
                loc: [13, 5, 20, 8],
                left: {
                  kind: 227,
                  loc: [13, 5, 19, 9],
                  left: {
                    kind: 227,
                    loc: [13, 5, 18, 8],
                    left: {
                      kind: 227,
                      loc: [13, 5, 17, 9],
                      left: {
                        kind: 227,
                        loc: [13, 5, 16, 8],
                        left: {
                          kind: 227,
                          loc: [13, 5, 15, 9],
                          left: {
                            kind: 227,
                            loc: [13, 5, 14, 8],
                            left: {
                              kind: 80,
                              loc: [13, 5, 13, 12],
                              text: "numbers",
                              bindingKey: "numbers$39hmn3sz8gacq$0",
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
                            kind: 80,
                            loc: [15, 5, 15, 9],
                            text: "text",
                            bindingKey: "text$39hmn3sz8gacq$1",
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
                        kind: 80,
                        loc: [17, 5, 17, 9],
                        text: "flag",
                        bindingKey: "flag$39hmn3sz8gacq$2",
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
                    kind: 80,
                    loc: [19, 5, 19, 9],
                    text: "held",
                    bindingKey: "held$39hmn3sz8gacq$3",
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
                loc: [21, 5, 21, 25],
                expression: {
                  kind: 1001,
                  loc: [21, 5, 21, 19],
                  name: "JSON.stringify",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 80,
                    loc: [21, 20, 21, 24],
                    text: "back",
                    bindingKey: "back$39hmn3sz8gacq$4",
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: 11,
              loc: [22, 5, 22, 8],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [23, 5, 23, 37],
            expression: {
              kind: 1001,
              loc: [23, 5, 23, 19],
              name: "JSON.stringify",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 214,
                loc: [23, 20, 23, 36],
                expression: {
                  kind: 1001,
                  loc: [23, 20, 23, 30],
                  name: "JSON.parse",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 80,
                    loc: [23, 31, 23, 35],
                    text: "held",
                    bindingKey: "held$39hmn3sz8gacq$3",
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  }),
);
