import { cs } from "@backtickjs/core";
// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
const forNestedShadowing = cs.create(
  [6, 28, 15, 3],
  {
    version: "0.0.0",
    filePath: "forNestedShadowing.tsx",
    fileHash: "1wwnhegq0x7s1",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 31, 15, 2],
    statements: [
      {
        kind: "let",
        loc: [7, 3, 7, 16],
        name: {
          kind: "id",
          loc: [7, 7, 7, 10],
          text: "out",
          bindingKey: "out$1wwnhegq0x7s1$0",
        },
        initializer: {
          kind: "string",
          loc: [7, 13, 7, 15],
          text: "",
        },
      },
      {
        kind: "for",
        loc: [8, 3, 13, 4],
        initializer: {
          kind: "let",
          loc: [8, 8, 8, 17],
          name: {
            kind: "id",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$1wwnhegq0x7s1$1",
          },
          initializer: {
            kind: "number",
            loc: [8, 16, 8, 17],
            value: 0,
          },
        },
        condition: {
          kind: "binop",
          loc: [8, 19, 8, 24],
          left: {
            kind: "id",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$1wwnhegq0x7s1$1",
          },
          operatorToken: "<",
          right: {
            kind: "number",
            loc: [8, 23, 8, 24],
            value: 2,
          },
        },
        incrementor: {
          kind: "binop",
          loc: [8, 26, 8, 35],
          left: {
            kind: "id",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$1wwnhegq0x7s1$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [8, 30, 8, 35],
            left: {
              kind: "id",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$1wwnhegq0x7s1$1",
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "{}",
          loc: [8, 37, 13, 4],
          statements: [
            {
              kind: "const",
              loc: [9, 5, 9, 19],
              name: {
                kind: "id",
                loc: [9, 11, 9, 12],
                text: "i",
                bindingKey: "i$1wwnhegq0x7s1$2",
              },
              initializer: {
                kind: "string",
                loc: [9, 15, 9, 18],
                text: "-",
              },
            },
            {
              kind: "for",
              loc: [10, 5, 12, 6],
              initializer: {
                kind: "let",
                loc: [10, 10, 10, 19],
                name: {
                  kind: "id",
                  loc: [10, 14, 10, 15],
                  text: "j",
                  bindingKey: "j$1wwnhegq0x7s1$3",
                },
                initializer: {
                  kind: "number",
                  loc: [10, 18, 10, 19],
                  value: 0,
                },
              },
              condition: {
                kind: "binop",
                loc: [10, 21, 10, 26],
                left: {
                  kind: "id",
                  loc: [10, 21, 10, 22],
                  text: "j",
                  bindingKey: "j$1wwnhegq0x7s1$3",
                },
                operatorToken: "<",
                right: {
                  kind: "number",
                  loc: [10, 25, 10, 26],
                  value: 2,
                },
              },
              incrementor: {
                kind: "binop",
                loc: [10, 28, 10, 37],
                left: {
                  kind: "id",
                  loc: [10, 28, 10, 29],
                  text: "j",
                  bindingKey: "j$1wwnhegq0x7s1$3",
                },
                operatorToken: "=",
                right: {
                  kind: "binop",
                  loc: [10, 32, 10, 37],
                  left: {
                    kind: "id",
                    loc: [10, 32, 10, 33],
                    text: "j",
                    bindingKey: "j$1wwnhegq0x7s1$3",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "number",
                    loc: [10, 36, 10, 37],
                    value: 1,
                  },
                },
              },
              statement: {
                kind: "{}",
                loc: [10, 39, 12, 6],
                statements: [
                  {
                    kind: "binop",
                    loc: [11, 7, 11, 24],
                    left: {
                      kind: "id",
                      loc: [11, 7, 11, 10],
                      text: "out",
                      bindingKey: "out$1wwnhegq0x7s1$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [11, 13, 11, 24],
                      left: {
                        kind: "binop",
                        loc: [11, 13, 11, 20],
                        left: {
                          kind: "id",
                          loc: [11, 13, 11, 16],
                          text: "out",
                          bindingKey: "out$1wwnhegq0x7s1$0",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [11, 19, 11, 20],
                          text: "i",
                          bindingKey: "i$1wwnhegq0x7s1$2",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [11, 23, 11, 24],
                        text: "j",
                        bindingKey: "j$1wwnhegq0x7s1$3",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [14, 3, 14, 14],
        expression: {
          kind: "id",
          loc: [14, 10, 14, 13],
          text: "out",
          bindingKey: "out$1wwnhegq0x7s1$0",
        },
      },
    ],
  }),
);
