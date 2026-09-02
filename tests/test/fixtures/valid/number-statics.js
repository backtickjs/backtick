import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs } from "@backtickjs/core";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    [7, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "number-statics.tsx",
      fileHash: "beg9oh2wragn",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [7, 13, 16, 4],
      statements: [
        {
          kind: 244,
          loc: [8, 5, 8, 41],
          declarationList: {
            kind: 262,
            loc: [8, 5, 8, 40],
            declarations: [
              {
                kind: 261,
                loc: [8, 11, 8, 40],
                name: {
                  kind: 80,
                  loc: [8, 11, 8, 19],
                  text: "positive",
                  bindingKey: "positive$beg9oh2wragn$0",
                },
                initializer: {
                  kind: 227,
                  loc: [8, 22, 8, 40],
                  left: {
                    kind: 1001,
                    loc: [8, 22, 8, 36],
                    name: "Number.EPSILON",
                  },
                  operatorToken: ">",
                  right: {
                    kind: 9,
                    loc: [8, 39, 8, 40],
                    value: 0,
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [9, 5, 9, 39],
          declarationList: {
            kind: 262,
            loc: [9, 5, 9, 38],
            declarations: [
              {
                kind: 261,
                loc: [9, 11, 9, 38],
                name: {
                  kind: 80,
                  loc: [9, 11, 9, 16],
                  text: "whole",
                  bindingKey: "whole$beg9oh2wragn$1",
                },
                initializer: {
                  kind: 214,
                  loc: [9, 19, 9, 38],
                  expression: {
                    kind: 1001,
                    loc: [9, 19, 9, 35],
                    name: "Number.isInteger",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [9, 36, 9, 37],
                      value: 2,
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
          loc: [10, 5, 10, 46],
          declarationList: {
            kind: 262,
            loc: [10, 5, 10, 45],
            declarations: [
              {
                kind: 261,
                loc: [10, 11, 10, 45],
                name: {
                  kind: 80,
                  loc: [10, 11, 10, 21],
                  text: "fractional",
                  bindingKey: "fractional$beg9oh2wragn$2",
                },
                initializer: {
                  kind: 214,
                  loc: [10, 24, 10, 45],
                  expression: {
                    kind: 1001,
                    loc: [10, 24, 10, 40],
                    name: "Number.isInteger",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [10, 41, 10, 44],
                      value: 2.5,
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
          loc: [12, 5, 12, 42],
          declarationList: {
            kind: 262,
            loc: [12, 5, 12, 41],
            declarations: [
              {
                kind: 261,
                loc: [12, 11, 12, 41],
                name: {
                  kind: 80,
                  loc: [12, 11, 12, 18],
                  text: "written",
                  bindingKey: "written$beg9oh2wragn$3",
                },
                initializer: {
                  kind: 214,
                  loc: [12, 21, 12, 41],
                  expression: {
                    kind: 1001,
                    loc: [12, 21, 12, 36],
                    name: "Number.isFinite",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [12, 37, 12, 40],
                      text: "2",
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
          loc: [13, 5, 15, 7],
          expression: {
            kind: 285,
            loc: [14, 7, 14, 79],
            type: {
              kind: 11,
              loc: [14, 8, 14, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: 227,
                loc: [14, 14, 14, 71],
                left: {
                  kind: 227,
                  loc: [14, 14, 14, 60],
                  left: {
                    kind: 227,
                    loc: [14, 14, 14, 54],
                    left: {
                      kind: 227,
                      loc: [14, 14, 14, 44],
                      left: {
                        kind: 227,
                        loc: [14, 14, 14, 38],
                        left: {
                          kind: 227,
                          loc: [14, 14, 14, 25],
                          left: {
                            kind: 80,
                            loc: [14, 14, 14, 19],
                            text: "whole",
                            bindingKey: "whole$beg9oh2wragn$1",
                          },
                          operatorToken: "+",
                          right: {
                            kind: 11,
                            loc: [14, 22, 14, 25],
                            text: " ",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: 80,
                          loc: [14, 28, 14, 38],
                          text: "fractional",
                          bindingKey: "fractional$beg9oh2wragn$2",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: 11,
                        loc: [14, 41, 14, 44],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 80,
                      loc: [14, 47, 14, 54],
                      text: "written",
                      bindingKey: "written$beg9oh2wragn$3",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: 11,
                    loc: [14, 57, 14, 60],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 80,
                  loc: [14, 63, 14, 71],
                  text: "positive",
                  bindingKey: "positive$beg9oh2wragn$0",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Checked, {});
