import { cs } from "@backtickjs/core";
// A record read as pairs and built back from them: how a script makes a record
// whose keys it only learns when it runs.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "object-entries.ts",
    fileHash: "11w1in5bkoy6w",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 11, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 35],
        name: {
          kind: "id",
          loc: [6, 9, 6, 13],
          text: "held",
          bindingKey: "held$11w1in5bkoy6w$0",
        },
        initializer: {
          kind: "obj",
          loc: [6, 16, 6, 34],
          properties: [
            {
              kind: ":",
              loc: [6, 18, 6, 22],
              name: "n",
              initializer: {
                kind: "number",
                loc: [6, 21, 6, 22],
                value: 1,
              },
            },
            {
              kind: ":",
              loc: [6, 24, 6, 32],
              name: "q",
              initializer: {
                kind: "string",
                loc: [6, 27, 6, 32],
                text: "ada",
              },
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [7, 3, 9, 5],
        name: {
          kind: "id",
          loc: [7, 9, 7, 16],
          text: "written",
          bindingKey: "written$11w1in5bkoy6w$1",
        },
        initializer: {
          kind: "()",
          loc: [7, 19, 9, 4],
          expression: {
            kind: "bltn",
            loc: [7, 19, 7, 37],
            name: "Object.fromEntries",
          },
          arguments: [
            {
              kind: "()",
              loc: [8, 5, 8, 75],
              expression: {
                kind: ".",
                loc: [8, 5, 8, 29],
                expression: {
                  kind: "()",
                  loc: [8, 5, 8, 25],
                  expression: {
                    kind: "bltn",
                    loc: [8, 5, 8, 19],
                    name: "Object.entries",
                  },
                  arguments: [
                    {
                      kind: "id",
                      loc: [8, 20, 8, 24],
                      text: "held",
                      bindingKey: "held$11w1in5bkoy6w$0",
                    },
                  ],
                },
                name: "map",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [8, 30, 8, 74],
                  parameters: [
                    {
                      kind: "param",
                      loc: [8, 31, 8, 35],
                      name: {
                        kind: "id",
                        loc: [8, 31, 8, 35],
                        text: "pair",
                        bindingKey: "pair$11w1in5bkoy6w$2",
                      },
                    },
                  ],
                  body: {
                    kind: "arr",
                    loc: [8, 40, 8, 74],
                    elements: [
                      {
                        kind: "[]",
                        loc: [8, 41, 8, 48],
                        expression: {
                          kind: "id",
                          loc: [8, 41, 8, 45],
                          text: "pair",
                          bindingKey: "pair$11w1in5bkoy6w$2",
                        },
                        argumentExpression: {
                          kind: "number",
                          loc: [8, 46, 8, 47],
                          value: 0,
                        },
                      },
                      {
                        kind: "()",
                        loc: [8, 50, 8, 73],
                        expression: {
                          kind: "bltn",
                          loc: [8, 50, 8, 64],
                          name: "JSON.stringify",
                        },
                        arguments: [
                          {
                            kind: "[]",
                            loc: [8, 65, 8, 72],
                            expression: {
                              kind: "id",
                              loc: [8, 65, 8, 69],
                              text: "pair",
                              bindingKey: "pair$11w1in5bkoy6w$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [8, 70, 8, 71],
                              value: 1,
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [10, 3, 10, 38],
        expression: {
          kind: "binop",
          loc: [10, 10, 10, 37],
          left: {
            kind: "binop",
            loc: [10, 10, 10, 25],
            left: {
              kind: ".",
              loc: [10, 10, 10, 19],
              expression: {
                kind: "id",
                loc: [10, 10, 10, 17],
                text: "written",
                bindingKey: "written$11w1in5bkoy6w$1",
              },
              name: "n",
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [10, 22, 10, 25],
              text: " ",
            },
          },
          operatorToken: "+",
          right: {
            kind: ".",
            loc: [10, 28, 10, 37],
            expression: {
              kind: "id",
              loc: [10, 28, 10, 35],
              text: "written",
              bindingKey: "written$11w1in5bkoy6w$1",
            },
            name: "q",
          },
        },
      },
    ],
  }),
);
