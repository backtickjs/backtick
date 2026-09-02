import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  return cs.create(
    [11, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "root-list.tsx",
      fileHash: "3u9vjn40mllyh",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [11, 13, 24, 4],
      statements: [
        {
          kind: 244,
          loc: [12, 5, 12, 45],
          declarationList: {
            kind: 262,
            loc: [12, 5, 12, 44],
            declarations: [
              {
                kind: 261,
                loc: [12, 11, 12, 44],
                name: {
                  kind: 80,
                  loc: [12, 11, 12, 14],
                  text: "ids",
                  bindingKey: "ids$3u9vjn40mllyh$0",
                },
                initializer: {
                  kind: 214,
                  loc: [12, 17, 12, 44],
                  expression: {
                    kind: 1000,
                    loc: [12, 17, 12, 23],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 210,
                      loc: [12, 34, 12, 43],
                      elements: [
                        {
                          kind: 9,
                          loc: [12, 35, 12, 36],
                          value: 1,
                        },
                        {
                          kind: 9,
                          loc: [12, 38, 12, 39],
                          value: 2,
                        },
                        {
                          kind: 9,
                          loc: [12, 41, 12, 42],
                          value: 3,
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [13, 5, 15, 7],
          declarationList: {
            kind: 262,
            loc: [13, 5, 15, 6],
            declarations: [
              {
                kind: 261,
                loc: [13, 11, 15, 6],
                name: {
                  kind: 80,
                  loc: [13, 11, 13, 16],
                  text: "clear",
                  bindingKey: "clear$3u9vjn40mllyh$1",
                },
                initializer: {
                  kind: 220,
                  loc: [13, 19, 15, 6],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [13, 25, 15, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [14, 7, 14, 27],
                        expression: {
                          kind: 212,
                          loc: [14, 7, 14, 17],
                          expression: {
                            kind: 80,
                            loc: [14, 7, 14, 10],
                            text: "ids",
                            bindingKey: "ids$3u9vjn40mllyh$0",
                          },
                          questionDotToken: false,
                          name: "update",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [14, 18, 14, 26],
                            parameters: [],
                            body: {
                              kind: 210,
                              loc: [14, 24, 14, 26],
                              elements: [],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [16, 5, 23, 7],
          expression: {
            kind: 210,
            loc: [17, 7, 22, 10],
            elements: [
              {
                kind: 285,
                loc: [18, 9, 18, 43],
                type: {
                  kind: 11,
                  loc: [18, 10, 18, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 80,
                      loc: [18, 24, 18, 29],
                      text: "clear",
                      bindingKey: "clear$3u9vjn40mllyh$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [18, 31, 18, 36],
                    text: "clear",
                  },
                ],
              },
              {
                kind: 285,
                loc: [19, 9, 21, 15],
                type: {
                  kind: 1000,
                  loc: [19, 10, 19, 13],
                  key: "$For",
                },
                attributes: [
                  {
                    name: "each",
                    initializer: {
                      kind: 214,
                      loc: [19, 20, 19, 30],
                      expression: {
                        kind: 212,
                        loc: [19, 20, 19, 28],
                        expression: {
                          kind: 80,
                          loc: [19, 20, 19, 23],
                          text: "ids",
                          bindingKey: "ids$3u9vjn40mllyh$0",
                        },
                        questionDotToken: false,
                        name: "read",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                  },
                ],
                children: [
                  {
                    kind: 220,
                    loc: [20, 12, 20, 54],
                    parameters: [
                      {
                        kind: 170,
                        loc: [20, 13, 20, 23],
                        name: {
                          kind: 80,
                          loc: [20, 13, 20, 15],
                          text: "id",
                          bindingKey: "id$3u9vjn40mllyh$2",
                        },
                      },
                    ],
                    body: {
                      kind: 285,
                      loc: [20, 28, 20, 54],
                      type: {
                        kind: 11,
                        loc: [20, 29, 20, 33],
                        text: "span",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: 227,
                          loc: [20, 35, 20, 46],
                          left: {
                            kind: 11,
                            loc: [20, 35, 20, 41],
                            text: "row ",
                          },
                          operatorToken: "+",
                          right: {
                            kind: 80,
                            loc: [20, 44, 20, 46],
                            text: "id",
                            bindingKey: "id$3u9vjn40mllyh$2",
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
      ],
    }),
  );
}
export default _jsx(Rows, {});
