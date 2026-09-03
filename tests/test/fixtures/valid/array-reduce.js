import { cs } from "@backtickjs/core";
// `reduce` takes its initial value, where the standard library lets it be left
// out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
export default cs.create(
  [7, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "array-reduce.ts",
    fileHash: "3lzby6qavzyep",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 19, 20, 2],
    statements: [
      {
        kind: "const",
        loc: [8, 3, 8, 33],
        name: {
          kind: "id",
          loc: [8, 9, 8, 15],
          text: "prices",
          bindingKey: "prices$3lzby6qavzyep$0",
        },
        initializer: {
          kind: "arr",
          loc: [8, 18, 8, 32],
          elements: [
            {
              kind: "number",
              loc: [8, 19, 8, 22],
              value: 4.5,
            },
            {
              kind: "number",
              loc: [8, 24, 8, 28],
              value: 3.25,
            },
            {
              kind: "number",
              loc: [8, 30, 8, 31],
              value: 2,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [9, 3, 9, 63],
        name: {
          kind: "id",
          loc: [9, 9, 9, 14],
          text: "total",
          bindingKey: "total$3lzby6qavzyep$1",
        },
        initializer: {
          kind: "()",
          loc: [9, 17, 9, 62],
          expression: {
            kind: ".",
            loc: [9, 17, 9, 30],
            expression: {
              kind: "id",
              loc: [9, 17, 9, 23],
              text: "prices",
              bindingKey: "prices$3lzby6qavzyep$0",
            },
            name: "reduce",
          },
          arguments: [
            {
              kind: "=>",
              loc: [9, 31, 9, 58],
              parameters: [
                {
                  kind: "param",
                  loc: [9, 32, 9, 35],
                  name: {
                    kind: "id",
                    loc: [9, 32, 9, 35],
                    text: "sum",
                    bindingKey: "sum$3lzby6qavzyep$5",
                  },
                },
                {
                  kind: "param",
                  loc: [9, 37, 9, 42],
                  name: {
                    kind: "id",
                    loc: [9, 37, 9, 42],
                    text: "price",
                    bindingKey: "price$3lzby6qavzyep$6",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [9, 47, 9, 58],
                left: {
                  kind: "id",
                  loc: [9, 47, 9, 50],
                  text: "sum",
                  bindingKey: "sum$3lzby6qavzyep$5",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [9, 53, 9, 58],
                  text: "price",
                  bindingKey: "price$3lzby6qavzyep$6",
                },
              },
            },
            {
              kind: "number",
              loc: [9, 60, 9, 61],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [10, 3, 10, 33],
        name: {
          kind: "id",
          loc: [10, 9, 10, 14],
          text: "names",
          bindingKey: "names$3lzby6qavzyep$2",
        },
        initializer: {
          kind: "arr",
          loc: [10, 17, 10, 32],
          elements: [
            {
              kind: "string",
              loc: [10, 18, 10, 21],
              text: "a",
            },
            {
              kind: "string",
              loc: [10, 23, 10, 26],
              text: "b",
            },
            {
              kind: "string",
              loc: [10, 28, 10, 31],
              text: "c",
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [11, 3, 11, 75],
        name: {
          kind: "id",
          loc: [11, 9, 11, 15],
          text: "joined",
          bindingKey: "joined$3lzby6qavzyep$3",
        },
        initializer: {
          kind: "()",
          loc: [11, 18, 11, 74],
          expression: {
            kind: ".",
            loc: [11, 18, 11, 30],
            expression: {
              kind: "id",
              loc: [11, 18, 11, 23],
              text: "names",
              bindingKey: "names$3lzby6qavzyep$2",
            },
            name: "reduce",
          },
          arguments: [
            {
              kind: "=>",
              loc: [11, 31, 11, 69],
              parameters: [
                {
                  kind: "param",
                  loc: [11, 32, 11, 35],
                  name: {
                    kind: "id",
                    loc: [11, 32, 11, 35],
                    text: "all",
                    bindingKey: "all$3lzby6qavzyep$7",
                  },
                },
                {
                  kind: "param",
                  loc: [11, 37, 11, 40],
                  name: {
                    kind: "id",
                    loc: [11, 37, 11, 40],
                    text: "one",
                    bindingKey: "one$3lzby6qavzyep$8",
                  },
                },
                {
                  kind: "param",
                  loc: [11, 42, 11, 47],
                  name: {
                    kind: "id",
                    loc: [11, 42, 11, 47],
                    text: "index",
                    bindingKey: "index$3lzby6qavzyep$9",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [11, 52, 11, 69],
                left: {
                  kind: "binop",
                  loc: [11, 52, 11, 63],
                  left: {
                    kind: "id",
                    loc: [11, 52, 11, 55],
                    text: "all",
                    bindingKey: "all$3lzby6qavzyep$7",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [11, 58, 11, 63],
                    text: "index",
                    bindingKey: "index$3lzby6qavzyep$9",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [11, 66, 11, 69],
                  text: "one",
                  bindingKey: "one$3lzby6qavzyep$8",
                },
              },
            },
            {
              kind: "string",
              loc: [11, 71, 11, 73],
              text: "",
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [12, 3, 12, 30],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "empty",
          bindingKey: "empty$3lzby6qavzyep$4",
        },
        initializer: {
          kind: "arr",
          loc: [12, 27, 12, 29],
          elements: [],
        },
      },
      {
        kind: "return",
        loc: [13, 3, 19, 5],
        expression: {
          kind: "binop",
          loc: [14, 5, 18, 45],
          left: {
            kind: "binop",
            loc: [14, 5, 17, 8],
            left: {
              kind: "binop",
              loc: [14, 5, 16, 11],
              left: {
                kind: "binop",
                loc: [14, 5, 15, 8],
                left: {
                  kind: "()",
                  loc: [14, 5, 14, 21],
                  expression: {
                    kind: ".",
                    loc: [14, 5, 14, 18],
                    expression: {
                      kind: "id",
                      loc: [14, 5, 14, 10],
                      text: "total",
                      bindingKey: "total$3lzby6qavzyep$1",
                    },
                    name: "toFixed",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [14, 19, 14, 20],
                      value: 2,
                    },
                  ],
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
                loc: [16, 5, 16, 11],
                text: "joined",
                bindingKey: "joined$3lzby6qavzyep$3",
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
            kind: "()",
            loc: [18, 5, 18, 45],
            expression: {
              kind: ".",
              loc: [18, 5, 18, 17],
              expression: {
                kind: "id",
                loc: [18, 5, 18, 10],
                text: "empty",
                bindingKey: "empty$3lzby6qavzyep$4",
              },
              name: "reduce",
            },
            arguments: [
              {
                kind: "=>",
                loc: [18, 18, 18, 41],
                parameters: [
                  {
                    kind: "param",
                    loc: [18, 19, 18, 22],
                    name: {
                      kind: "id",
                      loc: [18, 19, 18, 22],
                      text: "sum",
                      bindingKey: "sum$3lzby6qavzyep$10",
                    },
                  },
                  {
                    kind: "param",
                    loc: [18, 24, 18, 27],
                    name: {
                      kind: "id",
                      loc: [18, 24, 18, 27],
                      text: "one",
                      bindingKey: "one$3lzby6qavzyep$11",
                    },
                  },
                ],
                body: {
                  kind: "binop",
                  loc: [18, 32, 18, 41],
                  left: {
                    kind: "id",
                    loc: [18, 32, 18, 35],
                    text: "sum",
                    bindingKey: "sum$3lzby6qavzyep$10",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [18, 38, 18, 41],
                    text: "one",
                    bindingKey: "one$3lzby6qavzyep$11",
                  },
                },
              },
              {
                kind: "number",
                loc: [18, 43, 18, 44],
                value: 0,
              },
            ],
          },
        },
      },
    ],
  }),
);
