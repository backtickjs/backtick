import { cs } from "@backtickjs/core";
// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one that
// already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
const arrayFrom = cs.create(
  [10, 19, 17, 3],
  {
    version: "0.0.0",
    filePath: "arrayFrom.tsx",
    fileHash: "11i7dekrfb9f2",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 22, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 70],
        name: {
          kind: "id",
          loc: [11, 9, 11, 16],
          text: "doubled",
          bindingKey: "doubled$11i7dekrfb9f2$0",
        },
        initializer: {
          kind: "()",
          loc: [11, 19, 11, 69],
          expression: {
            kind: "bltn",
            loc: [11, 19, 11, 29],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [11, 30, 11, 43],
              properties: [
                {
                  kind: ":",
                  loc: [11, 32, 11, 41],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [11, 40, 11, 41],
                    value: 4,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [11, 45, 11, 68],
              parameters: [
                {
                  kind: "param",
                  loc: [11, 46, 11, 47],
                  name: {
                    kind: "id",
                    loc: [11, 46, 11, 47],
                    text: "_",
                    bindingKey: "_$11i7dekrfb9f2$3",
                  },
                },
                {
                  kind: "param",
                  loc: [11, 49, 11, 54],
                  name: {
                    kind: "id",
                    loc: [11, 49, 11, 54],
                    text: "index",
                    bindingKey: "index$11i7dekrfb9f2$4",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [11, 59, 11, 68],
                left: {
                  kind: "id",
                  loc: [11, 59, 11, 64],
                  text: "index",
                  bindingKey: "index$11i7dekrfb9f2$4",
                },
                operatorToken: "*",
                right: {
                  kind: "number",
                  loc: [11, 67, 11, 68],
                  value: 2,
                },
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [12, 3, 12, 64],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "empty",
          bindingKey: "empty$11i7dekrfb9f2$1",
        },
        initializer: {
          kind: "()",
          loc: [12, 17, 12, 63],
          expression: {
            kind: "bltn",
            loc: [12, 17, 12, 27],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [12, 28, 12, 41],
              properties: [
                {
                  kind: ":",
                  loc: [12, 30, 12, 39],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [12, 38, 12, 39],
                    value: 0,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [12, 43, 12, 62],
              parameters: [
                {
                  kind: "param",
                  loc: [12, 44, 12, 45],
                  name: {
                    kind: "id",
                    loc: [12, 44, 12, 45],
                    text: "_",
                    bindingKey: "_$11i7dekrfb9f2$5",
                  },
                },
                {
                  kind: "param",
                  loc: [12, 47, 12, 52],
                  name: {
                    kind: "id",
                    loc: [12, 47, 12, 52],
                    text: "index",
                    bindingKey: "index$11i7dekrfb9f2$6",
                  },
                },
              ],
              body: {
                kind: "id",
                loc: [12, 57, 12, 62],
                text: "index",
                bindingKey: "index$11i7dekrfb9f2$6",
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [13, 3, 15, 5],
        name: {
          kind: "id",
          loc: [13, 9, 13, 15],
          text: "absent",
          bindingKey: "absent$11i7dekrfb9f2$2",
        },
        initializer: {
          kind: "()",
          loc: [13, 18, 15, 4],
          expression: {
            kind: "bltn",
            loc: [13, 18, 13, 28],
            name: "Array.from",
          },
          arguments: [
            {
              kind: "obj",
              loc: [13, 29, 13, 42],
              properties: [
                {
                  kind: ":",
                  loc: [13, 31, 13, 40],
                  name: "length",
                  initializer: {
                    kind: "number",
                    loc: [13, 39, 13, 40],
                    value: 2,
                  },
                },
              ],
            },
            {
              kind: "=>",
              loc: [13, 44, 14, 37],
              parameters: [
                {
                  kind: "param",
                  loc: [13, 45, 13, 50],
                  name: {
                    kind: "id",
                    loc: [13, 45, 13, 50],
                    text: "value",
                    bindingKey: "value$11i7dekrfb9f2$7",
                  },
                },
                {
                  kind: "param",
                  loc: [13, 52, 13, 57],
                  name: {
                    kind: "id",
                    loc: [13, 52, 13, 57],
                    text: "index",
                    bindingKey: "index$11i7dekrfb9f2$8",
                  },
                },
              ],
              body: {
                kind: "?:",
                loc: [14, 5, 14, 37],
                condition: {
                  kind: "binop",
                  loc: [14, 5, 14, 24],
                  left: {
                    kind: "id",
                    loc: [14, 5, 14, 10],
                    text: "value",
                    bindingKey: "value$11i7dekrfb9f2$7",
                  },
                  operatorToken: "===",
                  right: {
                    kind: "undefined",
                    loc: [14, 15, 14, 24],
                  },
                },
                whenTrue: {
                  kind: "id",
                  loc: [14, 27, 14, 32],
                  text: "index",
                  bindingKey: "index$11i7dekrfb9f2$8",
                },
                whenFalse: {
                  kind: "unop",
                  loc: [14, 35, 14, 37],
                  operator: "-",
                  operand: {
                    kind: "number",
                    loc: [14, 36, 14, 37],
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
        loc: [16, 3, 16, 74],
        expression: {
          kind: "binop",
          loc: [16, 10, 16, 73],
          left: {
            kind: "binop",
            loc: [16, 10, 16, 54],
            left: {
              kind: "binop",
              loc: [16, 10, 16, 48],
              left: {
                kind: "binop",
                loc: [16, 10, 16, 33],
                left: {
                  kind: "()",
                  loc: [16, 10, 16, 27],
                  expression: {
                    kind: ".",
                    loc: [16, 10, 16, 22],
                    expression: {
                      kind: "id",
                      loc: [16, 10, 16, 17],
                      text: "doubled",
                      bindingKey: "doubled$11i7dekrfb9f2$0",
                    },
                    name: "join",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [16, 23, 16, 26],
                      text: ",",
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [16, 30, 16, 33],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: ".",
                loc: [16, 36, 16, 48],
                expression: {
                  kind: "id",
                  loc: [16, 36, 16, 41],
                  text: "empty",
                  bindingKey: "empty$11i7dekrfb9f2$1",
                },
                name: "length",
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [16, 51, 16, 54],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [16, 57, 16, 73],
            expression: {
              kind: ".",
              loc: [16, 57, 16, 68],
              expression: {
                kind: "id",
                loc: [16, 57, 16, 63],
                text: "absent",
                bindingKey: "absent$11i7dekrfb9f2$2",
              },
              name: "join",
            },
            arguments: [
              {
                kind: "string",
                loc: [16, 69, 16, 72],
                text: ",",
              },
            ],
          },
        },
      },
    ],
  }),
);
