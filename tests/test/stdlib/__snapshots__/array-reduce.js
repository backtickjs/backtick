import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `reduce` takes its initial value, where the standard library lets it be
// left out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
it("arrayReduce", async (t) => {
  await snapshotCase(
    t,
    "arrayReduce",
    cs.create(
      [13, 5, 26, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-reduce.test.tsx",
        fileHash: "32uyy4dbi2509",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 26, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 37],
            name: {
              kind: "id",
              loc: [14, 13, 14, 19],
              text: "prices",
              bindingKey: "prices$32uyy4dbi2509$0",
            },
            initializer: {
              kind: "arr",
              loc: [14, 22, 14, 36],
              elements: [
                {
                  kind: "number",
                  loc: [14, 23, 14, 26],
                  value: 4.5,
                },
                {
                  kind: "number",
                  loc: [14, 28, 14, 32],
                  value: 3.25,
                },
                {
                  kind: "number",
                  loc: [14, 34, 14, 35],
                  value: 2,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [15, 7, 15, 67],
            name: {
              kind: "id",
              loc: [15, 13, 15, 18],
              text: "total",
              bindingKey: "total$32uyy4dbi2509$1",
            },
            initializer: {
              kind: "()",
              loc: [15, 21, 15, 66],
              expression: {
                kind: ".",
                loc: [15, 21, 15, 34],
                expression: {
                  kind: "id",
                  loc: [15, 21, 15, 27],
                  text: "prices",
                  bindingKey: "prices$32uyy4dbi2509$0",
                },
                name: "reduce",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [15, 35, 15, 62],
                  parameters: [
                    {
                      kind: "param",
                      loc: [15, 36, 15, 39],
                      name: {
                        kind: "id",
                        loc: [15, 36, 15, 39],
                        text: "sum",
                        bindingKey: "sum$32uyy4dbi2509$5",
                      },
                    },
                    {
                      kind: "param",
                      loc: [15, 41, 15, 46],
                      name: {
                        kind: "id",
                        loc: [15, 41, 15, 46],
                        text: "price",
                        bindingKey: "price$32uyy4dbi2509$6",
                      },
                    },
                  ],
                  body: {
                    kind: "binop",
                    loc: [15, 51, 15, 62],
                    left: {
                      kind: "id",
                      loc: [15, 51, 15, 54],
                      text: "sum",
                      bindingKey: "sum$32uyy4dbi2509$5",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [15, 57, 15, 62],
                      text: "price",
                      bindingKey: "price$32uyy4dbi2509$6",
                    },
                  },
                },
                {
                  kind: "number",
                  loc: [15, 64, 15, 65],
                  value: 0,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [16, 7, 16, 37],
            name: {
              kind: "id",
              loc: [16, 13, 16, 18],
              text: "names",
              bindingKey: "names$32uyy4dbi2509$2",
            },
            initializer: {
              kind: "arr",
              loc: [16, 21, 16, 36],
              elements: [
                {
                  kind: "string",
                  loc: [16, 22, 16, 25],
                  text: "a",
                },
                {
                  kind: "string",
                  loc: [16, 27, 16, 30],
                  text: "b",
                },
                {
                  kind: "string",
                  loc: [16, 32, 16, 35],
                  text: "c",
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [17, 7, 17, 79],
            name: {
              kind: "id",
              loc: [17, 13, 17, 19],
              text: "joined",
              bindingKey: "joined$32uyy4dbi2509$3",
            },
            initializer: {
              kind: "()",
              loc: [17, 22, 17, 78],
              expression: {
                kind: ".",
                loc: [17, 22, 17, 34],
                expression: {
                  kind: "id",
                  loc: [17, 22, 17, 27],
                  text: "names",
                  bindingKey: "names$32uyy4dbi2509$2",
                },
                name: "reduce",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [17, 35, 17, 73],
                  parameters: [
                    {
                      kind: "param",
                      loc: [17, 36, 17, 39],
                      name: {
                        kind: "id",
                        loc: [17, 36, 17, 39],
                        text: "all",
                        bindingKey: "all$32uyy4dbi2509$7",
                      },
                    },
                    {
                      kind: "param",
                      loc: [17, 41, 17, 44],
                      name: {
                        kind: "id",
                        loc: [17, 41, 17, 44],
                        text: "one",
                        bindingKey: "one$32uyy4dbi2509$8",
                      },
                    },
                    {
                      kind: "param",
                      loc: [17, 46, 17, 51],
                      name: {
                        kind: "id",
                        loc: [17, 46, 17, 51],
                        text: "index",
                        bindingKey: "index$32uyy4dbi2509$9",
                      },
                    },
                  ],
                  body: {
                    kind: "binop",
                    loc: [17, 56, 17, 73],
                    left: {
                      kind: "binop",
                      loc: [17, 56, 17, 67],
                      left: {
                        kind: "id",
                        loc: [17, 56, 17, 59],
                        text: "all",
                        bindingKey: "all$32uyy4dbi2509$7",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [17, 62, 17, 67],
                        text: "index",
                        bindingKey: "index$32uyy4dbi2509$9",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [17, 70, 17, 73],
                      text: "one",
                      bindingKey: "one$32uyy4dbi2509$8",
                    },
                  },
                },
                {
                  kind: "string",
                  loc: [17, 75, 17, 77],
                  text: "",
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [18, 7, 18, 34],
            name: {
              kind: "id",
              loc: [18, 13, 18, 18],
              text: "empty",
              bindingKey: "empty$32uyy4dbi2509$4",
            },
            initializer: {
              kind: "arr",
              loc: [18, 31, 18, 33],
              elements: [],
            },
          },
          {
            kind: "return",
            loc: [19, 7, 25, 9],
            expression: {
              kind: "binop",
              loc: [20, 9, 24, 49],
              left: {
                kind: "binop",
                loc: [20, 9, 23, 12],
                left: {
                  kind: "binop",
                  loc: [20, 9, 22, 15],
                  left: {
                    kind: "binop",
                    loc: [20, 9, 21, 12],
                    left: {
                      kind: "()",
                      loc: [20, 9, 20, 25],
                      expression: {
                        kind: ".",
                        loc: [20, 9, 20, 22],
                        expression: {
                          kind: "id",
                          loc: [20, 9, 20, 14],
                          text: "total",
                          bindingKey: "total$32uyy4dbi2509$1",
                        },
                        name: "toFixed",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [20, 23, 20, 24],
                          value: 2,
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
                    kind: "id",
                    loc: [22, 9, 22, 15],
                    text: "joined",
                    bindingKey: "joined$32uyy4dbi2509$3",
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
                loc: [24, 9, 24, 49],
                expression: {
                  kind: ".",
                  loc: [24, 9, 24, 21],
                  expression: {
                    kind: "id",
                    loc: [24, 9, 24, 14],
                    text: "empty",
                    bindingKey: "empty$32uyy4dbi2509$4",
                  },
                  name: "reduce",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [24, 22, 24, 45],
                    parameters: [
                      {
                        kind: "param",
                        loc: [24, 23, 24, 26],
                        name: {
                          kind: "id",
                          loc: [24, 23, 24, 26],
                          text: "sum",
                          bindingKey: "sum$32uyy4dbi2509$10",
                        },
                      },
                      {
                        kind: "param",
                        loc: [24, 28, 24, 31],
                        name: {
                          kind: "id",
                          loc: [24, 28, 24, 31],
                          text: "one",
                          bindingKey: "one$32uyy4dbi2509$11",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [24, 36, 24, 45],
                      left: {
                        kind: "id",
                        loc: [24, 36, 24, 39],
                        text: "sum",
                        bindingKey: "sum$32uyy4dbi2509$10",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [24, 42, 24, 45],
                        text: "one",
                        bindingKey: "one$32uyy4dbi2509$11",
                      },
                    },
                  },
                  {
                    kind: "number",
                    loc: [24, 47, 24, 48],
                    value: 0,
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
