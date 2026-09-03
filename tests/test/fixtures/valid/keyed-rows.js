import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  return cs.create(
    [12, 10, 31, 5],
    {
      version: "0.0.0",
      filePath: "keyed-rows.tsx",
      fileHash: "1879rjsuy33z2",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 31, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 45],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "ids",
            bindingKey: "ids$1879rjsuy33z2$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 17, 13, 44],
            expression: {
              kind: "splice",
              loc: [13, 17, 13, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [13, 34, 13, 43],
                elements: [
                  {
                    kind: "number",
                    loc: [13, 35, 13, 36],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [13, 38, 13, 39],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [13, 41, 13, 42],
                    value: 3,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [14, 5, 16, 7],
          name: {
            kind: "id",
            loc: [14, 11, 14, 15],
            text: "swap",
            bindingKey: "swap$1879rjsuy33z2$1",
          },
          initializer: {
            kind: "=>",
            loc: [14, 18, 16, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [14, 24, 16, 6],
              statements: [
                {
                  kind: "()",
                  loc: [15, 7, 15, 67],
                  expression: {
                    kind: ".",
                    loc: [15, 7, 15, 17],
                    expression: {
                      kind: "id",
                      loc: [15, 7, 15, 10],
                      text: "ids",
                      bindingKey: "ids$1879rjsuy33z2$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [15, 18, 15, 66],
                      parameters: [
                        {
                          kind: "param",
                          loc: [15, 19, 15, 23],
                          name: {
                            kind: "id",
                            loc: [15, 19, 15, 23],
                            text: "held",
                            bindingKey: "held$1879rjsuy33z2$3",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [15, 28, 15, 66],
                        expression: {
                          kind: ".",
                          loc: [15, 28, 15, 54],
                          expression: {
                            kind: "()",
                            loc: [15, 28, 15, 49],
                            expression: {
                              kind: ".",
                              loc: [15, 28, 15, 37],
                              expression: {
                                kind: "id",
                                loc: [15, 28, 15, 32],
                                text: "held",
                                bindingKey: "held$1879rjsuy33z2$3",
                              },
                              name: "with",
                            },
                            arguments: [
                              {
                                kind: "number",
                                loc: [15, 38, 15, 39],
                                value: 0,
                              },
                              {
                                kind: "[]",
                                loc: [15, 41, 15, 48],
                                expression: {
                                  kind: "id",
                                  loc: [15, 41, 15, 45],
                                  text: "held",
                                  bindingKey: "held$1879rjsuy33z2$3",
                                },
                                argumentExpression: {
                                  kind: "number",
                                  loc: [15, 46, 15, 47],
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
                            loc: [15, 55, 15, 56],
                            value: 2,
                          },
                          {
                            kind: "[]",
                            loc: [15, 58, 15, 65],
                            expression: {
                              kind: "id",
                              loc: [15, 58, 15, 62],
                              text: "held",
                              bindingKey: "held$1879rjsuy33z2$3",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [15, 63, 15, 64],
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
          loc: [17, 5, 19, 7],
          name: {
            kind: "id",
            loc: [17, 11, 17, 15],
            text: "drop",
            bindingKey: "drop$1879rjsuy33z2$2",
          },
          initializer: {
            kind: "=>",
            loc: [17, 18, 19, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [17, 24, 19, 6],
              statements: [
                {
                  kind: "()",
                  loc: [18, 7, 18, 58],
                  expression: {
                    kind: ".",
                    loc: [18, 7, 18, 17],
                    expression: {
                      kind: "id",
                      loc: [18, 7, 18, 10],
                      text: "ids",
                      bindingKey: "ids$1879rjsuy33z2$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [18, 18, 18, 57],
                      parameters: [
                        {
                          kind: "param",
                          loc: [18, 19, 18, 23],
                          name: {
                            kind: "id",
                            loc: [18, 19, 18, 23],
                            text: "held",
                            bindingKey: "held$1879rjsuy33z2$4",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [18, 28, 18, 57],
                        expression: {
                          kind: ".",
                          loc: [18, 28, 18, 39],
                          expression: {
                            kind: "id",
                            loc: [18, 28, 18, 32],
                            text: "held",
                            bindingKey: "held$1879rjsuy33z2$4",
                          },
                          name: "filter",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [18, 40, 18, 56],
                            parameters: [
                              {
                                kind: "param",
                                loc: [18, 41, 18, 43],
                                name: {
                                  kind: "id",
                                  loc: [18, 41, 18, 43],
                                  text: "id",
                                  bindingKey: "id$1879rjsuy33z2$5",
                                },
                              },
                            ],
                            body: {
                              kind: "binop",
                              loc: [18, 48, 18, 56],
                              left: {
                                kind: "id",
                                loc: [18, 48, 18, 50],
                                text: "id",
                                bindingKey: "id$1879rjsuy33z2$5",
                              },
                              operatorToken: "!==",
                              right: {
                                kind: "number",
                                loc: [18, 55, 18, 56],
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
          loc: [20, 5, 30, 7],
          expression: {
            kind: "jsx",
            loc: [21, 7, 29, 13],
            type: {
              kind: "string",
              loc: [21, 8, 21, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [22, 9, 22, 41],
                type: {
                  kind: "string",
                  loc: [22, 10, 22, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [22, 24, 22, 28],
                      text: "swap",
                      bindingKey: "swap$1879rjsuy33z2$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [22, 30, 22, 34],
                    text: "swap",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [23, 9, 23, 41],
                type: {
                  kind: "string",
                  loc: [23, 10, 23, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [23, 24, 23, 28],
                      text: "drop",
                      bindingKey: "drop$1879rjsuy33z2$2",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [23, 30, 23, 34],
                    text: "drop",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [24, 9, 28, 15],
                type: {
                  kind: "string",
                  loc: [24, 10, 24, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [25, 11, 27, 17],
                    type: {
                      kind: "splice",
                      loc: [25, 12, 25, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [25, 22, 25, 32],
                          expression: {
                            kind: ".",
                            loc: [25, 22, 25, 30],
                            expression: {
                              kind: "id",
                              loc: [25, 22, 25, 25],
                              text: "ids",
                              bindingKey: "ids$1879rjsuy33z2$0",
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
                        loc: [26, 14, 26, 56],
                        parameters: [
                          {
                            kind: "param",
                            loc: [26, 15, 26, 25],
                            name: {
                              kind: "id",
                              loc: [26, 15, 26, 17],
                              text: "id",
                              bindingKey: "id$1879rjsuy33z2$6",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [26, 30, 26, 56],
                          type: {
                            kind: "string",
                            loc: [26, 31, 26, 35],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [26, 37, 26, 48],
                              left: {
                                kind: "string",
                                loc: [26, 37, 26, 43],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [26, 46, 26, 48],
                                text: "id",
                                bindingKey: "id$1879rjsuy33z2$6",
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
export default _jsx(Rows, {});
