import { cs } from "@backtickjs/core";
// The one global. What it is, is the host's to answer; which members exist and
// what each means is the format's, which is why the list is short — only the
// members every host can agree on to the last bit are here.
export default cs.create(
  [6, 16, 30, 3],
  {
    version: "0.0.0",
    filePath: "math.ts",
    fileHash: "2jpa3l1icbr78",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 19, 30, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 8, 71],
        name: {
          kind: "id",
          loc: [7, 9, 7, 16],
          text: "rounded",
          bindingKey: "rounded$2jpa3l1icbr78$0",
        },
        initializer: {
          kind: "binop",
          loc: [8, 5, 8, 70],
          left: {
            kind: "binop",
            loc: [8, 5, 8, 51],
            left: {
              kind: "binop",
              loc: [8, 5, 8, 45],
              left: {
                kind: "binop",
                loc: [8, 5, 8, 26],
                left: {
                  kind: "()",
                  loc: [8, 5, 8, 20],
                  expression: {
                    kind: "bltn",
                    loc: [8, 5, 8, 15],
                    name: "Math.round",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [8, 16, 8, 19],
                      value: 2.5,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [8, 23, 8, 26],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [8, 29, 8, 45],
                expression: {
                  kind: "bltn",
                  loc: [8, 29, 8, 39],
                  name: "Math.round",
                },
                arguments: [
                  {
                    kind: "unop",
                    loc: [8, 40, 8, 44],
                    operator: "-",
                    operand: {
                      kind: "number",
                      loc: [8, 41, 8, 44],
                      value: 2.5,
                    },
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [8, 48, 8, 51],
              text: ",",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [8, 54, 8, 70],
            expression: {
              kind: "bltn",
              loc: [8, 54, 8, 64],
              name: "Math.round",
            },
            arguments: [
              {
                kind: "unop",
                loc: [8, 65, 8, 69],
                operator: "-",
                operand: {
                  kind: "number",
                  loc: [8, 66, 8, 69],
                  value: 0.5,
                },
              },
            ],
          },
        },
      },
      {
        kind: "const",
        loc: [9, 3, 10, 71],
        name: {
          kind: "id",
          loc: [9, 9, 9, 14],
          text: "edges",
          bindingKey: "edges$2jpa3l1icbr78$1",
        },
        initializer: {
          kind: "binop",
          loc: [10, 5, 10, 70],
          left: {
            kind: "binop",
            loc: [10, 5, 10, 51],
            left: {
              kind: "binop",
              loc: [10, 5, 10, 45],
              left: {
                kind: "binop",
                loc: [10, 5, 10, 27],
                left: {
                  kind: "()",
                  loc: [10, 5, 10, 21],
                  expression: {
                    kind: "bltn",
                    loc: [10, 5, 10, 15],
                    name: "Math.floor",
                  },
                  arguments: [
                    {
                      kind: "unop",
                      loc: [10, 16, 10, 20],
                      operator: "-",
                      operand: {
                        kind: "number",
                        loc: [10, 17, 10, 20],
                        value: 1.5,
                      },
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [10, 24, 10, 27],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [10, 30, 10, 45],
                expression: {
                  kind: "bltn",
                  loc: [10, 30, 10, 39],
                  name: "Math.ceil",
                },
                arguments: [
                  {
                    kind: "unop",
                    loc: [10, 40, 10, 44],
                    operator: "-",
                    operand: {
                      kind: "number",
                      loc: [10, 41, 10, 44],
                      value: 1.5,
                    },
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [10, 48, 10, 51],
              text: ",",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [10, 54, 10, 70],
            expression: {
              kind: "bltn",
              loc: [10, 54, 10, 64],
              name: "Math.trunc",
            },
            arguments: [
              {
                kind: "unop",
                loc: [10, 65, 10, 69],
                operator: "-",
                operand: {
                  kind: "number",
                  loc: [10, 66, 10, 69],
                  value: 1.5,
                },
              },
            ],
          },
        },
      },
      {
        kind: "const",
        loc: [11, 3, 12, 70],
        name: {
          kind: "id",
          loc: [11, 9, 11, 14],
          text: "picks",
          bindingKey: "picks$2jpa3l1icbr78$2",
        },
        initializer: {
          kind: "binop",
          loc: [12, 5, 12, 69],
          left: {
            kind: "binop",
            loc: [12, 5, 12, 54],
            left: {
              kind: "binop",
              loc: [12, 5, 12, 48],
              left: {
                kind: "binop",
                loc: [12, 5, 12, 28],
                left: {
                  kind: "()",
                  loc: [12, 5, 12, 22],
                  expression: {
                    kind: "bltn",
                    loc: [12, 5, 12, 13],
                    name: "Math.min",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [12, 14, 12, 15],
                      value: 3,
                    },
                    {
                      kind: "number",
                      loc: [12, 17, 12, 18],
                      value: 1,
                    },
                    {
                      kind: "number",
                      loc: [12, 20, 12, 21],
                      value: 2,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [12, 25, 12, 28],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [12, 31, 12, 48],
                expression: {
                  kind: "bltn",
                  loc: [12, 31, 12, 39],
                  name: "Math.max",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [12, 40, 12, 41],
                    value: 3,
                  },
                  {
                    kind: "number",
                    loc: [12, 43, 12, 44],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [12, 46, 12, 47],
                    value: 2,
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [12, 51, 12, 54],
              text: ",",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [12, 57, 12, 69],
            expression: {
              kind: "bltn",
              loc: [12, 57, 12, 65],
              name: "Math.abs",
            },
            arguments: [
              {
                kind: "unop",
                loc: [12, 66, 12, 68],
                operator: "-",
                operand: {
                  kind: "number",
                  loc: [12, 67, 12, 68],
                  value: 4,
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [13, 3, 29, 5],
        expression: {
          kind: "binop",
          loc: [14, 5, 28, 20],
          left: {
            kind: "binop",
            loc: [14, 5, 27, 8],
            left: {
              kind: "binop",
              loc: [14, 5, 26, 21],
              left: {
                kind: "binop",
                loc: [14, 5, 25, 8],
                left: {
                  kind: "binop",
                  loc: [14, 5, 24, 21],
                  left: {
                    kind: "binop",
                    loc: [14, 5, 23, 8],
                    left: {
                      kind: "binop",
                      loc: [14, 5, 22, 18],
                      left: {
                        kind: "binop",
                        loc: [14, 5, 21, 8],
                        left: {
                          kind: "binop",
                          loc: [14, 5, 20, 17],
                          left: {
                            kind: "binop",
                            loc: [14, 5, 19, 8],
                            left: {
                              kind: "binop",
                              loc: [14, 5, 18, 10],
                              left: {
                                kind: "binop",
                                loc: [14, 5, 17, 8],
                                left: {
                                  kind: "binop",
                                  loc: [14, 5, 16, 10],
                                  left: {
                                    kind: "binop",
                                    loc: [14, 5, 15, 8],
                                    left: {
                                      kind: "id",
                                      loc: [14, 5, 14, 12],
                                      text: "rounded",
                                      bindingKey: "rounded$2jpa3l1icbr78$0",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: "string",
                                      loc: [15, 5, 15, 8],
                                      text: "|",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "id",
                                    loc: [16, 5, 16, 10],
                                    text: "edges",
                                    bindingKey: "edges$2jpa3l1icbr78$1",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [17, 5, 17, 8],
                                  text: "|",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [18, 5, 18, 10],
                                text: "picks",
                                bindingKey: "picks$2jpa3l1icbr78$2",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [19, 5, 19, 8],
                              text: "|",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "()",
                            loc: [20, 5, 20, 17],
                            expression: {
                              kind: "bltn",
                              loc: [20, 5, 20, 14],
                              name: "Math.sqrt",
                            },
                            arguments: [
                              {
                                kind: "number",
                                loc: [20, 15, 20, 16],
                                value: 9,
                              },
                            ],
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [21, 5, 21, 8],
                          text: ",",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [22, 5, 22, 18],
                        expression: {
                          kind: "bltn",
                          loc: [22, 5, 22, 14],
                          name: "Math.sign",
                        },
                        arguments: [
                          {
                            kind: "unop",
                            loc: [22, 15, 22, 17],
                            operator: "-",
                            operand: {
                              kind: "number",
                              loc: [22, 16, 22, 17],
                              value: 8,
                            },
                          },
                        ],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [23, 5, 23, 8],
                      text: ",",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [24, 5, 24, 21],
                    expression: {
                      kind: "bltn",
                      loc: [24, 5, 24, 16],
                      name: "Math.fround",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [24, 17, 24, 20],
                        value: 1.5,
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [25, 5, 25, 8],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "binop",
                loc: [26, 6, 26, 20],
                left: {
                  kind: "bltn",
                  loc: [26, 6, 26, 13],
                  name: "Math.PI",
                },
                operatorToken: ">",
                right: {
                  kind: "number",
                  loc: [26, 16, 26, 20],
                  value: 3.14,
                },
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [27, 5, 27, 8],
              text: ",",
            },
          },
          operatorToken: "+",
          right: {
            kind: "binop",
            loc: [28, 6, 28, 19],
            left: {
              kind: "bltn",
              loc: [28, 6, 28, 12],
              name: "Math.E",
            },
            operatorToken: ">",
            right: {
              kind: "number",
              loc: [28, 15, 28, 19],
              value: 2.71,
            },
          },
        },
      },
    ],
  }),
);
