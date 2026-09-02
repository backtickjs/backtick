import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
async function Rows() {
  return cs.create(
    [16, 10, 34, 5],
    {
      version: "0.0.0",
      filePath: "named-type-positions.tsx",
      fileHash: "2tgsecr7whml2",
      splices: { $state: state, $For: For },
      captures: [],
      spliceParams: { $state: [] },
    },
    () => ({
      kind: 242,
      loc: [16, 13, 34, 4],
      statements: [
        {
          kind: 244,
          loc: [17, 5, 17, 36],
          declarationList: {
            kind: 262,
            loc: [17, 5, 17, 35],
            declarations: [
              {
                kind: 261,
                loc: [17, 11, 17, 35],
                name: {
                  kind: 80,
                  loc: [17, 11, 17, 15],
                  text: "rows",
                  bindingKey: "rows$2tgsecr7whml2$0",
                },
                initializer: {
                  kind: 214,
                  loc: [17, 18, 17, 35],
                  expression: {
                    kind: 1000,
                    loc: [17, 18, 17, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 210,
                      loc: [17, 32, 17, 34],
                      elements: [],
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
          loc: [18, 5, 20, 7],
          declarationList: {
            kind: 262,
            loc: [18, 5, 20, 6],
            declarations: [
              {
                kind: 261,
                loc: [18, 11, 20, 6],
                name: {
                  kind: 80,
                  loc: [18, 11, 18, 14],
                  text: "add",
                  bindingKey: "add$2tgsecr7whml2$1",
                },
                initializer: {
                  kind: 220,
                  loc: [18, 17, 20, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [18, 18, 18, 26],
                      name: {
                        kind: 80,
                        loc: [18, 18, 18, 21],
                        text: "row",
                        bindingKey: "row$2tgsecr7whml2$3",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [18, 31, 20, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [19, 7, 19, 24],
                        expression: {
                          kind: 212,
                          loc: [19, 7, 19, 17],
                          expression: {
                            kind: 80,
                            loc: [19, 7, 19, 11],
                            text: "rows",
                            bindingKey: "rows$2tgsecr7whml2$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 210,
                            loc: [19, 18, 19, 23],
                            elements: [
                              {
                                kind: 80,
                                loc: [19, 19, 19, 22],
                                text: "row",
                                bindingKey: "row$2tgsecr7whml2$3",
                              },
                            ],
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
          kind: 244,
          loc: [21, 5, 23, 7],
          declarationList: {
            kind: 262,
            loc: [21, 5, 23, 6],
            declarations: [
              {
                kind: 261,
                loc: [21, 11, 23, 6],
                name: {
                  kind: 80,
                  loc: [21, 11, 21, 16],
                  text: "label",
                  bindingKey: "label$2tgsecr7whml2$2",
                },
                initializer: {
                  kind: 220,
                  loc: [21, 19, 23, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [21, 20, 21, 28],
                      name: {
                        kind: 80,
                        loc: [21, 20, 21, 23],
                        text: "row",
                        bindingKey: "row$2tgsecr7whml2$4",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [21, 33, 23, 6],
                    statements: [
                      {
                        kind: 254,
                        loc: [22, 7, 22, 24],
                        expression: {
                          kind: 212,
                          loc: [22, 14, 22, 23],
                          expression: {
                            kind: 80,
                            loc: [22, 14, 22, 17],
                            text: "row",
                            bindingKey: "row$2tgsecr7whml2$4",
                          },
                          questionDotToken: false,
                          name: "label",
                        },
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
          loc: [24, 5, 33, 7],
          expression: {
            kind: 285,
            loc: [25, 7, 32, 13],
            type: {
              kind: 11,
              loc: [25, 8, 25, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [26, 9, 26, 70],
                type: {
                  kind: 11,
                  loc: [26, 10, 26, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 220,
                      loc: [26, 24, 26, 58],
                      parameters: [],
                      body: {
                        kind: 214,
                        loc: [26, 30, 26, 58],
                        expression: {
                          kind: 80,
                          loc: [26, 30, 26, 33],
                          text: "add",
                          bindingKey: "add$2tgsecr7whml2$1",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 211,
                            loc: [26, 34, 26, 57],
                            properties: [
                              {
                                kind: 304,
                                loc: [26, 36, 26, 41],
                                name: "id",
                                initializer: {
                                  kind: 9,
                                  loc: [26, 40, 26, 41],
                                  value: 1,
                                },
                              },
                              {
                                kind: 304,
                                loc: [26, 43, 26, 55],
                                name: "label",
                                initializer: {
                                  kind: 11,
                                  loc: [26, 50, 26, 55],
                                  text: "one",
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [26, 60, 26, 63],
                    text: "add",
                  },
                ],
              },
              {
                kind: 285,
                loc: [27, 9, 31, 15],
                type: {
                  kind: 11,
                  loc: [27, 10, 27, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: 285,
                    loc: [28, 11, 30, 17],
                    type: {
                      kind: 1000,
                      loc: [28, 12, 28, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: 214,
                          loc: [28, 22, 28, 33],
                          expression: {
                            kind: 212,
                            loc: [28, 22, 28, 31],
                            expression: {
                              kind: 80,
                              loc: [28, 22, 28, 26],
                              text: "rows",
                              bindingKey: "rows$2tgsecr7whml2$0",
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
                        loc: [29, 14, 29, 53],
                        parameters: [
                          {
                            kind: 170,
                            loc: [29, 15, 29, 23],
                            name: {
                              kind: 80,
                              loc: [29, 15, 29, 18],
                              text: "row",
                              bindingKey: "row$2tgsecr7whml2$5",
                            },
                          },
                        ],
                        body: {
                          kind: 285,
                          loc: [29, 28, 29, 53],
                          type: {
                            kind: 11,
                            loc: [29, 29, 29, 33],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: 214,
                              loc: [29, 35, 29, 45],
                              expression: {
                                kind: 80,
                                loc: [29, 35, 29, 40],
                                text: "label",
                                bindingKey: "label$2tgsecr7whml2$2",
                              },
                              questionDotToken: false,
                              arguments: [
                                {
                                  kind: 80,
                                  loc: [29, 41, 29, 44],
                                  text: "row",
                                  bindingKey: "row$2tgsecr7whml2$5",
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
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Rows, {});
