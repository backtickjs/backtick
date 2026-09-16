import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The copying members: each answers with a new array and leaves the one it
// was given alone, which is what lets an array be a value here. `sort`,
// `reverse` and `splice` — the ones that write into the array instead — are
// absent.
it("arrayCopyingMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayCopyingMembers",
    cs.create(
      [13, 5, 30, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-copying-members.test.tsx",
        fileHash: "1o1nlczam5nsr",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 30, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 30],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "rows",
              bindingKey: "rows$1o1nlczam5nsr$0",
            },
            initializer: {
              kind: "arr",
              loc: [14, 20, 14, 29],
              elements: [
                {
                  kind: "number",
                  loc: [14, 21, 14, 22],
                  value: 3,
                },
                {
                  kind: "number",
                  loc: [14, 24, 14, 25],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [14, 27, 14, 28],
                  value: 2,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [15, 7, 15, 53],
            name: {
              kind: "id",
              loc: [15, 13, 15, 19],
              text: "sorted",
              bindingKey: "sorted$1o1nlczam5nsr$1",
            },
            initializer: {
              kind: "()",
              loc: [15, 22, 15, 52],
              expression: {
                kind: ".",
                loc: [15, 22, 15, 35],
                expression: {
                  kind: "id",
                  loc: [15, 22, 15, 26],
                  text: "rows",
                  bindingKey: "rows$1o1nlczam5nsr$0",
                },
                name: "toSorted",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [15, 36, 15, 51],
                  parameters: [
                    {
                      kind: "param",
                      loc: [15, 37, 15, 38],
                      name: {
                        kind: "id",
                        loc: [15, 37, 15, 38],
                        text: "a",
                        bindingKey: "a$1o1nlczam5nsr$5",
                      },
                    },
                    {
                      kind: "param",
                      loc: [15, 40, 15, 41],
                      name: {
                        kind: "id",
                        loc: [15, 40, 15, 41],
                        text: "b",
                        bindingKey: "b$1o1nlczam5nsr$6",
                      },
                    },
                  ],
                  body: {
                    kind: "binop",
                    loc: [15, 46, 15, 51],
                    left: {
                      kind: "id",
                      loc: [15, 46, 15, 47],
                      text: "a",
                      bindingKey: "a$1o1nlczam5nsr$5",
                    },
                    operatorToken: "-",
                    right: {
                      kind: "id",
                      loc: [15, 50, 15, 51],
                      text: "b",
                      bindingKey: "b$1o1nlczam5nsr$6",
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [16, 7, 16, 42],
            name: {
              kind: "id",
              loc: [16, 13, 16, 21],
              text: "reversed",
              bindingKey: "reversed$1o1nlczam5nsr$2",
            },
            initializer: {
              kind: "()",
              loc: [16, 24, 16, 41],
              expression: {
                kind: ".",
                loc: [16, 24, 16, 39],
                expression: {
                  kind: "id",
                  loc: [16, 24, 16, 28],
                  text: "rows",
                  bindingKey: "rows$1o1nlczam5nsr$0",
                },
                name: "toReversed",
              },
              arguments: [],
            },
          },
          {
            kind: "const",
            loc: [17, 7, 17, 44],
            name: {
              kind: "id",
              loc: [17, 13, 17, 20],
              text: "spliced",
              bindingKey: "spliced$1o1nlczam5nsr$3",
            },
            initializer: {
              kind: "()",
              loc: [17, 23, 17, 43],
              expression: {
                kind: ".",
                loc: [17, 23, 17, 37],
                expression: {
                  kind: "id",
                  loc: [17, 23, 17, 27],
                  text: "rows",
                  bindingKey: "rows$1o1nlczam5nsr$0",
                },
                name: "toSpliced",
              },
              arguments: [
                {
                  kind: "number",
                  loc: [17, 38, 17, 39],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [17, 41, 17, 42],
                  value: 1,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [18, 7, 18, 48],
            name: {
              kind: "id",
              loc: [18, 13, 18, 21],
              text: "inserted",
              bindingKey: "inserted$1o1nlczam5nsr$4",
            },
            initializer: {
              kind: "()",
              loc: [18, 24, 18, 47],
              expression: {
                kind: ".",
                loc: [18, 24, 18, 38],
                expression: {
                  kind: "id",
                  loc: [18, 24, 18, 28],
                  text: "rows",
                  bindingKey: "rows$1o1nlczam5nsr$0",
                },
                name: "toSpliced",
              },
              arguments: [
                {
                  kind: "number",
                  loc: [18, 39, 18, 40],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [18, 42, 18, 43],
                  value: 0,
                },
                {
                  kind: "number",
                  loc: [18, 45, 18, 46],
                  value: 9,
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [19, 7, 29, 9],
            expression: {
              kind: "binop",
              loc: [20, 9, 28, 23],
              left: {
                kind: "binop",
                loc: [20, 9, 27, 12],
                left: {
                  kind: "binop",
                  loc: [20, 9, 26, 27],
                  left: {
                    kind: "binop",
                    loc: [20, 9, 25, 12],
                    left: {
                      kind: "binop",
                      loc: [20, 9, 24, 26],
                      left: {
                        kind: "binop",
                        loc: [20, 9, 23, 12],
                        left: {
                          kind: "binop",
                          loc: [20, 9, 22, 27],
                          left: {
                            kind: "binop",
                            loc: [20, 9, 21, 12],
                            left: {
                              kind: "()",
                              loc: [20, 9, 20, 25],
                              expression: {
                                kind: ".",
                                loc: [20, 9, 20, 20],
                                expression: {
                                  kind: "id",
                                  loc: [20, 9, 20, 15],
                                  text: "sorted",
                                  bindingKey: "sorted$1o1nlczam5nsr$1",
                                },
                                name: "join",
                              },
                              arguments: [
                                {
                                  kind: "string",
                                  loc: [20, 21, 20, 24],
                                  text: ",",
                                },
                              ],
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
                            kind: "()",
                            loc: [22, 9, 22, 27],
                            expression: {
                              kind: ".",
                              loc: [22, 9, 22, 22],
                              expression: {
                                kind: "id",
                                loc: [22, 9, 22, 17],
                                text: "reversed",
                                bindingKey: "reversed$1o1nlczam5nsr$2",
                              },
                              name: "join",
                            },
                            arguments: [
                              {
                                kind: "string",
                                loc: [22, 23, 22, 26],
                                text: ",",
                              },
                            ],
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
                        kind: "()",
                        loc: [24, 9, 24, 26],
                        expression: {
                          kind: ".",
                          loc: [24, 9, 24, 21],
                          expression: {
                            kind: "id",
                            loc: [24, 9, 24, 16],
                            text: "spliced",
                            bindingKey: "spliced$1o1nlczam5nsr$3",
                          },
                          name: "join",
                        },
                        arguments: [
                          {
                            kind: "string",
                            loc: [24, 22, 24, 25],
                            text: ",",
                          },
                        ],
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
                    loc: [26, 9, 26, 27],
                    expression: {
                      kind: ".",
                      loc: [26, 9, 26, 22],
                      expression: {
                        kind: "id",
                        loc: [26, 9, 26, 17],
                        text: "inserted",
                        bindingKey: "inserted$1o1nlczam5nsr$4",
                      },
                      name: "join",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [26, 23, 26, 26],
                        text: ",",
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [27, 9, 27, 12],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [28, 9, 28, 23],
                expression: {
                  kind: ".",
                  loc: [28, 9, 28, 18],
                  expression: {
                    kind: "id",
                    loc: [28, 9, 28, 13],
                    text: "rows",
                    bindingKey: "rows$1o1nlczam5nsr$0",
                  },
                  name: "join",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [28, 19, 28, 22],
                    text: ",",
                  },
                ],
              },
            },
          },
        ],
      }),
    ),
  );
});
