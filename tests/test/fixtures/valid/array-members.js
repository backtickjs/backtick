import { cs } from "@backtickjs/core";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
export default cs.create(
  [5, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "array-members.ts",
    fileHash: "3kt9mhwly650i",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 18, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 27],
        name: {
          kind: "id",
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$3kt9mhwly650i$0",
        },
        initializer: {
          kind: "arr",
          loc: [6, 17, 6, 26],
          elements: [
            {
              kind: "number",
              loc: [6, 18, 6, 19],
              value: 1,
            },
            {
              kind: "number",
              loc: [6, 21, 6, 22],
              value: 2,
            },
            {
              kind: "number",
              loc: [6, 24, 6, 25],
              value: 3,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [7, 3, 7, 18],
        name: {
          kind: "id",
          loc: [7, 9, 7, 13],
          text: "four",
          bindingKey: "four$3kt9mhwly650i$1",
        },
        initializer: {
          kind: "number",
          loc: [7, 16, 7, 17],
          value: 4,
        },
      },
      {
        kind: "return",
        loc: [8, 3, 17, 5],
        expression: {
          kind: "obj",
          loc: [8, 10, 17, 4],
          properties: [
            {
              kind: ":",
              loc: [9, 5, 9, 24],
              name: "count",
              initializer: {
                kind: ".",
                loc: [9, 12, 9, 24],
                expression: {
                  kind: "id",
                  loc: [9, 12, 9, 17],
                  text: "coins",
                  bindingKey: "coins$3kt9mhwly650i$0",
                },
                name: "length",
              },
            },
            {
              kind: ":",
              loc: [10, 5, 10, 30],
              name: "all",
              initializer: {
                kind: "()",
                loc: [10, 10, 10, 30],
                expression: {
                  kind: ".",
                  loc: [10, 10, 10, 22],
                  expression: {
                    kind: "id",
                    loc: [10, 10, 10, 15],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "concat",
                },
                arguments: [
                  {
                    kind: "arr",
                    loc: [10, 23, 10, 29],
                    elements: [
                      {
                        kind: "id",
                        loc: [10, 24, 10, 28],
                        text: "four",
                        bindingKey: "four$3kt9mhwly650i$1",
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [11, 5, 11, 28],
              name: "part",
              initializer: {
                kind: "()",
                loc: [11, 11, 11, 28],
                expression: {
                  kind: ".",
                  loc: [11, 11, 11, 22],
                  expression: {
                    kind: "id",
                    loc: [11, 11, 11, 16],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "slice",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [11, 23, 11, 24],
                    value: 0,
                  },
                  {
                    kind: "number",
                    loc: [11, 26, 11, 27],
                    value: 2,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [12, 5, 12, 28],
              name: "where",
              initializer: {
                kind: "()",
                loc: [12, 12, 12, 28],
                expression: {
                  kind: ".",
                  loc: [12, 12, 12, 25],
                  expression: {
                    kind: "id",
                    loc: [12, 12, 12, 17],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "indexOf",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [12, 26, 12, 27],
                    value: 2,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [13, 5, 13, 27],
              name: "has",
              initializer: {
                kind: "()",
                loc: [13, 10, 13, 27],
                expression: {
                  kind: ".",
                  loc: [13, 10, 13, 24],
                  expression: {
                    kind: "id",
                    loc: [13, 10, 13, 15],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "includes",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [13, 25, 13, 26],
                    value: 3,
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [14, 5, 14, 26],
              name: "text",
              initializer: {
                kind: "()",
                loc: [14, 11, 14, 26],
                expression: {
                  kind: ".",
                  loc: [14, 11, 14, 21],
                  expression: {
                    kind: "id",
                    loc: [14, 11, 14, 16],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "join",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [14, 22, 14, 25],
                    text: "-",
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [15, 5, 15, 37],
              name: "doubled",
              initializer: {
                kind: "()",
                loc: [15, 14, 15, 37],
                expression: {
                  kind: ".",
                  loc: [15, 14, 15, 23],
                  expression: {
                    kind: "id",
                    loc: [15, 14, 15, 19],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "map",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [15, 24, 15, 36],
                    parameters: [
                      {
                        kind: "param",
                        loc: [15, 25, 15, 26],
                        name: {
                          kind: "id",
                          loc: [15, 25, 15, 26],
                          text: "n",
                          bindingKey: "n$3kt9mhwly650i$2",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [15, 31, 15, 36],
                      left: {
                        kind: "id",
                        loc: [15, 31, 15, 32],
                        text: "n",
                        bindingKey: "n$3kt9mhwly650i$2",
                      },
                      operatorToken: "*",
                      right: {
                        kind: "number",
                        loc: [15, 35, 15, 36],
                        value: 2,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: ":",
              loc: [16, 5, 16, 38],
              name: "small",
              initializer: {
                kind: "()",
                loc: [16, 12, 16, 38],
                expression: {
                  kind: ".",
                  loc: [16, 12, 16, 24],
                  expression: {
                    kind: "id",
                    loc: [16, 12, 16, 17],
                    text: "coins",
                    bindingKey: "coins$3kt9mhwly650i$0",
                  },
                  name: "filter",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [16, 25, 16, 37],
                    parameters: [
                      {
                        kind: "param",
                        loc: [16, 26, 16, 27],
                        name: {
                          kind: "id",
                          loc: [16, 26, 16, 27],
                          text: "n",
                          bindingKey: "n$3kt9mhwly650i$3",
                        },
                      },
                    ],
                    body: {
                      kind: "binop",
                      loc: [16, 32, 16, 37],
                      left: {
                        kind: "id",
                        loc: [16, 32, 16, 33],
                        text: "n",
                        bindingKey: "n$3kt9mhwly650i$3",
                      },
                      operatorToken: "<",
                      right: {
                        kind: "number",
                        loc: [16, 36, 16, 37],
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
);
