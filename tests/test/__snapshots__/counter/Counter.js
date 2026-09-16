import { cs, state } from "@backtickjs/core";
// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs.create(
    [5, 10, 13, 5],
    {
      version: "0.0.0",
      filePath: "Counter.tsx",
      fileHash: "3q413589nd302",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [5, 13, 13, 4],
      statements: [
        {
          kind: "const",
          loc: [6, 5, 6, 29],
          name: {
            kind: "id",
            loc: [6, 11, 6, 16],
            text: "count",
            bindingKey: "count$3q413589nd302$0",
          },
          initializer: {
            kind: "()",
            loc: [6, 19, 6, 28],
            expression: {
              kind: "splice",
              loc: [6, 19, 6, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [6, 26, 6, 27],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [7, 5, 12, 7],
          expression: {
            kind: "jsx",
            loc: [8, 7, 11, 13],
            type: {
              kind: "string",
              loc: [8, 8, 8, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [9, 9, 9, 75],
                type: {
                  kind: "string",
                  loc: [9, 10, 9, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [9, 26, 9, 61],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [9, 32, 9, 61],
                        expression: {
                          kind: ".",
                          loc: [9, 32, 9, 43],
                          expression: {
                            kind: "id",
                            loc: [9, 32, 9, 37],
                            text: "count",
                            bindingKey: "count$3q413589nd302$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [9, 44, 9, 60],
                            left: {
                              kind: "()",
                              loc: [9, 44, 9, 56],
                              expression: {
                                kind: ".",
                                loc: [9, 44, 9, 54],
                                expression: {
                                  kind: "id",
                                  loc: [9, 44, 9, 49],
                                  text: "count",
                                  bindingKey: "count$3q413589nd302$0",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [9, 59, 9, 60],
                              value: 1,
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [9, 63, 9, 66],
                    text: "Add",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [10, 9, 10, 42],
                type: {
                  kind: "string",
                  loc: [10, 10, 10, 11],
                  text: "p",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [10, 13, 10, 37],
                    left: {
                      kind: "string",
                      loc: [10, 13, 10, 22],
                      text: "Count: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [10, 25, 10, 37],
                      expression: {
                        kind: ".",
                        loc: [10, 25, 10, 35],
                        expression: {
                          kind: "id",
                          loc: [10, 25, 10, 30],
                          text: "count",
                          bindingKey: "count$3q413589nd302$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
