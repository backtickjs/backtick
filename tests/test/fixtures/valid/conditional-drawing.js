import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web";
// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this fixture does not stop.
async function Held({ again }) {
  return cs.create(
    [20, 10, 30, 5],
    {
      version: "0.0.0",
      filePath: "conditional-drawing.tsx",
      fileHash: "1avujo8u5tjkr",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $again: { value: again, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [20, 13, 30, 4],
      statements: [
        {
          kind: "const",
          loc: [21, 5, 21, 33],
          name: {
            kind: "id",
            loc: [21, 11, 21, 16],
            text: "shown",
            bindingKey: "shown$1avujo8u5tjkr$0",
          },
          initializer: {
            kind: "()",
            loc: [21, 19, 21, 32],
            expression: {
              kind: "splice",
              loc: [21, 19, 21, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "false",
                loc: [21, 26, 21, 31],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [23, 5, 27, 11],
          name: {
            kind: "id",
            loc: [23, 11, 23, 18],
            text: "started",
            bindingKey: "started$1avujo8u5tjkr$1",
          },
          initializer: {
            kind: "()",
            loc: [23, 21, 27, 10],
            expression: {
              kind: ".",
              loc: [23, 21, 23, 39],
              expression: {
                kind: "splice",
                loc: [23, 21, 23, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [23, 40, 27, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [23, 46, 27, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [24, 7, 26, 8],
                      expression: {
                        kind: "()",
                        loc: [24, 11, 24, 19],
                        expression: {
                          kind: "splice",
                          loc: [24, 11, 24, 17],
                          key: "$again",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [24, 21, 26, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [25, 9, 25, 26],
                            expression: {
                              kind: ".",
                              loc: [25, 9, 25, 20],
                              expression: {
                                kind: "id",
                                loc: [25, 9, 25, 14],
                                text: "shown",
                                bindingKey: "shown$1avujo8u5tjkr$0",
                              },
                              name: "write",
                            },
                            arguments: [
                              {
                                kind: "true",
                                loc: [25, 21, 25, 25],
                              },
                            ],
                          },
                        ],
                      },
                      elseStatement: null,
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [27, 8, 27, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [29, 5, 29, 66],
          expression: {
            kind: "jsx",
            loc: [29, 12, 29, 65],
            type: {
              kind: "string",
              loc: [29, 12, 29, 65],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "?:",
                loc: [29, 15, 29, 61],
                condition: {
                  kind: "()",
                  loc: [29, 15, 29, 27],
                  expression: {
                    kind: ".",
                    loc: [29, 15, 29, 25],
                    expression: {
                      kind: "id",
                      loc: [29, 15, 29, 20],
                      text: "shown",
                      bindingKey: "shown$1avujo8u5tjkr$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                whenTrue: {
                  kind: "jsx",
                  loc: [29, 30, 29, 44],
                  type: {
                    kind: "string",
                    loc: [29, 31, 29, 33],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [29, 34, 29, 39],
                      text: "shown",
                    },
                  ],
                },
                whenFalse: {
                  kind: "jsx",
                  loc: [29, 47, 29, 61],
                  type: {
                    kind: "string",
                    loc: [29, 48, 29, 49],
                    text: "i",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [29, 50, 29, 57],
                      text: "waiting",
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
}
export default cs.create(
  [33, 16, 49, 3],
  {
    version: "0.0.0",
    filePath: "conditional-drawing.tsx",
    fileHash: "1avujo8u5tjkr",
    splices: {
      $state: { value: state, params: [] },
      $Held: { value: Held, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [33, 19, 49, 2],
    statements: [
      {
        kind: "const",
        loc: [34, 3, 34, 28],
        name: {
          kind: "id",
          loc: [34, 9, 34, 15],
          text: "builds",
          bindingKey: "builds$1avujo8u5tjkr$2",
        },
        initializer: {
          kind: "()",
          loc: [34, 18, 34, 27],
          expression: {
            kind: "splice",
            loc: [34, 18, 34, 24],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [34, 25, 34, 26],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [36, 3, 48, 5],
        expression: {
          kind: "jsx",
          loc: [37, 5, 47, 11],
          type: {
            kind: "string",
            loc: [37, 6, 37, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [38, 7, 38, 47],
              type: {
                kind: "string",
                loc: [38, 8, 38, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [38, 14, 38, 39],
                  left: {
                    kind: "string",
                    loc: [38, 14, 38, 23],
                    text: "builds ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [38, 26, 38, 39],
                    expression: {
                      kind: ".",
                      loc: [38, 26, 38, 37],
                      expression: {
                        kind: "id",
                        loc: [38, 26, 38, 32],
                        text: "builds",
                        bindingKey: "builds$1avujo8u5tjkr$2",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [39, 7, 46, 17],
              type: {
                kind: "string",
                loc: [39, 8, 39, 15],
                text: "section",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [40, 9, 45, 11],
                  type: {
                    kind: "splice",
                    loc: [40, 10, 40, 14],
                    key: "$Held",
                  },
                  attributes: [
                    {
                      name: "again",
                      initializer: {
                        kind: "=>",
                        loc: [41, 18, 44, 12],
                        parameters: [],
                        body: {
                          kind: "{}",
                          loc: [41, 24, 44, 12],
                          statements: [
                            {
                              kind: "()",
                              loc: [42, 13, 42, 44],
                              expression: {
                                kind: ".",
                                loc: [42, 13, 42, 25],
                                expression: {
                                  kind: "id",
                                  loc: [42, 13, 42, 19],
                                  text: "builds",
                                  bindingKey: "builds$1avujo8u5tjkr$2",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "binop",
                                  loc: [42, 26, 42, 43],
                                  left: {
                                    kind: "()",
                                    loc: [42, 26, 42, 39],
                                    expression: {
                                      kind: ".",
                                      loc: [42, 26, 42, 37],
                                      expression: {
                                        kind: "id",
                                        loc: [42, 26, 42, 32],
                                        text: "builds",
                                        bindingKey: "builds$1avujo8u5tjkr$2",
                                      },
                                      name: "read",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "number",
                                    loc: [42, 42, 42, 43],
                                    value: 1,
                                  },
                                },
                              ],
                            },
                            {
                              kind: "return",
                              loc: [43, 13, 43, 38],
                              expression: {
                                kind: "binop",
                                loc: [43, 20, 43, 37],
                                left: {
                                  kind: "()",
                                  loc: [43, 20, 43, 33],
                                  expression: {
                                    kind: ".",
                                    loc: [43, 20, 43, 31],
                                    expression: {
                                      kind: "id",
                                      loc: [43, 20, 43, 26],
                                      text: "builds",
                                      bindingKey: "builds$1avujo8u5tjkr$2",
                                    },
                                    name: "read",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "<",
                                right: {
                                  kind: "number",
                                  loc: [43, 36, 43, 37],
                                  value: 5,
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                  children: [],
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
