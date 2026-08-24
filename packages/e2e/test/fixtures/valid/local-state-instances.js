import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<Counter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function Counter() {
  return cs.create(
    [7, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "local-state-instances.tsx",
      fileHash: "1o70jdoj6nrpb",
      kind: "value",
      splices: { $state: state },
      captures: [],
      spliceParams: { $state: [] },
    },
    () => ({
      kind: 242,
      loc: [7, 13, 19, 4],
      statements: [
        {
          kind: 244,
          loc: [8, 5, 8, 29],
          declarationList: {
            kind: 262,
            loc: [8, 5, 8, 28],
            declarations: [
              {
                kind: 261,
                loc: [8, 11, 8, 28],
                name: {
                  kind: 80,
                  loc: [8, 11, 8, 15],
                  text: "size",
                  bindingKey: "size$1o70jdoj6nrpb$0",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 18, 8, 28],
                  expression: {
                    kind: 1000,
                    loc: [8, 18, 8, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [8, 25, 8, 27],
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
                          bindingKey: "size$1o70jdoj6nrpb$0",
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
                        loc: [13, 11, 13, 38],
                        expression: {
                          kind: 212,
                          loc: [13, 11, 13, 21],
                          expression: {
                            kind: 80,
                            loc: [13, 11, 13, 15],
                            text: "size",
                            bindingKey: "size$1o70jdoj6nrpb$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 227,
                            loc: [13, 22, 13, 37],
                            left: {
                              kind: 214,
                              loc: [13, 22, 13, 33],
                              expression: {
                                kind: 212,
                                loc: [13, 22, 13, 31],
                                expression: {
                                  kind: 80,
                                  loc: [13, 22, 13, 26],
                                  text: "size",
                                  bindingKey: "size$1o70jdoj6nrpb$0",
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
                              loc: [13, 36, 13, 37],
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
export default _jsxs("div", {
  children: [_jsx(Counter, {}), _jsx(Counter, {})],
});
