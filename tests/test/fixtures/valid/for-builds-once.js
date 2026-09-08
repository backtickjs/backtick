import { For, cs, state } from "@backtickjs/core";
// The same claim as `backtick-builds-once`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answer = ["one", "two"];
async function Waiting({ more }) {
  return cs.create(
    [15, 10, 25, 5],
    {
      version: "0.0.0",
      filePath: "for-builds-once.tsx",
      fileHash: "xnj444ax5dv2",
      splices: {
        $state: { value: state, params: [] },
        $more: { value: more, params: [] },
        $answer: { value: answer, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [15, 13, 25, 4],
      statements: [
        {
          kind: "const",
          loc: [16, 5, 16, 40],
          name: {
            kind: "id",
            loc: [16, 11, 16, 16],
            text: "items",
            bindingKey: "items$xnj444ax5dv2$0",
          },
          initializer: {
            kind: "()",
            loc: [16, 19, 16, 39],
            expression: {
              kind: "splice",
              loc: [16, 19, 16, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [16, 36, 16, 38],
                elements: [],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [18, 5, 22, 11],
          name: {
            kind: "id",
            loc: [18, 11, 18, 18],
            text: "started",
            bindingKey: "started$xnj444ax5dv2$1",
          },
          initializer: {
            kind: "()",
            loc: [18, 21, 22, 10],
            expression: {
              kind: "bltn",
              loc: [18, 21, 18, 31],
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [18, 32, 22, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [18, 38, 22, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [19, 7, 21, 8],
                      expression: {
                        kind: "()",
                        loc: [19, 11, 19, 18],
                        expression: {
                          kind: "splice",
                          loc: [19, 11, 19, 16],
                          key: "$more",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [19, 20, 21, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [20, 9, 20, 29],
                            expression: {
                              kind: ".",
                              loc: [20, 9, 20, 20],
                              expression: {
                                kind: "id",
                                loc: [20, 9, 20, 14],
                                text: "items",
                                bindingKey: "items$xnj444ax5dv2$0",
                              },
                              name: "write",
                            },
                            arguments: [
                              {
                                kind: "splice",
                                loc: [20, 21, 20, 28],
                                key: "$answer",
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
                loc: [22, 8, 22, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [24, 5, 24, 79],
          expression: {
            kind: "jsx",
            loc: [24, 12, 24, 78],
            type: {
              kind: "splice",
              loc: [24, 13, 24, 16],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "()",
                  loc: [24, 23, 24, 35],
                  expression: {
                    kind: ".",
                    loc: [24, 23, 24, 33],
                    expression: {
                      kind: "id",
                      loc: [24, 23, 24, 28],
                      text: "items",
                      bindingKey: "items$xnj444ax5dv2$0",
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
                loc: [24, 38, 24, 71],
                parameters: [
                  {
                    kind: "param",
                    loc: [24, 39, 24, 51],
                    name: {
                      kind: "id",
                      loc: [24, 39, 24, 43],
                      text: "item",
                      bindingKey: "item$xnj444ax5dv2$2",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [24, 56, 24, 71],
                  type: {
                    kind: "string",
                    loc: [24, 57, 24, 59],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "id",
                      loc: [24, 61, 24, 65],
                      text: "item",
                      bindingKey: "item$xnj444ax5dv2$2",
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
  [28, 16, 42, 3],
  {
    version: "0.0.0",
    filePath: "for-builds-once.tsx",
    fileHash: "xnj444ax5dv2",
    splices: {
      $state: { value: state, params: [] },
      $Waiting: { value: Waiting, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [28, 19, 42, 2],
    statements: [
      {
        kind: "const",
        loc: [29, 3, 29, 27],
        name: {
          kind: "id",
          loc: [29, 9, 29, 14],
          text: "asked",
          bindingKey: "asked$xnj444ax5dv2$3",
        },
        initializer: {
          kind: "()",
          loc: [29, 17, 29, 26],
          expression: {
            kind: "splice",
            loc: [29, 17, 29, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [29, 24, 29, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [31, 3, 41, 5],
        expression: {
          kind: "jsx",
          loc: [32, 5, 40, 11],
          type: {
            kind: "string",
            loc: [32, 6, 32, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [33, 7, 33, 45],
              type: {
                kind: "string",
                loc: [33, 8, 33, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [33, 14, 33, 37],
                  left: {
                    kind: "string",
                    loc: [33, 14, 33, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [33, 25, 33, 37],
                    expression: {
                      kind: ".",
                      loc: [33, 25, 33, 35],
                      expression: {
                        kind: "id",
                        loc: [33, 25, 33, 30],
                        text: "asked",
                        bindingKey: "asked$xnj444ax5dv2$3",
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
              loc: [34, 7, 39, 9],
              type: {
                kind: "splice",
                loc: [34, 8, 34, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "more",
                  initializer: {
                    kind: "=>",
                    loc: [35, 15, 38, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [35, 21, 38, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [36, 11, 36, 40],
                          expression: {
                            kind: ".",
                            loc: [36, 11, 36, 22],
                            expression: {
                              kind: "id",
                              loc: [36, 11, 36, 16],
                              text: "asked",
                              bindingKey: "asked$xnj444ax5dv2$3",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [36, 23, 36, 39],
                              left: {
                                kind: "()",
                                loc: [36, 23, 36, 35],
                                expression: {
                                  kind: ".",
                                  loc: [36, 23, 36, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [36, 23, 36, 28],
                                    text: "asked",
                                    bindingKey: "asked$xnj444ax5dv2$3",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [36, 38, 36, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [37, 11, 37, 35],
                          expression: {
                            kind: "binop",
                            loc: [37, 18, 37, 34],
                            left: {
                              kind: "()",
                              loc: [37, 18, 37, 30],
                              expression: {
                                kind: ".",
                                loc: [37, 18, 37, 28],
                                expression: {
                                  kind: "id",
                                  loc: [37, 18, 37, 23],
                                  text: "asked",
                                  bindingKey: "asked$xnj444ax5dv2$3",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "<",
                            right: {
                              kind: "number",
                              loc: [37, 33, 37, 34],
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
      },
    ],
  }),
);
