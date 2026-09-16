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
      [11, 5, 24, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-members.test.tsx",
        fileHash: "1al17bnhsosx2",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 24, 6],
        statements: [
          {
            kind: "const",
            loc: [12, 7, 12, 31],
            name: {
              kind: "id",
              loc: [12, 13, 12, 18],
              text: "coins",
              bindingKey: "coins$1al17bnhsosx2$0",
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
              bindingKey: "four$1al17bnhsosx2$1",
            },
            initializer: {
              kind: "number",
              loc: [13, 20, 13, 21],
              value: 4,
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
                  loc: [15, 9, 15, 28],
                  name: "count",
                  initializer: {
                    kind: ".",
                    loc: [15, 16, 15, 28],
                    expression: {
                      kind: "id",
                      loc: [15, 16, 15, 21],
                      text: "coins",
                      bindingKey: "coins$1al17bnhsosx2$0",
                    },
                    name: "length",
                  },
                },
                {
                  kind: ":",
                  loc: [16, 9, 16, 34],
                  name: "all",
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
                        bindingKey: "coins$1al17bnhsosx2$0",
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
                            bindingKey: "four$1al17bnhsosx2$1",
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 32],
                  name: "part",
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
                        bindingKey: "coins$1al17bnhsosx2$0",
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
                  name: "where",
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
                        bindingKey: "coins$1al17bnhsosx2$0",
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
                  loc: [19, 9, 19, 31],
                  name: "has",
                  initializer: {
                    kind: "()",
                    loc: [19, 14, 19, 31],
                    expression: {
                      kind: ".",
                      loc: [19, 14, 19, 28],
                      expression: {
                        kind: "id",
                        loc: [19, 14, 19, 19],
                        text: "coins",
                        bindingKey: "coins$1al17bnhsosx2$0",
                      },
                      name: "includes",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [19, 29, 19, 30],
                        value: 3,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [20, 9, 20, 30],
                  name: "text",
                  initializer: {
                    kind: "()",
                    loc: [20, 15, 20, 30],
                    expression: {
                      kind: ".",
                      loc: [20, 15, 20, 25],
                      expression: {
                        kind: "id",
                        loc: [20, 15, 20, 20],
                        text: "coins",
                        bindingKey: "coins$1al17bnhsosx2$0",
                      },
                      name: "join",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [20, 26, 20, 29],
                        text: "-",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [21, 9, 21, 41],
                  name: "doubled",
                  initializer: {
                    kind: "()",
                    loc: [21, 18, 21, 41],
                    expression: {
                      kind: ".",
                      loc: [21, 18, 21, 27],
                      expression: {
                        kind: "id",
                        loc: [21, 18, 21, 23],
                        text: "coins",
                        bindingKey: "coins$1al17bnhsosx2$0",
                      },
                      name: "map",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [21, 28, 21, 40],
                        parameters: [
                          {
                            kind: "param",
                            loc: [21, 29, 21, 30],
                            name: {
                              kind: "id",
                              loc: [21, 29, 21, 30],
                              text: "n",
                              bindingKey: "n$1al17bnhsosx2$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [21, 35, 21, 40],
                          left: {
                            kind: "id",
                            loc: [21, 35, 21, 36],
                            text: "n",
                            bindingKey: "n$1al17bnhsosx2$2",
                          },
                          operatorToken: "*",
                          right: {
                            kind: "number",
                            loc: [21, 39, 21, 40],
                            value: 2,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [22, 9, 22, 42],
                  name: "small",
                  initializer: {
                    kind: "()",
                    loc: [22, 16, 22, 42],
                    expression: {
                      kind: ".",
                      loc: [22, 16, 22, 28],
                      expression: {
                        kind: "id",
                        loc: [22, 16, 22, 21],
                        text: "coins",
                        bindingKey: "coins$1al17bnhsosx2$0",
                      },
                      name: "filter",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [22, 29, 22, 41],
                        parameters: [
                          {
                            kind: "param",
                            loc: [22, 30, 22, 31],
                            name: {
                              kind: "id",
                              loc: [22, 30, 22, 31],
                              text: "n",
                              bindingKey: "n$1al17bnhsosx2$3",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [22, 36, 22, 41],
                          left: {
                            kind: "id",
                            loc: [22, 36, 22, 37],
                            text: "n",
                            bindingKey: "n$1al17bnhsosx2$3",
                          },
                          operatorToken: "<",
                          right: {
                            kind: "number",
                            loc: [22, 40, 22, 41],
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
