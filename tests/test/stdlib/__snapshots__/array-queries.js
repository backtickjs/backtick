import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(
    t,
    "arrayQueries",
    cs.create(
      [12, 5, 24, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-queries.test.tsx",
        fileHash: "25lflsbo2zrha",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 24, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 34],
            name: {
              kind: "id",
              loc: [13, 13, 13, 18],
              text: "coins",
              bindingKey: "coins$25lflsbo2zrha$0",
            },
            initializer: {
              kind: "arr",
              loc: [13, 21, 13, 33],
              elements: [
                {
                  kind: "number",
                  loc: [13, 22, 13, 23],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [13, 25, 13, 26],
                  value: 2,
                },
                {
                  kind: "number",
                  loc: [13, 28, 13, 29],
                  value: 3,
                },
                {
                  kind: "number",
                  loc: [13, 31, 13, 32],
                  value: 4,
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [14, 7, 23, 9],
            expression: {
              kind: "obj",
              loc: [14, 14, 23, 8],
              properties: [
                {
                  kind: ":",
                  loc: [15, 9, 15, 53],
                  name: {
                    kind: "string",
                    loc: [15, 9, 15, 11],
                    text: "at",
                  },
                  initializer: {
                    kind: "arr",
                    loc: [15, 13, 15, 53],
                    elements: [
                      {
                        kind: "()",
                        loc: [15, 14, 15, 25],
                        expression: {
                          kind: ".",
                          loc: [15, 14, 15, 22],
                          expression: {
                            kind: "id",
                            loc: [15, 14, 15, 19],
                            text: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [15, 23, 15, 24],
                            value: 0,
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [15, 27, 15, 39],
                        expression: {
                          kind: ".",
                          loc: [15, 27, 15, 35],
                          expression: {
                            kind: "id",
                            loc: [15, 27, 15, 32],
                            text: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "prefixop",
                            loc: [15, 36, 15, 38],
                            operator: "-",
                            operand: {
                              kind: "number",
                              loc: [15, 37, 15, 38],
                              value: 1,
                            },
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [15, 41, 15, 52],
                        expression: {
                          kind: ".",
                          loc: [15, 41, 15, 49],
                          expression: {
                            kind: "id",
                            loc: [15, 41, 15, 46],
                            text: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [15, 50, 15, 51],
                            value: 9,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [16, 9, 16, 41],
                  name: {
                    kind: "string",
                    loc: [16, 9, 16, 14],
                    text: "every",
                  },
                  initializer: {
                    kind: "()",
                    loc: [16, 16, 16, 41],
                    expression: {
                      kind: ".",
                      loc: [16, 16, 16, 27],
                      expression: {
                        kind: "id",
                        loc: [16, 16, 16, 21],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "every",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [16, 28, 16, 40],
                        parameters: [
                          {
                            kind: "param",
                            loc: [16, 29, 16, 30],
                            name: {
                              kind: "id",
                              loc: [16, 29, 16, 30],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$1",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [16, 35, 16, 40],
                          left: {
                            kind: "id",
                            loc: [16, 35, 16, 36],
                            text: "n",
                            bindingKey: "n$25lflsbo2zrha$1",
                          },
                          operatorToken: ">",
                          right: {
                            kind: "number",
                            loc: [16, 39, 16, 40],
                            value: 0,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 39],
                  name: {
                    kind: "string",
                    loc: [17, 9, 17, 13],
                    text: "some",
                  },
                  initializer: {
                    kind: "()",
                    loc: [17, 15, 17, 39],
                    expression: {
                      kind: ".",
                      loc: [17, 15, 17, 25],
                      expression: {
                        kind: "id",
                        loc: [17, 15, 17, 20],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "some",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [17, 26, 17, 38],
                        parameters: [
                          {
                            kind: "param",
                            loc: [17, 27, 17, 28],
                            name: {
                              kind: "id",
                              loc: [17, 27, 17, 28],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [17, 33, 17, 38],
                          left: {
                            kind: "id",
                            loc: [17, 33, 17, 34],
                            text: "n",
                            bindingKey: "n$25lflsbo2zrha$2",
                          },
                          operatorToken: ">",
                          right: {
                            kind: "number",
                            loc: [17, 37, 17, 38],
                            value: 3,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 47],
                  name: {
                    kind: "string",
                    loc: [18, 9, 18, 17],
                    text: "findLast",
                  },
                  initializer: {
                    kind: "()",
                    loc: [18, 19, 18, 47],
                    expression: {
                      kind: ".",
                      loc: [18, 19, 18, 33],
                      expression: {
                        kind: "id",
                        loc: [18, 19, 18, 24],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "findLast",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [18, 34, 18, 46],
                        parameters: [
                          {
                            kind: "param",
                            loc: [18, 35, 18, 36],
                            name: {
                              kind: "id",
                              loc: [18, 35, 18, 36],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$3",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [18, 41, 18, 46],
                          left: {
                            kind: "id",
                            loc: [18, 41, 18, 42],
                            text: "n",
                            bindingKey: "n$25lflsbo2zrha$3",
                          },
                          operatorToken: "<",
                          right: {
                            kind: "number",
                            loc: [18, 45, 18, 46],
                            value: 3,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 57],
                  name: {
                    kind: "string",
                    loc: [19, 9, 19, 22],
                    text: "findLastIndex",
                  },
                  initializer: {
                    kind: "()",
                    loc: [19, 24, 19, 57],
                    expression: {
                      kind: ".",
                      loc: [19, 24, 19, 43],
                      expression: {
                        kind: "id",
                        loc: [19, 24, 19, 29],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "findLastIndex",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [19, 44, 19, 56],
                        parameters: [
                          {
                            kind: "param",
                            loc: [19, 45, 19, 46],
                            name: {
                              kind: "id",
                              loc: [19, 45, 19, 46],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$4",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [19, 51, 19, 56],
                          left: {
                            kind: "id",
                            loc: [19, 51, 19, 52],
                            text: "n",
                            bindingKey: "n$25lflsbo2zrha$4",
                          },
                          operatorToken: "<",
                          right: {
                            kind: "number",
                            loc: [19, 55, 19, 56],
                            value: 3,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [20, 9, 20, 51],
                  name: {
                    kind: "string",
                    loc: [20, 9, 20, 16],
                    text: "flatMap",
                  },
                  initializer: {
                    kind: "()",
                    loc: [20, 18, 20, 51],
                    expression: {
                      kind: ".",
                      loc: [20, 18, 20, 31],
                      expression: {
                        kind: "id",
                        loc: [20, 18, 20, 23],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "flatMap",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [20, 32, 20, 50],
                        parameters: [
                          {
                            kind: "param",
                            loc: [20, 33, 20, 34],
                            name: {
                              kind: "id",
                              loc: [20, 33, 20, 34],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$5",
                            },
                          },
                        ],
                        body: {
                          kind: "arr",
                          loc: [20, 39, 20, 50],
                          elements: [
                            {
                              kind: "id",
                              loc: [20, 40, 20, 41],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$5",
                            },
                            {
                              kind: "binop",
                              loc: [20, 43, 20, 49],
                              left: {
                                kind: "id",
                                loc: [20, 43, 20, 44],
                                text: "n",
                                bindingKey: "n$25lflsbo2zrha$5",
                              },
                              operatorToken: "*",
                              right: {
                                kind: "number",
                                loc: [20, 47, 20, 49],
                                value: 10,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [21, 9, 21, 66],
                  name: {
                    kind: "string",
                    loc: [21, 9, 21, 20],
                    text: "reduceRight",
                  },
                  initializer: {
                    kind: "()",
                    loc: [21, 22, 21, 66],
                    expression: {
                      kind: ".",
                      loc: [21, 22, 21, 39],
                      expression: {
                        kind: "id",
                        loc: [21, 22, 21, 27],
                        text: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      name: "reduceRight",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [21, 40, 21, 61],
                        parameters: [
                          {
                            kind: "param",
                            loc: [21, 41, 21, 45],
                            name: {
                              kind: "id",
                              loc: [21, 41, 21, 45],
                              text: "text",
                              bindingKey: "text$25lflsbo2zrha$6",
                            },
                          },
                          {
                            kind: "param",
                            loc: [21, 47, 21, 48],
                            name: {
                              kind: "id",
                              loc: [21, 47, 21, 48],
                              text: "n",
                              bindingKey: "n$25lflsbo2zrha$7",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [21, 53, 21, 61],
                          left: {
                            kind: "id",
                            loc: [21, 53, 21, 57],
                            text: "text",
                            bindingKey: "text$25lflsbo2zrha$6",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [21, 60, 21, 61],
                            text: "n",
                            bindingKey: "n$25lflsbo2zrha$7",
                          },
                        },
                      },
                      {
                        kind: "string",
                        loc: [21, 63, 21, 65],
                        text: "",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [22, 9, 22, 25],
                  name: {
                    kind: "string",
                    loc: [22, 9, 22, 18],
                    text: "unchanged",
                  },
                  initializer: {
                    kind: "id",
                    loc: [22, 20, 22, 25],
                    text: "coins",
                    bindingKey: "coins$25lflsbo2zrha$0",
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
