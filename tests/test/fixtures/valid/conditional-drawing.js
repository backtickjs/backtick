import { cs, state } from "@backtickjs/core";
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
    [19, 10, 29, 5],
    {
      version: "0.0.0",
      filePath: "conditional-drawing.tsx",
      fileHash: "3oq99jr3lig81",
      splices: {
        $state: { value: state, params: [] },
        $again: { value: again, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [19, 13, 29, 4],
      statements: [
        {
          kind: "const",
          loc: [20, 5, 20, 33],
          name: {
            kind: "id",
            loc: [20, 11, 20, 16],
            text: "shown",
            bindingKey: "shown$3oq99jr3lig81$0",
          },
          initializer: {
            kind: "()",
            loc: [20, 19, 20, 32],
            expression: {
              kind: "splice",
              loc: [20, 19, 20, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "false",
                loc: [20, 26, 20, 31],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [22, 5, 26, 11],
          name: {
            kind: "id",
            loc: [22, 11, 22, 18],
            text: "started",
            bindingKey: "started$3oq99jr3lig81$1",
          },
          initializer: {
            kind: "()",
            loc: [22, 21, 26, 10],
            expression: {
              kind: "bltn",
              loc: [22, 21, 22, 31],
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [22, 32, 26, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [22, 38, 26, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [23, 7, 25, 8],
                      expression: {
                        kind: "()",
                        loc: [23, 11, 23, 19],
                        expression: {
                          kind: "splice",
                          loc: [23, 11, 23, 17],
                          key: "$again",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [23, 21, 25, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [24, 9, 24, 26],
                            expression: {
                              kind: ".",
                              loc: [24, 9, 24, 20],
                              expression: {
                                kind: "id",
                                loc: [24, 9, 24, 14],
                                text: "shown",
                                bindingKey: "shown$3oq99jr3lig81$0",
                              },
                              name: "write",
                            },
                            arguments: [
                              {
                                kind: "true",
                                loc: [24, 21, 24, 25],
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
                loc: [26, 8, 26, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [28, 5, 28, 66],
          expression: {
            kind: "jsx",
            loc: [28, 12, 28, 65],
            type: {
              kind: "string",
              loc: [28, 12, 28, 65],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "?:",
                loc: [28, 15, 28, 61],
                condition: {
                  kind: "()",
                  loc: [28, 15, 28, 27],
                  expression: {
                    kind: ".",
                    loc: [28, 15, 28, 25],
                    expression: {
                      kind: "id",
                      loc: [28, 15, 28, 20],
                      text: "shown",
                      bindingKey: "shown$3oq99jr3lig81$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                whenTrue: {
                  kind: "jsx",
                  loc: [28, 30, 28, 44],
                  type: {
                    kind: "string",
                    loc: [28, 31, 28, 33],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [28, 34, 28, 39],
                      text: "shown",
                    },
                  ],
                },
                whenFalse: {
                  kind: "jsx",
                  loc: [28, 47, 28, 61],
                  type: {
                    kind: "string",
                    loc: [28, 48, 28, 49],
                    text: "i",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [28, 50, 28, 57],
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
  [32, 16, 48, 3],
  {
    version: "0.0.0",
    filePath: "conditional-drawing.tsx",
    fileHash: "3oq99jr3lig81",
    splices: {
      $state: { value: state, params: [] },
      $Held: { value: Held, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [32, 19, 48, 2],
    statements: [
      {
        kind: "const",
        loc: [33, 3, 33, 28],
        name: {
          kind: "id",
          loc: [33, 9, 33, 15],
          text: "builds",
          bindingKey: "builds$3oq99jr3lig81$2",
        },
        initializer: {
          kind: "()",
          loc: [33, 18, 33, 27],
          expression: {
            kind: "splice",
            loc: [33, 18, 33, 24],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [33, 25, 33, 26],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [35, 3, 47, 5],
        expression: {
          kind: "jsx",
          loc: [36, 5, 46, 11],
          type: {
            kind: "string",
            loc: [36, 6, 36, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [37, 7, 37, 47],
              type: {
                kind: "string",
                loc: [37, 8, 37, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [37, 14, 37, 39],
                  left: {
                    kind: "string",
                    loc: [37, 14, 37, 23],
                    text: "builds ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [37, 26, 37, 39],
                    expression: {
                      kind: ".",
                      loc: [37, 26, 37, 37],
                      expression: {
                        kind: "id",
                        loc: [37, 26, 37, 32],
                        text: "builds",
                        bindingKey: "builds$3oq99jr3lig81$2",
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
              loc: [38, 7, 45, 17],
              type: {
                kind: "string",
                loc: [38, 8, 38, 15],
                text: "section",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [39, 9, 44, 11],
                  type: {
                    kind: "splice",
                    loc: [39, 10, 39, 14],
                    key: "$Held",
                  },
                  attributes: [
                    {
                      name: "again",
                      initializer: {
                        kind: "=>",
                        loc: [40, 18, 43, 12],
                        parameters: [],
                        body: {
                          kind: "{}",
                          loc: [40, 24, 43, 12],
                          statements: [
                            {
                              kind: "()",
                              loc: [41, 13, 41, 44],
                              expression: {
                                kind: ".",
                                loc: [41, 13, 41, 25],
                                expression: {
                                  kind: "id",
                                  loc: [41, 13, 41, 19],
                                  text: "builds",
                                  bindingKey: "builds$3oq99jr3lig81$2",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "binop",
                                  loc: [41, 26, 41, 43],
                                  left: {
                                    kind: "()",
                                    loc: [41, 26, 41, 39],
                                    expression: {
                                      kind: ".",
                                      loc: [41, 26, 41, 37],
                                      expression: {
                                        kind: "id",
                                        loc: [41, 26, 41, 32],
                                        text: "builds",
                                        bindingKey: "builds$3oq99jr3lig81$2",
                                      },
                                      name: "read",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "number",
                                    loc: [41, 42, 41, 43],
                                    value: 1,
                                  },
                                },
                              ],
                            },
                            {
                              kind: "return",
                              loc: [42, 13, 42, 38],
                              expression: {
                                kind: "binop",
                                loc: [42, 20, 42, 37],
                                left: {
                                  kind: "()",
                                  loc: [42, 20, 42, 33],
                                  expression: {
                                    kind: ".",
                                    loc: [42, 20, 42, 31],
                                    expression: {
                                      kind: "id",
                                      loc: [42, 20, 42, 26],
                                      text: "builds",
                                      bindingKey: "builds$3oq99jr3lig81$2",
                                    },
                                    name: "read",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "<",
                                right: {
                                  kind: "number",
                                  loc: [42, 36, 42, 37],
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
