import { cs } from "@backtickjs/core";
// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one that
// already exists.
//
// The mapper's first argument is always `null` — the standard library passes
// the element it found, and against a `{ length }` source there is none.
export default cs.create(
  [9, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "array-from.ts",
    fileHash: "115m6ij244xfw",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 19, 16, 2],
    statements: [
      {
        kind: "const",
        loc: [10, 3, 10, 70],
        name: {
          kind: "id",
          loc: [10, 9, 10, 16],
          text: "doubled",
          bindingKey: "doubled$115m6ij244xfw$0",
        },
        initializer: {
          kind: "()",
          loc: [10, 19, 10, 69],
          expression: {
            kind: "bltn",
            loc: [10, 19, 10, 29],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [10, 30, 10, 43],
              properties: [
                {
                  kind: ":",
                  loc: [10, 32, 10, 41],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [10, 40, 10, 41],
                    value: 4,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [10, 45, 10, 68],
              parameters: [
                {
                  kind: "param",
                  loc: [10, 46, 10, 47],
                  name: {
                    kind: "id",
                    loc: [10, 46, 10, 47],
                    text: "_",
                    bindingKey: "_$115m6ij244xfw$3",
                  },
                },
                {
                  kind: "param",
                  loc: [10, 49, 10, 54],
                  name: {
                    kind: "id",
                    loc: [10, 49, 10, 54],
                    text: "index",
                    bindingKey: "index$115m6ij244xfw$4",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [10, 59, 10, 68],
                left: {
                  kind: "id",
                  loc: [10, 59, 10, 64],
                  text: "index",
                  bindingKey: "index$115m6ij244xfw$4",
                },
                operatorToken: "*",
                right: {
                  kind: "number",
                  loc: [10, 67, 10, 68],
                  value: 2,
                },
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [11, 3, 11, 64],
        name: {
          kind: "id",
          loc: [11, 9, 11, 14],
          text: "empty",
          bindingKey: "empty$115m6ij244xfw$1",
        },
        initializer: {
          kind: "()",
          loc: [11, 17, 11, 63],
          expression: {
            kind: "bltn",
            loc: [11, 17, 11, 27],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [11, 28, 11, 41],
              properties: [
                {
                  kind: ":",
                  loc: [11, 30, 11, 39],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [11, 38, 11, 39],
                    value: 0,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [11, 43, 11, 62],
              parameters: [
                {
                  kind: "param",
                  loc: [11, 44, 11, 45],
                  name: {
                    kind: "id",
                    loc: [11, 44, 11, 45],
                    text: "_",
                    bindingKey: "_$115m6ij244xfw$5",
                  },
                },
                {
                  kind: "param",
                  loc: [11, 47, 11, 52],
                  name: {
                    kind: "id",
                    loc: [11, 47, 11, 52],
                    text: "index",
                    bindingKey: "index$115m6ij244xfw$6",
                  },
                },
              ],
              body: {
                kind: "id",
                loc: [11, 57, 11, 62],
                text: "index",
                bindingKey: "index$115m6ij244xfw$6",
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [12, 3, 14, 5],
        name: {
          kind: "id",
          loc: [12, 9, 12, 15],
          text: "absent",
          bindingKey: "absent$115m6ij244xfw$2",
        },
        initializer: {
          kind: "()",
          loc: [12, 18, 14, 4],
          expression: {
            kind: "bltn",
            loc: [12, 18, 12, 28],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [12, 29, 12, 42],
              properties: [
                {
                  kind: ":",
                  loc: [12, 31, 12, 40],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [12, 39, 12, 40],
                    value: 2,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [12, 44, 13, 32],
              parameters: [
                {
                  kind: "param",
                  loc: [12, 45, 12, 50],
                  name: {
                    kind: "id",
                    loc: [12, 45, 12, 50],
                    text: "value",
                    bindingKey: "value$115m6ij244xfw$7",
                  },
                },
                {
                  kind: "param",
                  loc: [12, 52, 12, 57],
                  name: {
                    kind: "id",
                    loc: [12, 52, 12, 57],
                    text: "index",
                    bindingKey: "index$115m6ij244xfw$8",
                  },
                },
              ],
              body: {
                kind: "?:",
                loc: [13, 5, 13, 32],
                condition: {
                  kind: "binop",
                  loc: [13, 5, 13, 19],
                  left: {
                    kind: "id",
                    loc: [13, 5, 13, 10],
                    text: "value",
                    bindingKey: "value$115m6ij244xfw$7",
                  },
                  operatorToken: "===",
                  right: {
                    kind: "null",
                    loc: [13, 15, 13, 19],
                  },
                },
                whenTrue: {
                  kind: "id",
                  loc: [13, 22, 13, 27],
                  text: "index",
                  bindingKey: "index$115m6ij244xfw$8",
                },
                whenFalse: {
                  kind: "unop",
                  loc: [13, 30, 13, 32],
                  operator: "-",
                  operand: {
                    kind: "number",
                    loc: [13, 31, 13, 32],
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
        loc: [15, 3, 15, 74],
        expression: {
          kind: "binop",
          loc: [15, 10, 15, 73],
          left: {
            kind: "binop",
            loc: [15, 10, 15, 54],
            left: {
              kind: "binop",
              loc: [15, 10, 15, 48],
              left: {
                kind: "binop",
                loc: [15, 10, 15, 33],
                left: {
                  kind: "()",
                  loc: [15, 10, 15, 27],
                  expression: {
                    kind: ".",
                    loc: [15, 10, 15, 22],
                    expression: {
                      kind: "id",
                      loc: [15, 10, 15, 17],
                      text: "doubled",
                      bindingKey: "doubled$115m6ij244xfw$0",
                    },
                    name: "join",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [15, 23, 15, 26],
                      text: ",",
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [15, 30, 15, 33],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: ".",
                loc: [15, 36, 15, 48],
                expression: {
                  kind: "id",
                  loc: [15, 36, 15, 41],
                  text: "empty",
                  bindingKey: "empty$115m6ij244xfw$1",
                },
                name: "length",
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [15, 51, 15, 54],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [15, 57, 15, 73],
            expression: {
              kind: ".",
              loc: [15, 57, 15, 68],
              expression: {
                kind: "id",
                loc: [15, 57, 15, 63],
                text: "absent",
                bindingKey: "absent$115m6ij244xfw$2",
              },
              name: "join",
            },
            arguments: [
              {
                kind: "string",
                loc: [15, 69, 15, 72],
                text: ",",
              },
            ],
          },
        },
      },
    ],
  }),
);
