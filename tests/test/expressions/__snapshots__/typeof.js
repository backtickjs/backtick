import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// row of the wire format's table, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs.create(
      [11, 5, 25, 7],
      {
        version: "0.0.0",
        filePath: "expressions/typeof.test.tsx",
        fileHash: "2gv30cn7o7v4r",
        splices: { $state: { value: state, params: [] } },
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
              text: "count",
              bindingKey: "count$2gv30cn7o7v4r$0",
            },
            initializer: {
              kind: "()",
              loc: [12, 21, 12, 30],
              expression: {
                kind: "splice",
                loc: [12, 21, 12, 27],
                key: "$state",
              },
              arguments: [
                {
                  kind: "number",
                  loc: [12, 28, 12, 29],
                  value: 0,
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [13, 7, 24, 9],
            expression: {
              kind: "arr",
              loc: [13, 14, 24, 8],
              elements: [
                {
                  kind: "typeof",
                  loc: [14, 9, 14, 25],
                  operand: {
                    kind: "undefined",
                    loc: [14, 16, 14, 25],
                  },
                },
                {
                  kind: "typeof",
                  loc: [15, 9, 15, 20],
                  operand: {
                    kind: "null",
                    loc: [15, 16, 15, 20],
                  },
                },
                {
                  kind: "typeof",
                  loc: [16, 9, 16, 20],
                  operand: {
                    kind: "true",
                    loc: [16, 16, 16, 20],
                  },
                },
                {
                  kind: "typeof",
                  loc: [17, 9, 17, 17],
                  operand: {
                    kind: "number",
                    loc: [17, 16, 17, 17],
                    value: 1,
                  },
                },
                {
                  kind: "typeof",
                  loc: [18, 9, 18, 19],
                  operand: {
                    kind: "string",
                    loc: [18, 16, 18, 19],
                    text: "a",
                  },
                },
                {
                  kind: "typeof",
                  loc: [19, 9, 19, 19],
                  operand: {
                    kind: "arr",
                    loc: [19, 16, 19, 19],
                    elements: [
                      {
                        kind: "number",
                        loc: [19, 17, 19, 18],
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  kind: "typeof",
                  loc: [20, 9, 20, 24],
                  operand: {
                    kind: "obj",
                    loc: [20, 16, 20, 24],
                    properties: [
                      {
                        kind: ":",
                        loc: [20, 18, 20, 22],
                        name: {
                          kind: "string",
                          loc: [20, 18, 20, 19],
                          text: "a",
                        },
                        initializer: {
                          kind: "number",
                          loc: [20, 21, 20, 22],
                          value: 1,
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "typeof",
                  loc: [21, 9, 21, 34],
                  operand: {
                    kind: "=>",
                    loc: [21, 17, 21, 33],
                    parameters: [
                      {
                        kind: "param",
                        loc: [21, 18, 21, 27],
                        name: {
                          kind: "id",
                          loc: [21, 18, 21, 19],
                          text: "n",
                          bindingKey: "n$2gv30cn7o7v4r$1",
                        },
                      },
                    ],
                    body: {
                      kind: "id",
                      loc: [21, 32, 21, 33],
                      text: "n",
                      bindingKey: "n$2gv30cn7o7v4r$1",
                    },
                  },
                },
                {
                  kind: "typeof",
                  loc: [22, 9, 22, 26],
                  operand: {
                    kind: ".",
                    loc: [22, 16, 22, 26],
                    expression: {
                      kind: "bltn",
                      loc: [22, 16, 22, 20],
                      name: "Math",
                    },
                    name: "floor",
                  },
                },
                {
                  kind: "typeof",
                  loc: [23, 9, 23, 21],
                  operand: {
                    kind: "id",
                    loc: [23, 16, 23, 21],
                    text: "count",
                    bindingKey: "count$2gv30cn7o7v4r$0",
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
// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(
    t,
    "typeofNarrows",
    cs.create(
      [34, 5, 38, 7],
      {
        version: "0.0.0",
        filePath: "expressions/typeof.test.tsx",
        fileHash: "2gv30cn7o7v4r",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [34, 8, 38, 6],
        statements: [
          {
            kind: "const",
            loc: [35, 7, 36, 50],
            name: {
              kind: "id",
              loc: [35, 13, 35, 20],
              text: "measure",
              bindingKey: "measure$2gv30cn7o7v4r$2",
            },
            initializer: {
              kind: "=>",
              loc: [35, 23, 36, 49],
              parameters: [
                {
                  kind: "param",
                  loc: [35, 24, 35, 42],
                  name: {
                    kind: "id",
                    loc: [35, 24, 35, 25],
                    text: "v",
                    bindingKey: "v$2gv30cn7o7v4r$3",
                  },
                },
              ],
              body: {
                kind: "?:",
                loc: [36, 9, 36, 49],
                condition: {
                  kind: "binop",
                  loc: [36, 9, 36, 30],
                  left: {
                    kind: "typeof",
                    loc: [36, 9, 36, 17],
                    operand: {
                      kind: "id",
                      loc: [36, 16, 36, 17],
                      text: "v",
                      bindingKey: "v$2gv30cn7o7v4r$3",
                    },
                  },
                  operatorToken: "===",
                  right: {
                    kind: "string",
                    loc: [36, 22, 36, 30],
                    text: "string",
                  },
                },
                whenTrue: {
                  kind: ".",
                  loc: [36, 33, 36, 41],
                  expression: {
                    kind: "id",
                    loc: [36, 33, 36, 34],
                    text: "v",
                    bindingKey: "v$2gv30cn7o7v4r$3",
                  },
                  name: "length",
                },
                whenFalse: {
                  kind: "binop",
                  loc: [36, 44, 36, 49],
                  left: {
                    kind: "id",
                    loc: [36, 44, 36, 45],
                    text: "v",
                    bindingKey: "v$2gv30cn7o7v4r$3",
                  },
                  operatorToken: "*",
                  right: {
                    kind: "number",
                    loc: [36, 48, 36, 49],
                    value: 2,
                  },
                },
              },
            },
          },
          {
            kind: "return",
            loc: [37, 7, 37, 43],
            expression: {
              kind: "arr",
              loc: [37, 14, 37, 42],
              elements: [
                {
                  kind: "()",
                  loc: [37, 15, 37, 29],
                  expression: {
                    kind: "id",
                    loc: [37, 15, 37, 22],
                    text: "measure",
                    bindingKey: "measure$2gv30cn7o7v4r$2",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [37, 23, 37, 28],
                      text: "abc",
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [37, 31, 37, 41],
                  expression: {
                    kind: "id",
                    loc: [37, 31, 37, 38],
                    text: "measure",
                    bindingKey: "measure$2gv30cn7o7v4r$2",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [37, 39, 37, 40],
                      value: 4,
                    },
                  ],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
