import { cs, For, state } from "@backtickjs/core";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.create(
    [7, 10, 26, 5],
    {
      version: "0.0.0",
      filePath: "SwappableRows.tsx",
      fileHash: "2n8fk66yaofr5",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 26, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 45],
          name: {
            kind: "id",
            loc: [8, 11, 8, 14],
            text: "ids",
            bindingKey: "ids$2n8fk66yaofr5$0",
          },
          initializer: {
            kind: "()",
            loc: [8, 17, 8, 44],
            expression: {
              kind: "splice",
              loc: [8, 17, 8, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [8, 34, 8, 43],
                elements: [
                  {
                    kind: "number",
                    loc: [8, 35, 8, 36],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [8, 38, 8, 39],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [8, 41, 8, 42],
                    value: 3,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [9, 5, 11, 7],
          name: {
            kind: "id",
            loc: [9, 11, 9, 15],
            text: "swap",
            bindingKey: "swap$2n8fk66yaofr5$1",
          },
          initializer: {
            kind: "=>",
            loc: [9, 18, 11, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [9, 24, 11, 6],
              statements: [
                {
                  kind: "()",
                  loc: [10, 7, 10, 67],
                  expression: {
                    kind: ".",
                    loc: [10, 7, 10, 17],
                    expression: {
                      kind: "id",
                      loc: [10, 7, 10, 10],
                      text: "ids",
                      bindingKey: "ids$2n8fk66yaofr5$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [10, 18, 10, 66],
                      parameters: [
                        {
                          kind: "param",
                          loc: [10, 19, 10, 23],
                          name: {
                            kind: "id",
                            loc: [10, 19, 10, 23],
                            text: "held",
                            bindingKey: "held$2n8fk66yaofr5$3",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [10, 28, 10, 66],
                        expression: {
                          kind: ".",
                          loc: [10, 28, 10, 54],
                          expression: {
                            kind: "()",
                            loc: [10, 28, 10, 49],
                            expression: {
                              kind: ".",
                              loc: [10, 28, 10, 37],
                              expression: {
                                kind: "id",
                                loc: [10, 28, 10, 32],
                                text: "held",
                                bindingKey: "held$2n8fk66yaofr5$3",
                              },
                              name: "with",
                            },
                            arguments: [
                              {
                                kind: "number",
                                loc: [10, 38, 10, 39],
                                value: 0,
                              },
                              {
                                kind: "[]",
                                loc: [10, 41, 10, 48],
                                expression: {
                                  kind: "id",
                                  loc: [10, 41, 10, 45],
                                  text: "held",
                                  bindingKey: "held$2n8fk66yaofr5$3",
                                },
                                argumentExpression: {
                                  kind: "number",
                                  loc: [10, 46, 10, 47],
                                  value: 2,
                                },
                              },
                            ],
                          },
                          name: "with",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [10, 55, 10, 56],
                            value: 2,
                          },
                          {
                            kind: "[]",
                            loc: [10, 58, 10, 65],
                            expression: {
                              kind: "id",
                              loc: [10, 58, 10, 62],
                              text: "held",
                              bindingKey: "held$2n8fk66yaofr5$3",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [10, 63, 10, 64],
                              value: 0,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "const",
          loc: [12, 5, 14, 7],
          name: {
            kind: "id",
            loc: [12, 11, 12, 15],
            text: "drop",
            bindingKey: "drop$2n8fk66yaofr5$2",
          },
          initializer: {
            kind: "=>",
            loc: [12, 18, 14, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [12, 24, 14, 6],
              statements: [
                {
                  kind: "()",
                  loc: [13, 7, 13, 58],
                  expression: {
                    kind: ".",
                    loc: [13, 7, 13, 17],
                    expression: {
                      kind: "id",
                      loc: [13, 7, 13, 10],
                      text: "ids",
                      bindingKey: "ids$2n8fk66yaofr5$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [13, 18, 13, 57],
                      parameters: [
                        {
                          kind: "param",
                          loc: [13, 19, 13, 23],
                          name: {
                            kind: "id",
                            loc: [13, 19, 13, 23],
                            text: "held",
                            bindingKey: "held$2n8fk66yaofr5$4",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [13, 28, 13, 57],
                        expression: {
                          kind: ".",
                          loc: [13, 28, 13, 39],
                          expression: {
                            kind: "id",
                            loc: [13, 28, 13, 32],
                            text: "held",
                            bindingKey: "held$2n8fk66yaofr5$4",
                          },
                          name: "filter",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [13, 40, 13, 56],
                            parameters: [
                              {
                                kind: "param",
                                loc: [13, 41, 13, 43],
                                name: {
                                  kind: "id",
                                  loc: [13, 41, 13, 43],
                                  text: "id",
                                  bindingKey: "id$2n8fk66yaofr5$5",
                                },
                              },
                            ],
                            body: {
                              kind: "binop",
                              loc: [13, 48, 13, 56],
                              left: {
                                kind: "id",
                                loc: [13, 48, 13, 50],
                                text: "id",
                                bindingKey: "id$2n8fk66yaofr5$5",
                              },
                              operatorToken: "!==",
                              right: {
                                kind: "number",
                                loc: [13, 55, 13, 56],
                                value: 2,
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [15, 5, 25, 7],
          expression: {
            kind: "jsx",
            loc: [16, 7, 24, 13],
            type: {
              kind: "string",
              loc: [16, 8, 16, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [17, 9, 17, 41],
                type: {
                  kind: "string",
                  loc: [17, 10, 17, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [17, 24, 17, 28],
                      text: "swap",
                      bindingKey: "swap$2n8fk66yaofr5$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [17, 30, 17, 34],
                    text: "swap",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [18, 9, 18, 41],
                type: {
                  kind: "string",
                  loc: [18, 10, 18, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [18, 24, 18, 28],
                      text: "drop",
                      bindingKey: "drop$2n8fk66yaofr5$2",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [18, 30, 18, 34],
                    text: "drop",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [19, 9, 23, 15],
                type: {
                  kind: "string",
                  loc: [19, 10, 19, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [20, 11, 22, 17],
                    type: {
                      kind: "splice",
                      loc: [20, 12, 20, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [20, 22, 20, 32],
                          expression: {
                            kind: ".",
                            loc: [20, 22, 20, 30],
                            expression: {
                              kind: "id",
                              loc: [20, 22, 20, 25],
                              text: "ids",
                              bindingKey: "ids$2n8fk66yaofr5$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [21, 14, 21, 56],
                        parameters: [
                          {
                            kind: "param",
                            loc: [21, 15, 21, 25],
                            name: {
                              kind: "id",
                              loc: [21, 15, 21, 17],
                              text: "id",
                              bindingKey: "id$2n8fk66yaofr5$6",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [21, 30, 21, 56],
                          type: {
                            kind: "string",
                            loc: [21, 31, 21, 35],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [21, 37, 21, 48],
                              left: {
                                kind: "string",
                                loc: [21, 37, 21, 43],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [21, 46, 21, 48],
                                text: "id",
                                bindingKey: "id$2n8fk66yaofr5$6",
                              },
                            },
                          ],
                        },
                      },
                    ],
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
