import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  return cs.create(
    [7, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "local-state-update.tsx",
      fileHash: "1etb2f5z421rb",
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
                  loc: [8, 11, 8, 15],
                  text: "size",
                  bindingKey: "size$1etb2f5z421rb$0",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 18, 8, 27],
                  expression: {
                    kind: 1001,
                    loc: [8, 18, 8, 23],
                    name: "state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [8, 24, 8, 26],
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
          loc: [9, 5, 18, 7],
          expression: {
            kind: 285,
            loc: [10, 7, 17, 14],
            type: {
              kind: 11,
              loc: [10, 8, 10, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: 227,
                  loc: [11, 16, 11, 50],
                  left: {
                    kind: 227,
                    loc: [11, 16, 11, 43],
                    left: {
                      kind: 11,
                      loc: [11, 16, 11, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 214,
                      loc: [11, 32, 11, 43],
                      expression: {
                        kind: 212,
                        loc: [11, 32, 11, 41],
                        expression: {
                          kind: 80,
                          loc: [11, 32, 11, 36],
                          text: "size",
                          bindingKey: "size$1etb2f5z421rb$0",
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
                    loc: [11, 46, 11, 50],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [12, 18, 14, 10],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [12, 24, 14, 10],
                    statements: [
                      {
                        kind: 214,
                        loc: [13, 11, 13, 56],
                        expression: {
                          kind: 212,
                          loc: [13, 11, 13, 22],
                          expression: {
                            kind: 80,
                            loc: [13, 11, 13, 15],
                            text: "size",
                            bindingKey: "size$1etb2f5z421rb$0",
                          },
                          questionDotToken: false,
                          name: "update",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [13, 23, 13, 55],
                            parameters: [
                              {
                                kind: 170,
                                loc: [13, 24, 13, 39],
                                name: {
                                  kind: 80,
                                  loc: [13, 24, 13, 31],
                                  text: "current",
                                  bindingKey: "current$1etb2f5z421rb$1",
                                },
                              },
                            ],
                            body: {
                              kind: 227,
                              loc: [13, 44, 13, 55],
                              left: {
                                kind: 80,
                                loc: [13, 44, 13, 51],
                                text: "current",
                                bindingKey: "current$1etb2f5z421rb$1",
                              },
                              operatorToken: "+",
                              right: {
                                kind: 9,
                                loc: [13, 54, 13, 55],
                                value: 1,
                              },
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
                loc: [16, 9, 17, 7],
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
