import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one
// that already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
it("arrayFrom", async (t) => {
  await snapshotCase(
    t,
    "arrayFrom",
    cs.create(
      [16, 5, 23, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-from.test.tsx",
        fileHash: "3pi2uzl7sovgc",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [16, 8, 23, 6],
        statements: [
          {
            kind: "const",
            loc: [17, 7, 17, 74],
            name: {
              kind: "id",
              loc: [17, 13, 17, 20],
              text: "doubled",
              bindingKey: "doubled$3pi2uzl7sovgc$0",
            },
            initializer: {
              kind: "()",
              loc: [17, 23, 17, 73],
              expression: {
                kind: ".",
                loc: [17, 23, 17, 33],
                expression: {
                  kind: "bltn",
                  loc: [17, 23, 17, 28],
                  name: "Array",
                },
                name: "from",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [17, 34, 17, 47],
                  properties: [
                    {
                      kind: ":",
                      loc: [17, 36, 17, 45],
                      name: {
                        kind: "string",
                        loc: [17, 36, 17, 42],
                        text: "length",
                      },
                      initializer: {
                        kind: "number",
                        loc: [17, 44, 17, 45],
                        value: 4,
                      },
                    },
                  ],
                },
                {
                  kind: "=>",
                  loc: [17, 49, 17, 72],
                  parameters: [
                    {
                      kind: "param",
                      loc: [17, 50, 17, 51],
                      name: {
                        kind: "id",
                        loc: [17, 50, 17, 51],
                        text: "_",
                        bindingKey: "_$3pi2uzl7sovgc$3",
                      },
                    },
                    {
                      kind: "param",
                      loc: [17, 53, 17, 58],
                      name: {
                        kind: "id",
                        loc: [17, 53, 17, 58],
                        text: "index",
                        bindingKey: "index$3pi2uzl7sovgc$4",
                      },
                    },
                  ],
                  body: {
                    kind: "binop",
                    loc: [17, 63, 17, 72],
                    left: {
                      kind: "id",
                      loc: [17, 63, 17, 68],
                      text: "index",
                      bindingKey: "index$3pi2uzl7sovgc$4",
                    },
                    operatorToken: "*",
                    right: {
                      kind: "number",
                      loc: [17, 71, 17, 72],
                      value: 2,
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [18, 7, 18, 68],
            name: {
              kind: "id",
              loc: [18, 13, 18, 18],
              text: "empty",
              bindingKey: "empty$3pi2uzl7sovgc$1",
            },
            initializer: {
              kind: "()",
              loc: [18, 21, 18, 67],
              expression: {
                kind: ".",
                loc: [18, 21, 18, 31],
                expression: {
                  kind: "bltn",
                  loc: [18, 21, 18, 26],
                  name: "Array",
                },
                name: "from",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [18, 32, 18, 45],
                  properties: [
                    {
                      kind: ":",
                      loc: [18, 34, 18, 43],
                      name: {
                        kind: "string",
                        loc: [18, 34, 18, 40],
                        text: "length",
                      },
                      initializer: {
                        kind: "number",
                        loc: [18, 42, 18, 43],
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  kind: "=>",
                  loc: [18, 47, 18, 66],
                  parameters: [
                    {
                      kind: "param",
                      loc: [18, 48, 18, 49],
                      name: {
                        kind: "id",
                        loc: [18, 48, 18, 49],
                        text: "_",
                        bindingKey: "_$3pi2uzl7sovgc$5",
                      },
                    },
                    {
                      kind: "param",
                      loc: [18, 51, 18, 56],
                      name: {
                        kind: "id",
                        loc: [18, 51, 18, 56],
                        text: "index",
                        bindingKey: "index$3pi2uzl7sovgc$6",
                      },
                    },
                  ],
                  body: {
                    kind: "id",
                    loc: [18, 61, 18, 66],
                    text: "index",
                    bindingKey: "index$3pi2uzl7sovgc$6",
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [19, 7, 21, 9],
            name: {
              kind: "id",
              loc: [19, 13, 19, 19],
              text: "absent",
              bindingKey: "absent$3pi2uzl7sovgc$2",
            },
            initializer: {
              kind: "()",
              loc: [19, 22, 21, 8],
              expression: {
                kind: ".",
                loc: [19, 22, 19, 32],
                expression: {
                  kind: "bltn",
                  loc: [19, 22, 19, 27],
                  name: "Array",
                },
                name: "from",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [19, 33, 19, 46],
                  properties: [
                    {
                      kind: ":",
                      loc: [19, 35, 19, 44],
                      name: {
                        kind: "string",
                        loc: [19, 35, 19, 41],
                        text: "length",
                      },
                      initializer: {
                        kind: "number",
                        loc: [19, 43, 19, 44],
                        value: 2,
                      },
                    },
                  ],
                },
                {
                  kind: "=>",
                  loc: [19, 48, 20, 41],
                  parameters: [
                    {
                      kind: "param",
                      loc: [19, 49, 19, 54],
                      name: {
                        kind: "id",
                        loc: [19, 49, 19, 54],
                        text: "value",
                        bindingKey: "value$3pi2uzl7sovgc$7",
                      },
                    },
                    {
                      kind: "param",
                      loc: [19, 56, 19, 61],
                      name: {
                        kind: "id",
                        loc: [19, 56, 19, 61],
                        text: "index",
                        bindingKey: "index$3pi2uzl7sovgc$8",
                      },
                    },
                  ],
                  body: {
                    kind: "?:",
                    loc: [20, 9, 20, 41],
                    condition: {
                      kind: "binop",
                      loc: [20, 9, 20, 28],
                      left: {
                        kind: "id",
                        loc: [20, 9, 20, 14],
                        text: "value",
                        bindingKey: "value$3pi2uzl7sovgc$7",
                      },
                      operatorToken: "===",
                      right: {
                        kind: "undefined",
                        loc: [20, 19, 20, 28],
                      },
                    },
                    whenTrue: {
                      kind: "id",
                      loc: [20, 31, 20, 36],
                      text: "index",
                      bindingKey: "index$3pi2uzl7sovgc$8",
                    },
                    whenFalse: {
                      kind: "prefixop",
                      loc: [20, 39, 20, 41],
                      operator: "-",
                      operand: {
                        kind: "number",
                        loc: [20, 40, 20, 41],
                        value: 1,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [22, 7, 22, 78],
            expression: {
              kind: "binop",
              loc: [22, 14, 22, 77],
              left: {
                kind: "binop",
                loc: [22, 14, 22, 58],
                left: {
                  kind: "binop",
                  loc: [22, 14, 22, 52],
                  left: {
                    kind: "binop",
                    loc: [22, 14, 22, 37],
                    left: {
                      kind: "()",
                      loc: [22, 14, 22, 31],
                      expression: {
                        kind: ".",
                        loc: [22, 14, 22, 26],
                        expression: {
                          kind: "id",
                          loc: [22, 14, 22, 21],
                          text: "doubled",
                          bindingKey: "doubled$3pi2uzl7sovgc$0",
                        },
                        name: "join",
                      },
                      arguments: [
                        {
                          kind: "string",
                          loc: [22, 27, 22, 30],
                          text: ",",
                        },
                      ],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [22, 34, 22, 37],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: ".",
                    loc: [22, 40, 22, 52],
                    expression: {
                      kind: "id",
                      loc: [22, 40, 22, 45],
                      text: "empty",
                      bindingKey: "empty$3pi2uzl7sovgc$1",
                    },
                    name: "length",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [22, 55, 22, 58],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [22, 61, 22, 77],
                expression: {
                  kind: ".",
                  loc: [22, 61, 22, 72],
                  expression: {
                    kind: "id",
                    loc: [22, 61, 22, 67],
                    text: "absent",
                    bindingKey: "absent$3pi2uzl7sovgc$2",
                  },
                  name: "join",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [22, 73, 22, 76],
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
