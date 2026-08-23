import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    [7, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "pressable.tsx",
      fileHash: "2gpxn9p38p3fh",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [7, 13, 19, 4],
      statements: [
        {
          kind: 244,
          loc: [8, 5, 8, 28],
          declarationList: {
            kind: 262,
            loc: [8, 5, 8, 27],
            declarations: [
              {
                kind: 261,
                loc: [8, 11, 8, 27],
                name: {
                  kind: 80,
                  loc: [8, 11, 8, 16],
                  text: "count",
                  bindingKey: "count$2gpxn9p38p3fh$0",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 19, 8, 27],
                  expression: {
                    kind: 1001,
                    loc: [8, 19, 8, 24],
                    name: "state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [8, 25, 8, 26],
                      value: 0,
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [9, 5, 18, 7],
          expression: {
            kind: 285,
            loc: [10, 7, 17, 16],
            type: {
              kind: 11,
              loc: [10, 8, 10, 14],
              text: "button",
            },
            attributes: [
              {
                name: "id",
                initializer: {
                  kind: 11,
                  loc: [11, 12, 11, 17],
                  text: "row",
                },
              },
              {
                name: "style",
                initializer: {
                  kind: 11,
                  loc: [12, 15, 12, 40],
                  text: "display: flex; gap: 8px",
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [13, 18, 13, 53],
                  parameters: [],
                  body: {
                    kind: 214,
                    loc: [13, 24, 13, 53],
                    expression: {
                      kind: 212,
                      loc: [13, 24, 13, 35],
                      expression: {
                        kind: 80,
                        loc: [13, 24, 13, 29],
                        text: "count",
                        bindingKey: "count$2gpxn9p38p3fh$0",
                      },
                      questionDotToken: false,
                      name: "write",
                    },
                    questionDotToken: false,
                    arguments: [
                      {
                        kind: 227,
                        loc: [13, 36, 13, 52],
                        left: {
                          kind: 214,
                          loc: [13, 36, 13, 48],
                          expression: {
                            kind: 212,
                            loc: [13, 36, 13, 46],
                            expression: {
                              kind: 80,
                              loc: [13, 36, 13, 41],
                              text: "count",
                              bindingKey: "count$2gpxn9p38p3fh$0",
                            },
                            questionDotToken: false,
                            name: "read",
                          },
                          questionDotToken: false,
                          arguments: [],
                        },
                        operatorToken: "+",
                        right: {
                          kind: 9,
                          loc: [13, 51, 13, 52],
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
                kind: 285,
                loc: [15, 9, 15, 77],
                type: {
                  kind: 11,
                  loc: [15, 10, 15, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "style",
                    initializer: {
                      kind: 11,
                      loc: [15, 21, 15, 39],
                      text: "font-weight: 700",
                    },
                  },
                ],
                children: [
                  {
                    kind: 228,
                    loc: [15, 41, 15, 69],
                    condition: {
                      kind: 227,
                      loc: [15, 41, 15, 57],
                      left: {
                        kind: 214,
                        loc: [15, 41, 15, 53],
                        expression: {
                          kind: 212,
                          loc: [15, 41, 15, 51],
                          expression: {
                            kind: 80,
                            loc: [15, 41, 15, 46],
                            text: "count",
                            bindingKey: "count$2gpxn9p38p3fh$0",
                          },
                          questionDotToken: false,
                          name: "read",
                        },
                        questionDotToken: false,
                        arguments: [],
                      },
                      operatorToken: ">",
                      right: {
                        kind: 9,
                        loc: [15, 56, 15, 57],
                        value: 0,
                      },
                    },
                    whenTrue: {
                      kind: 11,
                      loc: [15, 60, 15, 63],
                      text: "\u2611",
                    },
                    whenFalse: {
                      kind: 11,
                      loc: [15, 66, 15, 69],
                      text: "\u2610",
                    },
                  },
                ],
              },
              {
                kind: 285,
                loc: [16, 9, 16, 60],
                type: {
                  kind: 11,
                  loc: [16, 10, 16, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: 227,
                    loc: [16, 16, 16, 52],
                    left: {
                      kind: 227,
                      loc: [16, 16, 16, 41],
                      left: {
                        kind: 11,
                        loc: [16, 16, 16, 26],
                        text: "pressed ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 214,
                        loc: [16, 29, 16, 41],
                        expression: {
                          kind: 212,
                          loc: [16, 29, 16, 39],
                          expression: {
                            kind: 80,
                            loc: [16, 29, 16, 34],
                            text: "count",
                            bindingKey: "count$2gpxn9p38p3fh$0",
                          },
                          questionDotToken: false,
                          name: "read",
                        },
                        questionDotToken: false,
                        arguments: [],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 11,
                      loc: [16, 44, 16, 52],
                      text: " times",
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
export default _jsx(Row, {});
