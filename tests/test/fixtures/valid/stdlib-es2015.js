import { cs } from "@backtickjs/core";
// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
export default cs.create(
  [6, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "stdlib-es2015.ts",
    fileHash: "220u2bsxg9lfj",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 19, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 28],
        name: {
          kind: "id",
          loc: [7, 9, 7, 11],
          text: "xs",
          bindingKey: "xs$220u2bsxg9lfj$0",
        },
        initializer: {
          kind: "arr",
          loc: [7, 14, 7, 27],
          elements: [
            {
              kind: "number",
              loc: [7, 15, 7, 16],
              value: 3,
            },
            {
              kind: "number",
              loc: [7, 18, 7, 19],
              value: 8,
            },
            {
              kind: "number",
              loc: [7, 21, 7, 23],
              value: 12,
            },
            {
              kind: "number",
              loc: [7, 25, 7, 26],
              value: 5,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 27],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "word",
          bindingKey: "word$220u2bsxg9lfj$1",
        },
        initializer: {
          kind: "string",
          loc: [8, 16, 8, 26],
          text: "backtick",
        },
      },
      {
        kind: "return",
        loc: [9, 3, 20, 5],
        expression: {
          kind: "obj",
          loc: [9, 10, 20, 4],
          properties: [
            {
              kind: ":",
              loc: [10, 5, 10, 33],
              name: "found",
              initializer: {
                kind: "()",
                loc: [10, 12, 10, 33],
                expression: {
                  kind: ".",
                  loc: [10, 12, 10, 19],
                  expression: {
                    kind: "id",
                    loc: [10, 12, 10, 14],
                    text: "xs",
                    bindingKey: "xs$220u2bsxg9lfj$0",
                  },
                  name: "find",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [10, 20, 10, 32],
                    parameters: [
                      {
                        kind: "param",
                        loc: [10, 21, 10, 22],
                        name: {
                          kind: "id",
                          loc: [10, 21, 10, 22],
                          text: "x",
                          bindingKey: "x$220u2bsxg9lfj$2",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [10, 27, 10, 32],
                      left: {
                        kind: "id",
                        loc: [10, 27, 10, 28],
                        text: "x",
                        bindingKey: "x$220u2bsxg9lfj$2",
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [10, 31, 10, 32],
                        value: 7,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [11, 5, 11, 51],
              name: "missing",
              initializer: {
                kind: "binop",
                loc: [11, 14, 11, 51],
                left: {
                  kind: "()",
                  loc: [11, 14, 11, 37],
                  expression: {
                    kind: ".",
                    loc: [11, 14, 11, 21],
                    expression: {
                      kind: "id",
                      loc: [11, 14, 11, 16],
                      text: "xs",
                      bindingKey: "xs$220u2bsxg9lfj$0",
                    },
                    name: "find",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [11, 22, 11, 36],
                      parameters: [
                        {
                          kind: "param",
                          loc: [11, 23, 11, 24],
                          name: {
                            kind: "id",
                            loc: [11, 23, 11, 24],
                            text: "x",
                            bindingKey: "x$220u2bsxg9lfj$3",
                          },
                        },
                      ],
                      body: {
                        kind: "binop",
                        loc: [11, 29, 11, 36],
                        left: {
                          kind: "id",
                          loc: [11, 29, 11, 30],
                          text: "x",
                          bindingKey: "x$220u2bsxg9lfj$3",
                        },
                        operatorToken: ">",
                        right: {
                          kind: "number",
                          loc: [11, 33, 11, 36],
                          value: 100,
                        },
                      },
                    },
                  ],
                },
                operatorToken: "===",
                right: {
                  kind: "undefined",
                  loc: [11, 42, 11, 51],
                },
              },
            },
            {
              kind: ":",
              loc: [12, 5, 12, 35],
              name: "at",
              initializer: {
                kind: "()",
                loc: [12, 9, 12, 35],
                expression: {
                  kind: ".",
                  loc: [12, 9, 12, 21],
                  expression: {
                    kind: "id",
                    loc: [12, 9, 12, 11],
                    text: "xs",
                    bindingKey: "xs$220u2bsxg9lfj$0",
                  },
                  name: "findIndex",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [12, 22, 12, 34],
                    parameters: [
                      {
                        kind: "param",
                        loc: [12, 23, 12, 24],
                        name: {
                          kind: "id",
                          loc: [12, 23, 12, 24],
                          text: "x",
                          bindingKey: "x$220u2bsxg9lfj$4",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [12, 29, 12, 34],
                      left: {
                        kind: "id",
                        loc: [12, 29, 12, 30],
                        text: "x",
                        bindingKey: "x$220u2bsxg9lfj$4",
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [12, 33, 12, 34],
                        value: 7,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [13, 5, 13, 42],
              name: "nowhere",
              initializer: {
                kind: "()",
                loc: [13, 14, 13, 42],
                expression: {
                  kind: ".",
                  loc: [13, 14, 13, 26],
                  expression: {
                    kind: "id",
                    loc: [13, 14, 13, 16],
                    text: "xs",
                    bindingKey: "xs$220u2bsxg9lfj$0",
                  },
                  name: "findIndex",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [13, 27, 13, 41],
                    parameters: [
                      {
                        kind: "param",
                        loc: [13, 28, 13, 29],
                        name: {
                          kind: "id",
                          loc: [13, 28, 13, 29],
                          text: "x",
                          bindingKey: "x$220u2bsxg9lfj$5",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [13, 34, 13, 41],
                      left: {
                        kind: "id",
                        loc: [13, 34, 13, 35],
                        text: "x",
                        bindingKey: "x$220u2bsxg9lfj$5",
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [13, 38, 13, 41],
                        value: 100,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [14, 5, 14, 36],
              name: "includes",
              initializer: {
                kind: "()",
                loc: [14, 15, 14, 36],
                expression: {
                  kind: ".",
                  loc: [14, 15, 14, 28],
                  expression: {
                    kind: "id",
                    loc: [14, 15, 14, 19],
                    text: "word",
                    bindingKey: "word$220u2bsxg9lfj$1",
                  },
                  name: "includes",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [14, 29, 14, 35],
                    text: "tick",
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [15, 5, 15, 40],
              name: "startsWith",
              initializer: {
                kind: "()",
                loc: [15, 17, 15, 40],
                expression: {
                  kind: ".",
                  loc: [15, 17, 15, 32],
                  expression: {
                    kind: "id",
                    loc: [15, 17, 15, 21],
                    text: "word",
                    bindingKey: "word$220u2bsxg9lfj$1",
                  },
                  name: "startsWith",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [15, 33, 15, 39],
                    text: "back",
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [16, 5, 16, 39],
              name: "endsWith",
              initializer: {
                kind: "()",
                loc: [16, 15, 16, 39],
                expression: {
                  kind: ".",
                  loc: [16, 15, 16, 28],
                  expression: {
                    kind: "id",
                    loc: [16, 15, 16, 19],
                    text: "word",
                    bindingKey: "word$220u2bsxg9lfj$1",
                  },
                  name: "endsWith",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [16, 29, 16, 35],
                    text: "tick",
                  },
                  {
                    kind: "number",
                    loc: [16, 37, 16, 38],
                    value: 4,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [17, 5, 17, 29],
              name: "repeated",
              initializer: {
                kind: "()",
                loc: [17, 15, 17, 29],
                expression: {
                  kind: ".",
                  loc: [17, 15, 17, 26],
                  expression: {
                    kind: "string",
                    loc: [17, 15, 17, 19],
                    text: "ab",
                  },
                  name: "repeat",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [17, 27, 17, 28],
                    value: 3,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [18, 5, 18, 42],
              name: "codePoint",
              initializer: {
                kind: "()",
                loc: [18, 16, 18, 42],
                expression: {
                  kind: ".",
                  loc: [18, 16, 18, 39],
                  expression: {
                    kind: "string",
                    loc: [18, 16, 18, 27],
                    text: "\uD83D\uDE00",
                  },
                  name: "codePointAt",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [18, 40, 18, 41],
                    value: 0,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [19, 5, 19, 38],
              name: "keys",
              initializer: {
                kind: "()",
                loc: [19, 11, 19, 38],
                expression: {
                  kind: "bltn",
                  loc: [19, 11, 19, 22],
                  name: "Object.keys",
                },
                arguments: [
                  {
                    kind: "obj",
                    loc: [19, 23, 19, 37],
                    properties: [
                      {
                        kind: ":",
                        loc: [19, 25, 19, 29],
                        name: "a",
                        initializer: {
                          kind: "number",
                          loc: [19, 28, 19, 29],
                          value: 1,
                        },
                      },
                      {
                        kind: ":",
                        loc: [19, 31, 19, 35],
                        name: "b",
                        initializer: {
                          kind: "number",
                          loc: [19, 34, 19, 35],
                          value: 2,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }),
);
