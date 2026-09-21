import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayMembers",
    cs.create(
      [11, 5, 25, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-members.test.tsx",
        fileHash: "139y0n5fpgs82",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 25, 6],
        statements: [
          {
            kind: "const",
            loc: [12, 7, 12, 31],
            name: {
              kind: "id",
              loc: [12, 13, 12, 18],
              text: "coins",
              bindingKey: "coins$139y0n5fpgs82$0",
            },
            initializer: {
              kind: "arr",
              loc: [12, 21, 12, 30],
              elements: [
                {
                  kind: "number",
                  loc: [12, 22, 12, 23],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [12, 25, 12, 26],
                  value: 2,
                },
                {
                  kind: "number",
                  loc: [12, 28, 12, 29],
                  value: 3,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [13, 7, 13, 22],
            name: {
              kind: "id",
              loc: [13, 13, 13, 17],
              text: "four",
              bindingKey: "four$139y0n5fpgs82$1",
            },
            initializer: {
              kind: "number",
              loc: [13, 20, 13, 21],
              value: 4,
            },
          },
          {
            kind: "return",
            loc: [14, 7, 24, 9],
            expression: {
              kind: "obj",
              loc: [14, 14, 24, 8],
              properties: [
                {
                  kind: ":",
                  loc: [15, 9, 15, 28],
                  name: {
                    kind: "string",
                    loc: [15, 9, 15, 14],
                    text: "count",
                  },
                  initializer: {
                    kind: ".",
                    loc: [15, 16, 15, 28],
                    expression: {
                      kind: "id",
                      loc: [15, 16, 15, 21],
                      text: "coins",
                      bindingKey: "coins$139y0n5fpgs82$0",
                    },
                    name: "length",
                  },
                },
                {
                  kind: ":",
                  loc: [16, 9, 16, 34],
                  name: {
                    kind: "string",
                    loc: [16, 9, 16, 12],
                    text: "all",
                  },
                  initializer: {
                    kind: "()",
                    loc: [16, 14, 16, 34],
                    expression: {
                      kind: ".",
                      loc: [16, 14, 16, 26],
                      expression: {
                        kind: "id",
                        loc: [16, 14, 16, 19],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "concat",
                    },
                    arguments: [
                      {
                        kind: "arr",
                        loc: [16, 27, 16, 33],
                        elements: [
                          {
                            kind: "id",
                            loc: [16, 28, 16, 32],
                            text: "four",
                            bindingKey: "four$139y0n5fpgs82$1",
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 32],
                  name: {
                    kind: "string",
                    loc: [17, 9, 17, 13],
                    text: "part",
                  },
                  initializer: {
                    kind: "()",
                    loc: [17, 15, 17, 32],
                    expression: {
                      kind: ".",
                      loc: [17, 15, 17, 26],
                      expression: {
                        kind: "id",
                        loc: [17, 15, 17, 20],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "slice",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [17, 27, 17, 28],
                        value: 0,
                      },
                      {
                        kind: "number",
                        loc: [17, 30, 17, 31],
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 32],
                  name: {
                    kind: "string",
                    loc: [18, 9, 18, 14],
                    text: "where",
                  },
                  initializer: {
                    kind: "()",
                    loc: [18, 16, 18, 32],
                    expression: {
                      kind: ".",
                      loc: [18, 16, 18, 29],
                      expression: {
                        kind: "id",
                        loc: [18, 16, 18, 21],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "indexOf",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [18, 30, 18, 31],
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 52],
                  name: {
                    kind: "string",
                    loc: [19, 9, 19, 18],
                    text: "lastWhere",
                  },
                  initializer: {
                    kind: "()",
                    loc: [19, 20, 19, 52],
                    expression: {
                      kind: ".",
                      loc: [19, 20, 19, 49],
                      expression: {
                        kind: "()",
                        loc: [19, 20, 19, 37],
                        expression: {
                          kind: ".",
                          loc: [19, 20, 19, 32],
                          expression: {
                            kind: "id",
                            loc: [19, 20, 19, 25],
                            text: "coins",
                            bindingKey: "coins$139y0n5fpgs82$0",
                          },
                          name: "concat",
                        },
                        arguments: [
                          {
                            kind: "arr",
                            loc: [19, 33, 19, 36],
                            elements: [
                              {
                                kind: "number",
                                loc: [19, 34, 19, 35],
                                value: 2,
                              },
                            ],
                          },
                        ],
                      },
                      name: "lastIndexOf",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [19, 50, 19, 51],
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [20, 9, 20, 31],
                  name: {
                    kind: "string",
                    loc: [20, 9, 20, 12],
                    text: "has",
                  },
                  initializer: {
                    kind: "()",
                    loc: [20, 14, 20, 31],
                    expression: {
                      kind: ".",
                      loc: [20, 14, 20, 28],
                      expression: {
                        kind: "id",
                        loc: [20, 14, 20, 19],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "includes",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [20, 29, 20, 30],
                        value: 3,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [21, 9, 21, 30],
                  name: {
                    kind: "string",
                    loc: [21, 9, 21, 13],
                    text: "text",
                  },
                  initializer: {
                    kind: "()",
                    loc: [21, 15, 21, 30],
                    expression: {
                      kind: ".",
                      loc: [21, 15, 21, 25],
                      expression: {
                        kind: "id",
                        loc: [21, 15, 21, 20],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "join",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [21, 26, 21, 29],
                        text: "-",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [22, 9, 22, 41],
                  name: {
                    kind: "string",
                    loc: [22, 9, 22, 16],
                    text: "doubled",
                  },
                  initializer: {
                    kind: "()",
                    loc: [22, 18, 22, 41],
                    expression: {
                      kind: ".",
                      loc: [22, 18, 22, 27],
                      expression: {
                        kind: "id",
                        loc: [22, 18, 22, 23],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "map",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [22, 28, 22, 40],
                        parameters: [
                          {
                            kind: "param",
                            loc: [22, 29, 22, 30],
                            name: {
                              kind: "id",
                              loc: [22, 29, 22, 30],
                              text: "n",
                              bindingKey: "n$139y0n5fpgs82$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [22, 35, 22, 40],
                          left: {
                            kind: "id",
                            loc: [22, 35, 22, 36],
                            text: "n",
                            bindingKey: "n$139y0n5fpgs82$2",
                          },
                          operatorToken: "*",
                          right: {
                            kind: "number",
                            loc: [22, 39, 22, 40],
                            value: 2,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [23, 9, 23, 42],
                  name: {
                    kind: "string",
                    loc: [23, 9, 23, 14],
                    text: "small",
                  },
                  initializer: {
                    kind: "()",
                    loc: [23, 16, 23, 42],
                    expression: {
                      kind: ".",
                      loc: [23, 16, 23, 28],
                      expression: {
                        kind: "id",
                        loc: [23, 16, 23, 21],
                        text: "coins",
                        bindingKey: "coins$139y0n5fpgs82$0",
                      },
                      name: "filter",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [23, 29, 23, 41],
                        parameters: [
                          {
                            kind: "param",
                            loc: [23, 30, 23, 31],
                            name: {
                              kind: "id",
                              loc: [23, 30, 23, 31],
                              text: "n",
                              bindingKey: "n$139y0n5fpgs82$3",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [23, 36, 23, 41],
                          left: {
                            kind: "id",
                            loc: [23, 36, 23, 37],
                            text: "n",
                            bindingKey: "n$139y0n5fpgs82$3",
                          },
                          operatorToken: "<",
                          right: {
                            kind: "number",
                            loc: [23, 40, 23, 41],
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
    ),
  );
});
