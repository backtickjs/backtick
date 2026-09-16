import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one global. What it is, is the host's to answer; which members exist
// and what each means is the format's, which is why the list is short — only
// the members every host can agree on to the last bit are here.
it("math", async (t) => {
  await snapshotCase(
    t,
    "math",
    cs.create(
      [12, 5, 36, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/math.test.tsx",
        fileHash: "1j4uiiyebx17u",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 36, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 14, 75],
            name: {
              kind: "id",
              loc: [13, 13, 13, 20],
              text: "rounded",
              bindingKey: "rounded$1j4uiiyebx17u$0",
            },
            initializer: {
              kind: "binop",
              loc: [14, 9, 14, 74],
              left: {
                kind: "binop",
                loc: [14, 9, 14, 55],
                left: {
                  kind: "binop",
                  loc: [14, 9, 14, 49],
                  left: {
                    kind: "binop",
                    loc: [14, 9, 14, 30],
                    left: {
                      kind: "()",
                      loc: [14, 9, 14, 24],
                      expression: {
                        kind: "bltn",
                        loc: [14, 9, 14, 19],
                        name: "Math.round",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [14, 20, 14, 23],
                          value: 2.5,
                        },
                      ],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [14, 27, 14, 30],
                      text: ",",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [14, 33, 14, 49],
                    expression: {
                      kind: "bltn",
                      loc: [14, 33, 14, 43],
                      name: "Math.round",
                    },
                    arguments: [
                      {
                        kind: "unop",
                        loc: [14, 44, 14, 48],
                        operator: "-",
                        operand: {
                          kind: "number",
                          loc: [14, 45, 14, 48],
                          value: 2.5,
                        },
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [14, 52, 14, 55],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [14, 58, 14, 74],
                expression: {
                  kind: "bltn",
                  loc: [14, 58, 14, 68],
                  name: "Math.round",
                },
                arguments: [
                  {
                    kind: "unop",
                    loc: [14, 69, 14, 73],
                    operator: "-",
                    operand: {
                      kind: "number",
                      loc: [14, 70, 14, 73],
                      value: 0.5,
                    },
                  },
                ],
              },
            },
          },
          {
            kind: "const",
            loc: [15, 7, 16, 75],
            name: {
              kind: "id",
              loc: [15, 13, 15, 18],
              text: "edges",
              bindingKey: "edges$1j4uiiyebx17u$1",
            },
            initializer: {
              kind: "binop",
              loc: [16, 9, 16, 74],
              left: {
                kind: "binop",
                loc: [16, 9, 16, 55],
                left: {
                  kind: "binop",
                  loc: [16, 9, 16, 49],
                  left: {
                    kind: "binop",
                    loc: [16, 9, 16, 31],
                    left: {
                      kind: "()",
                      loc: [16, 9, 16, 25],
                      expression: {
                        kind: "bltn",
                        loc: [16, 9, 16, 19],
                        name: "Math.floor",
                      },
                      arguments: [
                        {
                          kind: "unop",
                          loc: [16, 20, 16, 24],
                          operator: "-",
                          operand: {
                            kind: "number",
                            loc: [16, 21, 16, 24],
                            value: 1.5,
                          },
                        },
                      ],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [16, 28, 16, 31],
                      text: ",",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [16, 34, 16, 49],
                    expression: {
                      kind: "bltn",
                      loc: [16, 34, 16, 43],
                      name: "Math.ceil",
                    },
                    arguments: [
                      {
                        kind: "unop",
                        loc: [16, 44, 16, 48],
                        operator: "-",
                        operand: {
                          kind: "number",
                          loc: [16, 45, 16, 48],
                          value: 1.5,
                        },
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [16, 52, 16, 55],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [16, 58, 16, 74],
                expression: {
                  kind: "bltn",
                  loc: [16, 58, 16, 68],
                  name: "Math.trunc",
                },
                arguments: [
                  {
                    kind: "unop",
                    loc: [16, 69, 16, 73],
                    operator: "-",
                    operand: {
                      kind: "number",
                      loc: [16, 70, 16, 73],
                      value: 1.5,
                    },
                  },
                ],
              },
            },
          },
          {
            kind: "const",
            loc: [17, 7, 18, 74],
            name: {
              kind: "id",
              loc: [17, 13, 17, 18],
              text: "picks",
              bindingKey: "picks$1j4uiiyebx17u$2",
            },
            initializer: {
              kind: "binop",
              loc: [18, 9, 18, 73],
              left: {
                kind: "binop",
                loc: [18, 9, 18, 58],
                left: {
                  kind: "binop",
                  loc: [18, 9, 18, 52],
                  left: {
                    kind: "binop",
                    loc: [18, 9, 18, 32],
                    left: {
                      kind: "()",
                      loc: [18, 9, 18, 26],
                      expression: {
                        kind: "bltn",
                        loc: [18, 9, 18, 17],
                        name: "Math.min",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [18, 18, 18, 19],
                          value: 3,
                        },
                        {
                          kind: "number",
                          loc: [18, 21, 18, 22],
                          value: 1,
                        },
                        {
                          kind: "number",
                          loc: [18, 24, 18, 25],
                          value: 2,
                        },
                      ],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [18, 29, 18, 32],
                      text: ",",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [18, 35, 18, 52],
                    expression: {
                      kind: "bltn",
                      loc: [18, 35, 18, 43],
                      name: "Math.max",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [18, 44, 18, 45],
                        value: 3,
                      },
                      {
                        kind: "number",
                        loc: [18, 47, 18, 48],
                        value: 1,
                      },
                      {
                        kind: "number",
                        loc: [18, 50, 18, 51],
                        value: 2,
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [18, 55, 18, 58],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [18, 61, 18, 73],
                expression: {
                  kind: "bltn",
                  loc: [18, 61, 18, 69],
                  name: "Math.abs",
                },
                arguments: [
                  {
                    kind: "unop",
                    loc: [18, 70, 18, 72],
                    operator: "-",
                    operand: {
                      kind: "number",
                      loc: [18, 71, 18, 72],
                      value: 4,
                    },
                  },
                ],
              },
            },
          },
          {
            kind: "return",
            loc: [19, 7, 35, 9],
            expression: {
              kind: "binop",
              loc: [20, 9, 34, 24],
              left: {
                kind: "binop",
                loc: [20, 9, 33, 12],
                left: {
                  kind: "binop",
                  loc: [20, 9, 32, 25],
                  left: {
                    kind: "binop",
                    loc: [20, 9, 31, 12],
                    left: {
                      kind: "binop",
                      loc: [20, 9, 30, 25],
                      left: {
                        kind: "binop",
                        loc: [20, 9, 29, 12],
                        left: {
                          kind: "binop",
                          loc: [20, 9, 28, 22],
                          left: {
                            kind: "binop",
                            loc: [20, 9, 27, 12],
                            left: {
                              kind: "binop",
                              loc: [20, 9, 26, 21],
                              left: {
                                kind: "binop",
                                loc: [20, 9, 25, 12],
                                left: {
                                  kind: "binop",
                                  loc: [20, 9, 24, 14],
                                  left: {
                                    kind: "binop",
                                    loc: [20, 9, 23, 12],
                                    left: {
                                      kind: "binop",
                                      loc: [20, 9, 22, 14],
                                      left: {
                                        kind: "binop",
                                        loc: [20, 9, 21, 12],
                                        left: {
                                          kind: "id",
                                          loc: [20, 9, 20, 16],
                                          text: "rounded",
                                          bindingKey: "rounded$1j4uiiyebx17u$0",
                                        },
                                        operatorToken: "+",
                                        right: {
                                          kind: "string",
                                          loc: [21, 9, 21, 12],
                                          text: "|",
                                        },
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [22, 9, 22, 14],
                                        text: "edges",
                                        bindingKey: "edges$1j4uiiyebx17u$1",
                                      },
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: "string",
                                      loc: [23, 9, 23, 12],
                                      text: "|",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "id",
                                    loc: [24, 9, 24, 14],
                                    text: "picks",
                                    bindingKey: "picks$1j4uiiyebx17u$2",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [25, 9, 25, 12],
                                  text: "|",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "()",
                                loc: [26, 9, 26, 21],
                                expression: {
                                  kind: "bltn",
                                  loc: [26, 9, 26, 18],
                                  name: "Math.sqrt",
                                },
                                arguments: [
                                  {
                                    kind: "number",
                                    loc: [26, 19, 26, 20],
                                    value: 9,
                                  },
                                ],
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [27, 9, 27, 12],
                              text: ",",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "()",
                            loc: [28, 9, 28, 22],
                            expression: {
                              kind: "bltn",
                              loc: [28, 9, 28, 18],
                              name: "Math.sign",
                            },
                            arguments: [
                              {
                                kind: "unop",
                                loc: [28, 19, 28, 21],
                                operator: "-",
                                operand: {
                                  kind: "number",
                                  loc: [28, 20, 28, 21],
                                  value: 8,
                                },
                              },
                            ],
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [29, 9, 29, 12],
                          text: ",",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [30, 9, 30, 25],
                        expression: {
                          kind: "bltn",
                          loc: [30, 9, 30, 20],
                          name: "Math.fround",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [30, 21, 30, 24],
                            value: 1.5,
                          },
                        ],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [31, 9, 31, 12],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "binop",
                    loc: [32, 10, 32, 24],
                    left: {
                      kind: "bltn",
                      loc: [32, 10, 32, 17],
                      name: "Math.PI",
                    },
                    operatorToken: ">",
                    right: {
                      kind: "number",
                      loc: [32, 20, 32, 24],
                      value: 3.14,
                    },
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [33, 9, 33, 12],
                  text: ",",
                },
              },
              operatorToken: "+",
              right: {
                kind: "binop",
                loc: [34, 10, 34, 23],
                left: {
                  kind: "bltn",
                  loc: [34, 10, 34, 16],
                  name: "Math.E",
                },
                operatorToken: ">",
                right: {
                  kind: "number",
                  loc: [34, 19, 34, 23],
                  value: 2.71,
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
