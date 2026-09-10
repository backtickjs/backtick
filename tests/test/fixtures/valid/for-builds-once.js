import { For, cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web";
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
    [16, 10, 26, 5],
    {
      version: "0.0.0",
      filePath: "for-builds-once.tsx",
      fileHash: "3oii0m5c1enz4",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $more: { value: more, params: [] },
        $answer: { value: answer, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 26, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 40],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "items",
            bindingKey: "items$3oii0m5c1enz4$0",
          },
          initializer: {
            kind: "()",
            loc: [17, 19, 17, 39],
            expression: {
              kind: "splice",
              loc: [17, 19, 17, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [17, 36, 17, 38],
                elements: [],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [19, 5, 23, 11],
          name: {
            kind: "id",
            loc: [19, 11, 19, 18],
            text: "started",
            bindingKey: "started$3oii0m5c1enz4$1",
          },
          initializer: {
            kind: "()",
            loc: [19, 21, 23, 10],
            expression: {
              kind: ".",
              loc: [19, 21, 19, 39],
              expression: {
                kind: "splice",
                loc: [19, 21, 19, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [19, 40, 23, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [19, 46, 23, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [20, 7, 22, 8],
                      expression: {
                        kind: "()",
                        loc: [20, 11, 20, 18],
                        expression: {
                          kind: "splice",
                          loc: [20, 11, 20, 16],
                          key: "$more",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [20, 20, 22, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [21, 9, 21, 29],
                            expression: {
                              kind: ".",
                              loc: [21, 9, 21, 20],
                              expression: {
                                kind: "id",
                                loc: [21, 9, 21, 14],
                                text: "items",
                                bindingKey: "items$3oii0m5c1enz4$0",
                              },
                              name: "write",
                            },
                            arguments: [
                              {
                                kind: "splice",
                                loc: [21, 21, 21, 28],
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
                loc: [23, 8, 23, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [25, 5, 25, 79],
          expression: {
            kind: "jsx",
            loc: [25, 12, 25, 78],
            type: {
              kind: "splice",
              loc: [25, 13, 25, 16],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "()",
                  loc: [25, 23, 25, 35],
                  expression: {
                    kind: ".",
                    loc: [25, 23, 25, 33],
                    expression: {
                      kind: "id",
                      loc: [25, 23, 25, 28],
                      text: "items",
                      bindingKey: "items$3oii0m5c1enz4$0",
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
                loc: [25, 38, 25, 71],
                parameters: [
                  {
                    kind: "param",
                    loc: [25, 39, 25, 51],
                    name: {
                      kind: "id",
                      loc: [25, 39, 25, 43],
                      text: "item",
                      bindingKey: "item$3oii0m5c1enz4$2",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [25, 56, 25, 71],
                  type: {
                    kind: "string",
                    loc: [25, 57, 25, 59],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "id",
                      loc: [25, 61, 25, 65],
                      text: "item",
                      bindingKey: "item$3oii0m5c1enz4$2",
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
  [29, 16, 43, 3],
  {
    version: "0.0.0",
    filePath: "for-builds-once.tsx",
    fileHash: "3oii0m5c1enz4",
    splices: {
      $state: { value: state, params: [] },
      $Waiting: { value: Waiting, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [29, 19, 43, 2],
    statements: [
      {
        kind: "const",
        loc: [30, 3, 30, 27],
        name: {
          kind: "id",
          loc: [30, 9, 30, 14],
          text: "asked",
          bindingKey: "asked$3oii0m5c1enz4$3",
        },
        initializer: {
          kind: "()",
          loc: [30, 17, 30, 26],
          expression: {
            kind: "splice",
            loc: [30, 17, 30, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [30, 24, 30, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [32, 3, 42, 5],
        expression: {
          kind: "jsx",
          loc: [33, 5, 41, 11],
          type: {
            kind: "string",
            loc: [33, 6, 33, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [34, 7, 34, 45],
              type: {
                kind: "string",
                loc: [34, 8, 34, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [34, 14, 34, 37],
                  left: {
                    kind: "string",
                    loc: [34, 14, 34, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [34, 25, 34, 37],
                    expression: {
                      kind: ".",
                      loc: [34, 25, 34, 35],
                      expression: {
                        kind: "id",
                        loc: [34, 25, 34, 30],
                        text: "asked",
                        bindingKey: "asked$3oii0m5c1enz4$3",
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
              loc: [35, 7, 40, 9],
              type: {
                kind: "splice",
                loc: [35, 8, 35, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "more",
                  initializer: {
                    kind: "=>",
                    loc: [36, 15, 39, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [36, 21, 39, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [37, 11, 37, 40],
                          expression: {
                            kind: ".",
                            loc: [37, 11, 37, 22],
                            expression: {
                              kind: "id",
                              loc: [37, 11, 37, 16],
                              text: "asked",
                              bindingKey: "asked$3oii0m5c1enz4$3",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [37, 23, 37, 39],
                              left: {
                                kind: "()",
                                loc: [37, 23, 37, 35],
                                expression: {
                                  kind: ".",
                                  loc: [37, 23, 37, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [37, 23, 37, 28],
                                    text: "asked",
                                    bindingKey: "asked$3oii0m5c1enz4$3",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [37, 38, 37, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [38, 11, 38, 35],
                          expression: {
                            kind: "binop",
                            loc: [38, 18, 38, 34],
                            left: {
                              kind: "()",
                              loc: [38, 18, 38, 30],
                              expression: {
                                kind: ".",
                                loc: [38, 18, 38, 28],
                                expression: {
                                  kind: "id",
                                  loc: [38, 18, 38, 23],
                                  text: "asked",
                                  bindingKey: "asked$3oii0m5c1enz4$3",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "<",
                            right: {
                              kind: "number",
                              loc: [38, 33, 38, 34],
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
