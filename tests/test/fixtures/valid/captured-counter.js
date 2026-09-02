import { cs } from "@backtickjs/core";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "captured-counter.ts",
    fileHash: "31t2pc3vo9x5y",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [5, 19, 12, 2],
    statements: [
      {
        kind: 244,
        loc: [6, 3, 6, 17],
        declarationList: {
          kind: 262,
          loc: [6, 3, 6, 16],
          declarations: [
            {
              kind: 261,
              loc: [6, 7, 6, 16],
              name: {
                kind: 80,
                loc: [6, 7, 6, 12],
                text: "count",
                bindingKey: "count$31t2pc3vo9x5y$0",
              },
              initializer: {
                kind: 9,
                loc: [6, 15, 6, 16],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 244,
        loc: [7, 3, 10, 5],
        declarationList: {
          kind: 262,
          loc: [7, 3, 10, 4],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 10, 4],
              name: {
                kind: 80,
                loc: [7, 9, 7, 13],
                text: "bump",
                bindingKey: "bump$31t2pc3vo9x5y$1",
              },
              initializer: {
                kind: 220,
                loc: [7, 16, 10, 4],
                parameters: [],
                body: {
                  kind: 242,
                  loc: [7, 22, 10, 4],
                  statements: [
                    {
                      kind: 227,
                      loc: [8, 5, 8, 22],
                      left: {
                        kind: 80,
                        loc: [8, 5, 8, 10],
                        text: "count",
                        bindingKey: "count$31t2pc3vo9x5y$0",
                      },
                      operatorToken: "=",
                      right: {
                        kind: 227,
                        loc: [8, 13, 8, 22],
                        left: {
                          kind: 80,
                          loc: [8, 13, 8, 18],
                          text: "count",
                          bindingKey: "count$31t2pc3vo9x5y$0",
                        },
                        operatorToken: "+",
                        right: {
                          kind: 9,
                          loc: [8, 21, 8, 22],
                          value: 1,
                        },
                      },
                    },
                    {
                      kind: 254,
                      loc: [9, 5, 9, 18],
                      expression: {
                        kind: 80,
                        loc: [9, 12, 9, 17],
                        text: "count",
                        bindingKey: "count$31t2pc3vo9x5y$0",
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
        loc: [11, 3, 11, 26],
        expression: {
          kind: 227,
          loc: [11, 10, 11, 25],
          left: {
            kind: 214,
            loc: [11, 10, 11, 16],
            expression: {
              kind: 80,
              loc: [11, 10, 11, 14],
              text: "bump",
              bindingKey: "bump$31t2pc3vo9x5y$1",
            },
            questionDotToken: false,
            arguments: [],
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [11, 19, 11, 25],
            expression: {
              kind: 80,
              loc: [11, 19, 11, 23],
              text: "bump",
              bindingKey: "bump$31t2pc3vo9x5y$1",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
      },
    ],
  }),
);
