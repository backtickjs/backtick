import { cs } from "@backtickjs/core";
// The copying members: each answers with a new array and leaves the one it was
// given alone, which is what lets an array be a value here. `sort`, `reverse`
// and `splice` — the ones that write into the array instead — are absent.
const arrayCopyingMembers = cs.create(
  [6, 29, 23, 3],
  {
    version: "0.0.0",
    filePath: "arrayCopyingMembers.tsx",
    fileHash: "1epttfju3fh0b",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 32, 23, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 26],
        name: {
          kind: "id",
          loc: [7, 9, 7, 13],
          text: "rows",
          bindingKey: "rows$1epttfju3fh0b$0",
        },
        initializer: {
          kind: "arr",
          loc: [7, 16, 7, 25],
          elements: [
            {
              kind: "number",
              loc: [7, 17, 7, 18],
              value: 3,
            },
            {
              kind: "number",
              loc: [7, 20, 7, 21],
              value: 1,
            },
            {
              kind: "number",
              loc: [7, 23, 7, 24],
              value: 2,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 49],
        name: {
          kind: "id",
          loc: [8, 9, 8, 15],
          text: "sorted",
          bindingKey: "sorted$1epttfju3fh0b$1",
        },
        initializer: {
          kind: "()",
          loc: [8, 18, 8, 48],
          expression: {
            kind: ".",
            loc: [8, 18, 8, 31],
            expression: {
              kind: "id",
              loc: [8, 18, 8, 22],
              text: "rows",
              bindingKey: "rows$1epttfju3fh0b$0",
            },
            name: "toSorted",
          },
          arguments: [
            {
              kind: "=>",
              loc: [8, 32, 8, 47],
              parameters: [
                {
                  kind: "param",
                  loc: [8, 33, 8, 34],
                  name: {
                    kind: "id",
                    loc: [8, 33, 8, 34],
                    text: "a",
                    bindingKey: "a$1epttfju3fh0b$5",
                  },
                },
                {
                  kind: "param",
                  loc: [8, 36, 8, 37],
                  name: {
                    kind: "id",
                    loc: [8, 36, 8, 37],
                    text: "b",
                    bindingKey: "b$1epttfju3fh0b$6",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [8, 42, 8, 47],
                left: {
                  kind: "id",
                  loc: [8, 42, 8, 43],
                  text: "a",
                  bindingKey: "a$1epttfju3fh0b$5",
                },
                operatorToken: "-",
                right: {
                  kind: "id",
                  loc: [8, 46, 8, 47],
                  text: "b",
                  bindingKey: "b$1epttfju3fh0b$6",
                },
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [9, 3, 9, 38],
        name: {
          kind: "id",
          loc: [9, 9, 9, 17],
          text: "reversed",
          bindingKey: "reversed$1epttfju3fh0b$2",
        },
        initializer: {
          kind: "()",
          loc: [9, 20, 9, 37],
          expression: {
            kind: ".",
            loc: [9, 20, 9, 35],
            expression: {
              kind: "id",
              loc: [9, 20, 9, 24],
              text: "rows",
              bindingKey: "rows$1epttfju3fh0b$0",
            },
            name: "toReversed",
          },
          arguments: [],
        },
      },
      {
        kind: "const",
        loc: [10, 3, 10, 40],
        name: {
          kind: "id",
          loc: [10, 9, 10, 16],
          text: "spliced",
          bindingKey: "spliced$1epttfju3fh0b$3",
        },
        initializer: {
          kind: "()",
          loc: [10, 19, 10, 39],
          expression: {
            kind: ".",
            loc: [10, 19, 10, 33],
            expression: {
              kind: "id",
              loc: [10, 19, 10, 23],
              text: "rows",
              bindingKey: "rows$1epttfju3fh0b$0",
            },
            name: "toSpliced",
          },
          arguments: [
            {
              kind: "number",
              loc: [10, 34, 10, 35],
              value: 1,
            },
            {
              kind: "number",
              loc: [10, 37, 10, 38],
              value: 1,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [11, 3, 11, 44],
        name: {
          kind: "id",
          loc: [11, 9, 11, 17],
          text: "inserted",
          bindingKey: "inserted$1epttfju3fh0b$4",
        },
        initializer: {
          kind: "()",
          loc: [11, 20, 11, 43],
          expression: {
            kind: ".",
            loc: [11, 20, 11, 34],
            expression: {
              kind: "id",
              loc: [11, 20, 11, 24],
              text: "rows",
              bindingKey: "rows$1epttfju3fh0b$0",
            },
            name: "toSpliced",
          },
          arguments: [
            {
              kind: "number",
              loc: [11, 35, 11, 36],
              value: 1,
            },
            {
              kind: "number",
              loc: [11, 38, 11, 39],
              value: 0,
            },
            {
              kind: "number",
              loc: [11, 41, 11, 42],
              value: 9,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 22, 5],
        expression: {
          kind: "binop",
          loc: [13, 5, 21, 19],
          left: {
            kind: "binop",
            loc: [13, 5, 20, 8],
            left: {
              kind: "binop",
              loc: [13, 5, 19, 23],
              left: {
                kind: "binop",
                loc: [13, 5, 18, 8],
                left: {
                  kind: "binop",
                  loc: [13, 5, 17, 22],
                  left: {
                    kind: "binop",
                    loc: [13, 5, 16, 8],
                    left: {
                      kind: "binop",
                      loc: [13, 5, 15, 23],
                      left: {
                        kind: "binop",
                        loc: [13, 5, 14, 8],
                        left: {
                          kind: "()",
                          loc: [13, 5, 13, 21],
                          expression: {
                            kind: ".",
                            loc: [13, 5, 13, 16],
                            expression: {
                              kind: "id",
                              loc: [13, 5, 13, 11],
                              text: "sorted",
                              bindingKey: "sorted$1epttfju3fh0b$1",
                            },
                            name: "join",
                          },
                          arguments: [
                            {
                              kind: "string",
                              loc: [13, 17, 13, 20],
                              text: ",",
                            },
                          ],
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [14, 5, 14, 8],
                          text: "|",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [15, 5, 15, 23],
                        expression: {
                          kind: ".",
                          loc: [15, 5, 15, 18],
                          expression: {
                            kind: "id",
                            loc: [15, 5, 15, 13],
                            text: "reversed",
                            bindingKey: "reversed$1epttfju3fh0b$2",
                          },
                          name: "join",
                        },
                        arguments: [
                          {
                            kind: "string",
                            loc: [15, 19, 15, 22],
                            text: ",",
                          },
                        ],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [16, 5, 16, 8],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [17, 5, 17, 22],
                    expression: {
                      kind: ".",
                      loc: [17, 5, 17, 17],
                      expression: {
                        kind: "id",
                        loc: [17, 5, 17, 12],
                        text: "spliced",
                        bindingKey: "spliced$1epttfju3fh0b$3",
                      },
                      name: "join",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [17, 18, 17, 21],
                        text: ",",
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [18, 5, 18, 8],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [19, 5, 19, 23],
                expression: {
                  kind: ".",
                  loc: [19, 5, 19, 18],
                  expression: {
                    kind: "id",
                    loc: [19, 5, 19, 13],
                    text: "inserted",
                    bindingKey: "inserted$1epttfju3fh0b$4",
                  },
                  name: "join",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [19, 19, 19, 22],
                    text: ",",
                  },
                ],
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [20, 5, 20, 8],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [21, 5, 21, 19],
            expression: {
              kind: ".",
              loc: [21, 5, 21, 14],
              expression: {
                kind: "id",
                loc: [21, 5, 21, 9],
                text: "rows",
                bindingKey: "rows$1epttfju3fh0b$0",
              },
              name: "join",
            },
            arguments: [
              {
                kind: "string",
                loc: [21, 15, 21, 18],
                text: ",",
              },
            ],
          },
        },
      },
    ],
  }),
);
