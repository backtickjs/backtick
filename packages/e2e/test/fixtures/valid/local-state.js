import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs.create(
    [8, 10, 20, 5],
    {
      version: "0.0.0",
      filePath: "local-state.tsx",
      fileHash: "1oqffa1c13iji",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [8, 13, 20, 4],
      statements: [
        {
          kind: 244,
          loc: [9, 5, 9, 28],
          declarationList: {
            kind: 262,
            loc: [9, 5, 9, 27],
            declarations: [
              {
                kind: 261,
                loc: [9, 11, 9, 27],
                name: {
                  kind: 80,
                  loc: [9, 11, 9, 15],
                  text: "size",
                  bindingKey: "size$1oqffa1c13iji$0",
                },
                initializer: {
                  kind: 214,
                  loc: [9, 18, 9, 27],
                  expression: {
                    kind: 1001,
                    loc: [9, 18, 9, 23],
                    name: "state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [9, 24, 9, 26],
                      value: 16,
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
          loc: [10, 5, 19, 7],
          expression: {
            kind: 285,
            loc: [11, 7, 18, 14],
            type: {
              kind: 11,
              loc: [11, 8, 11, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: 227,
                  loc: [12, 16, 12, 50],
                  left: {
                    kind: 227,
                    loc: [12, 16, 12, 43],
                    left: {
                      kind: 11,
                      loc: [12, 16, 12, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 214,
                      loc: [12, 32, 12, 43],
                      expression: {
                        kind: 212,
                        loc: [12, 32, 12, 41],
                        expression: {
                          kind: 80,
                          loc: [12, 32, 12, 36],
                          text: "size",
                          bindingKey: "size$1oqffa1c13iji$0",
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
                    loc: [12, 46, 12, 50],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [13, 18, 15, 10],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [13, 24, 15, 10],
                    statements: [
                      {
                        kind: 214,
                        loc: [14, 11, 14, 38],
                        expression: {
                          kind: 212,
                          loc: [14, 11, 14, 21],
                          expression: {
                            kind: 80,
                            loc: [14, 11, 14, 15],
                            text: "size",
                            bindingKey: "size$1oqffa1c13iji$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 227,
                            loc: [14, 22, 14, 37],
                            left: {
                              kind: 214,
                              loc: [14, 22, 14, 33],
                              expression: {
                                kind: 212,
                                loc: [14, 22, 14, 31],
                                expression: {
                                  kind: 80,
                                  loc: [14, 22, 14, 26],
                                  text: "size",
                                  bindingKey: "size$1oqffa1c13iji$0",
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
                              loc: [14, 36, 14, 37],
                              value: 1,
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
                loc: [17, 9, 18, 7],
                text: "press",
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Stepper, {});
