import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number, and this is the case that says why: a
// rotation moves every member without changing any of them, so a row keeps the
// node it had and only what read `index` runs again. Reading it eagerly — the
// number at the moment the row was drawn — leaves all three stale, which is the
// bug this pins.
async function Rows() {
  return cs.create(
    [12, 10, 29, 5],
    {
      version: "0.0.0",
      filePath: "for-index.tsx",
      fileHash: "1suvpn3mvnkvg",
      kind: "value",
      splices: { $state: state, $For: For },
      captures: [],
      spliceParams: { $state: [] },
    },
    () => ({
      kind: 242,
      loc: [12, 13, 29, 4],
      statements: [
        {
          kind: 244,
          loc: [13, 5, 13, 53],
          declarationList: {
            kind: 262,
            loc: [13, 5, 13, 52],
            declarations: [
              {
                kind: 261,
                loc: [13, 11, 13, 52],
                name: {
                  kind: 80,
                  loc: [13, 11, 13, 16],
                  text: "names",
                  bindingKey: "names$1suvpn3mvnkvg$0",
                },
                initializer: {
                  kind: 214,
                  loc: [13, 19, 13, 52],
                  expression: {
                    kind: 1000,
                    loc: [13, 19, 13, 25],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 210,
                      loc: [13, 36, 13, 51],
                      elements: [
                        {
                          kind: 11,
                          loc: [13, 37, 13, 40],
                          text: "a",
                        },
                        {
                          kind: 11,
                          loc: [13, 42, 13, 45],
                          text: "b",
                        },
                        {
                          kind: 11,
                          loc: [13, 47, 13, 50],
                          text: "c",
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
          loc: [14, 5, 16, 7],
          declarationList: {
            kind: 262,
            loc: [14, 5, 16, 6],
            declarations: [
              {
                kind: 261,
                loc: [14, 11, 16, 6],
                name: {
                  kind: 80,
                  loc: [14, 11, 14, 17],
                  text: "rotate",
                  bindingKey: "rotate$1suvpn3mvnkvg$1",
                },
                initializer: {
                  kind: 220,
                  loc: [14, 20, 16, 6],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [14, 26, 16, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [15, 7, 15, 58],
                        expression: {
                          kind: 212,
                          loc: [15, 7, 15, 19],
                          expression: {
                            kind: 80,
                            loc: [15, 7, 15, 12],
                            text: "names",
                            bindingKey: "names$1suvpn3mvnkvg$0",
                          },
                          questionDotToken: false,
                          name: "update",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [15, 20, 15, 57],
                            parameters: [
                              {
                                kind: 170,
                                loc: [15, 21, 15, 25],
                                name: {
                                  kind: 80,
                                  loc: [15, 21, 15, 25],
                                  text: "held",
                                  bindingKey: "held$1suvpn3mvnkvg$2",
                                },
                              },
                            ],
                            body: {
                              kind: 210,
                              loc: [15, 30, 15, 57],
                              elements: [
                                {
                                  kind: 213,
                                  loc: [15, 31, 15, 38],
                                  expression: {
                                    kind: 80,
                                    loc: [15, 31, 15, 35],
                                    text: "held",
                                    bindingKey: "held$1suvpn3mvnkvg$2",
                                  },
                                  argumentExpression: {
                                    kind: 9,
                                    loc: [15, 36, 15, 37],
                                    value: 2,
                                  },
                                },
                                {
                                  kind: 213,
                                  loc: [15, 40, 15, 47],
                                  expression: {
                                    kind: 80,
                                    loc: [15, 40, 15, 44],
                                    text: "held",
                                    bindingKey: "held$1suvpn3mvnkvg$2",
                                  },
                                  argumentExpression: {
                                    kind: 9,
                                    loc: [15, 45, 15, 46],
                                    value: 0,
                                  },
                                },
                                {
                                  kind: 213,
                                  loc: [15, 49, 15, 56],
                                  expression: {
                                    kind: 80,
                                    loc: [15, 49, 15, 53],
                                    text: "held",
                                    bindingKey: "held$1suvpn3mvnkvg$2",
                                  },
                                  argumentExpression: {
                                    kind: 9,
                                    loc: [15, 54, 15, 55],
                                    value: 1,
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
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [17, 5, 28, 7],
          expression: {
            kind: 285,
            loc: [18, 7, 27, 13],
            type: {
              kind: 11,
              loc: [18, 8, 18, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [19, 9, 19, 45],
                type: {
                  kind: 11,
                  loc: [19, 10, 19, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 80,
                      loc: [19, 24, 19, 30],
                      text: "rotate",
                      bindingKey: "rotate$1suvpn3mvnkvg$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [19, 32, 19, 38],
                    text: "rotate",
                  },
                ],
              },
              {
                kind: 285,
                loc: [20, 9, 26, 15],
                type: {
                  kind: 11,
                  loc: [20, 10, 20, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: 285,
                    loc: [21, 11, 25, 17],
                    type: {
                      kind: 1000,
                      loc: [21, 12, 21, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: 214,
                          loc: [21, 22, 21, 34],
                          expression: {
                            kind: 212,
                            loc: [21, 22, 21, 32],
                            expression: {
                              kind: 80,
                              loc: [21, 22, 21, 27],
                              text: "names",
                              bindingKey: "names$1suvpn3mvnkvg$0",
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
                        loc: [22, 14, 24, 14],
                        parameters: [
                          {
                            kind: 170,
                            loc: [22, 15, 22, 27],
                            name: {
                              kind: 80,
                              loc: [22, 15, 22, 19],
                              text: "name",
                              bindingKey: "name$1suvpn3mvnkvg$3",
                            },
                          },
                          {
                            kind: 170,
                            loc: [22, 29, 22, 57],
                            name: {
                              kind: 80,
                              loc: [22, 29, 22, 34],
                              text: "index",
                              bindingKey: "index$1suvpn3mvnkvg$4",
                            },
                          },
                        ],
                        body: {
                          kind: 285,
                          loc: [23, 15, 23, 58],
                          type: {
                            kind: 11,
                            loc: [23, 16, 23, 20],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: 227,
                              loc: [23, 22, 23, 50],
                              left: {
                                kind: 227,
                                loc: [23, 22, 23, 35],
                                left: {
                                  kind: 80,
                                  loc: [23, 22, 23, 26],
                                  text: "name",
                                  bindingKey: "name$1suvpn3mvnkvg$3",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [23, 29, 23, 35],
                                  text: " at ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 214,
                                loc: [23, 38, 23, 50],
                                expression: {
                                  kind: 212,
                                  loc: [23, 38, 23, 48],
                                  expression: {
                                    kind: 80,
                                    loc: [23, 38, 23, 43],
                                    text: "index",
                                    bindingKey: "index$1suvpn3mvnkvg$4",
                                  },
                                  questionDotToken: false,
                                  name: "read",
                                },
                                questionDotToken: false,
                                arguments: [],
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
