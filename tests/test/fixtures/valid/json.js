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
    kind: "{}",
    loc: [6, 19, 25, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 45],
        name: {
          kind: "id",
          loc: [7, 9, 7, 16],
          text: "numbers",
          bindingKey: "numbers$39hmn3sz8gacq$0",
        },
        initializer: {
          kind: "()",
          loc: [7, 19, 7, 44],
          expression: {
            kind: "bltn",
            loc: [7, 19, 7, 33],
            name: "JSON.stringify",
          },
          arguments: [
            {
              kind: "arr",
              loc: [7, 34, 7, 43],
              elements: [
                {
                  kind: "number",
                  loc: [7, 35, 7, 36],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [7, 38, 7, 39],
                  value: 2,
                },
                {
                  kind: "number",
                  loc: [7, 41, 7, 42],
                  value: 3,
                },
              ],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 37],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "text",
          bindingKey: "text$39hmn3sz8gacq$1",
        },
        initializer: {
          kind: "()",
          loc: [8, 16, 8, 36],
          expression: {
            kind: "bltn",
            loc: [8, 16, 8, 30],
            name: "JSON.stringify",
          },
          arguments: [
            {
              kind: "string",
              loc: [8, 31, 8, 35],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [9, 3, 9, 37],
        name: {
          kind: "id",
          loc: [9, 9, 9, 13],
          text: "flag",
          bindingKey: "flag$39hmn3sz8gacq$2",
        },
        initializer: {
          kind: "()",
          loc: [9, 16, 9, 36],
          expression: {
            kind: "bltn",
            loc: [9, 16, 9, 30],
            name: "JSON.stringify",
          },
          arguments: [
            {
              kind: "true",
              loc: [9, 31, 9, 35],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [10, 3, 10, 51],
        name: {
          kind: "id",
          loc: [10, 9, 10, 13],
          text: "held",
          bindingKey: "held$39hmn3sz8gacq$3",
        },
        initializer: {
          kind: "()",
          loc: [10, 16, 10, 50],
          expression: {
            kind: "bltn",
            loc: [10, 16, 10, 30],
            name: "JSON.stringify",
          },
          arguments: [
            {
              kind: "obj",
              loc: [10, 31, 10, 49],
              properties: [
                {
                  kind: ":",
                  loc: [10, 33, 10, 37],
                  name: "a",
                  initializer: {
                    kind: "number",
                    loc: [10, 36, 10, 37],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [10, 39, 10, 47],
                  name: "b",
                  initializer: {
                    kind: "string",
                    loc: [10, 42, 10, 47],
                    text: "two",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [11, 3, 11, 36],
        name: {
          kind: "id",
          loc: [11, 9, 11, 13],
          text: "back",
          bindingKey: "back$39hmn3sz8gacq$4",
        },
        initializer: {
          kind: "()",
          loc: [11, 16, 11, 35],
          expression: {
            kind: "bltn",
            loc: [11, 16, 11, 26],
            name: "JSON.parse",
          },
          arguments: [
            {
              kind: "id",
              loc: [11, 27, 11, 34],
              text: "numbers",
              bindingKey: "numbers$39hmn3sz8gacq$0",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 24, 5],
        expression: {
          kind: "binop",
          loc: [13, 5, 23, 37],
          left: {
            kind: "binop",
            loc: [13, 5, 22, 8],
            left: {
              kind: "binop",
              loc: [13, 5, 21, 25],
              left: {
                kind: "binop",
                loc: [13, 5, 20, 8],
                left: {
                  kind: "binop",
                  loc: [13, 5, 19, 9],
                  left: {
                    kind: "binop",
                    loc: [13, 5, 18, 8],
                    left: {
                      kind: "binop",
                      loc: [13, 5, 17, 9],
                      left: {
                        kind: "binop",
                        loc: [13, 5, 16, 8],
                        left: {
                          kind: "binop",
                          loc: [13, 5, 15, 9],
                          left: {
                            kind: "binop",
                            loc: [13, 5, 14, 8],
                            left: {
                              kind: "id",
                              loc: [13, 5, 13, 12],
                              text: "numbers",
                              bindingKey: "numbers$39hmn3sz8gacq$0",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [14, 5, 14, 8],
                              text: "|",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [15, 5, 15, 9],
                            text: "text",
                            bindingKey: "text$39hmn3sz8gacq$1",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [16, 5, 16, 8],
                          text: "|",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [17, 5, 17, 9],
                        text: "flag",
                        bindingKey: "flag$39hmn3sz8gacq$2",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [18, 5, 18, 8],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [19, 5, 19, 9],
                    text: "held",
                    bindingKey: "held$39hmn3sz8gacq$3",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [20, 5, 20, 8],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [21, 5, 21, 25],
                expression: {
                  kind: "bltn",
                  loc: [21, 5, 21, 19],
                  name: "JSON.stringify",
                },
                arguments: [
                  {
                    kind: "id",
                    loc: [21, 20, 21, 24],
                    text: "back",
                    bindingKey: "back$39hmn3sz8gacq$4",
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [22, 5, 22, 8],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [23, 5, 23, 37],
            expression: {
              kind: "bltn",
              loc: [23, 5, 23, 19],
              name: "JSON.stringify",
            },
            arguments: [
              {
                kind: "()",
                loc: [23, 20, 23, 36],
                expression: {
                  kind: "bltn",
                  loc: [23, 20, 23, 30],
                  name: "JSON.parse",
                },
                arguments: [
                  {
                    kind: "id",
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
