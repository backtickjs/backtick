import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    [9, 10, 37, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/number-statics.test.tsx",
      fileHash: "1o8290c5hfi65",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [9, 13, 37, 4],
      statements: [
        {
          kind: "const",
          loc: [10, 5, 10, 41],
          name: {
            kind: "id",
            loc: [10, 11, 10, 19],
            text: "positive",
            bindingKey: "positive$1o8290c5hfi65$0",
          },
          initializer: {
            kind: "binop",
            loc: [10, 22, 10, 40],
            left: {
              kind: ".",
              loc: [10, 22, 10, 36],
              expression: {
                kind: "bltn",
                loc: [10, 22, 10, 28],
                name: "Number",
              },
              name: "EPSILON",
            },
            operatorToken: ">",
            right: {
              kind: "number",
              loc: [10, 39, 10, 40],
              value: 0,
            },
          },
        },
        {
          kind: "const",
          loc: [11, 5, 11, 46],
          name: {
            kind: "id",
            loc: [11, 11, 11, 18],
            text: "largest",
            bindingKey: "largest$1o8290c5hfi65$1",
          },
          initializer: {
            kind: "binop",
            loc: [11, 21, 11, 45],
            left: {
              kind: ".",
              loc: [11, 21, 11, 37],
              expression: {
                kind: "bltn",
                loc: [11, 21, 11, 27],
                name: "Number",
              },
              name: "MAX_VALUE",
            },
            operatorToken: ">",
            right: {
              kind: "number",
              loc: [11, 40, 11, 45],
              value: 1e308,
            },
          },
        },
        {
          kind: "const",
          loc: [12, 5, 17, 58],
          name: {
            kind: "id",
            loc: [12, 11, 12, 15],
            text: "safe",
            bindingKey: "safe$1o8290c5hfi65$2",
          },
          initializer: {
            kind: "binop",
            loc: [13, 7, 17, 57],
            left: {
              kind: "binop",
              loc: [13, 7, 16, 30],
              left: {
                kind: "binop",
                loc: [13, 7, 15, 27],
                left: {
                  kind: "binop",
                  loc: [13, 7, 14, 52],
                  left: {
                    kind: "binop",
                    loc: [13, 7, 13, 51],
                    left: {
                      kind: ".",
                      loc: [13, 7, 13, 30],
                      expression: {
                        kind: "bltn",
                        loc: [13, 7, 13, 13],
                        name: "Number",
                      },
                      name: "MAX_SAFE_INTEGER",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "number",
                      loc: [13, 35, 13, 51],
                      value: 9007199254740991,
                    },
                  },
                  operatorToken: "&&",
                  right: {
                    kind: "binop",
                    loc: [14, 7, 14, 52],
                    left: {
                      kind: ".",
                      loc: [14, 7, 14, 30],
                      expression: {
                        kind: "bltn",
                        loc: [14, 7, 14, 13],
                        name: "Number",
                      },
                      name: "MIN_SAFE_INTEGER",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "prefixop",
                      loc: [14, 35, 14, 52],
                      operator: "-",
                      operand: {
                        kind: "number",
                        loc: [14, 36, 14, 52],
                        value: 9007199254740991,
                      },
                    },
                  },
                },
                operatorToken: "&&",
                right: {
                  kind: "binop",
                  loc: [15, 7, 15, 27],
                  left: {
                    kind: ".",
                    loc: [15, 7, 15, 23],
                    expression: {
                      kind: "bltn",
                      loc: [15, 7, 15, 13],
                      name: "Number",
                    },
                    name: "MIN_VALUE",
                  },
                  operatorToken: ">",
                  right: {
                    kind: "number",
                    loc: [15, 26, 15, 27],
                    value: 0,
                  },
                },
              },
              operatorToken: "&&",
              right: {
                kind: "()",
                loc: [16, 7, 16, 30],
                expression: {
                  kind: ".",
                  loc: [16, 7, 16, 27],
                  expression: {
                    kind: "bltn",
                    loc: [16, 7, 16, 13],
                    name: "Number",
                  },
                  name: "isSafeInteger",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [16, 28, 16, 29],
                    value: 3,
                  },
                ],
              },
            },
            operatorToken: "&&",
            right: {
              kind: "prefixop",
              loc: [17, 7, 17, 57],
              operator: "!",
              operand: {
                kind: "()",
                loc: [17, 8, 17, 57],
                expression: {
                  kind: ".",
                  loc: [17, 8, 17, 28],
                  expression: {
                    kind: "bltn",
                    loc: [17, 8, 17, 14],
                    name: "Number",
                  },
                  name: "isSafeInteger",
                },
                arguments: [
                  {
                    kind: "binop",
                    loc: [17, 29, 17, 56],
                    left: {
                      kind: ".",
                      loc: [17, 29, 17, 52],
                      expression: {
                        kind: "bltn",
                        loc: [17, 29, 17, 35],
                        name: "Number",
                      },
                      name: "MAX_SAFE_INTEGER",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [17, 55, 17, 56],
                      value: 1,
                    },
                  },
                ],
              },
            },
          },
        },
        {
          kind: "const",
          loc: [18, 5, 18, 39],
          name: {
            kind: "id",
            loc: [18, 11, 18, 16],
            text: "whole",
            bindingKey: "whole$1o8290c5hfi65$3",
          },
          initializer: {
            kind: "()",
            loc: [18, 19, 18, 38],
            expression: {
              kind: ".",
              loc: [18, 19, 18, 35],
              expression: {
                kind: "bltn",
                loc: [18, 19, 18, 25],
                name: "Number",
              },
              name: "isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [18, 36, 18, 37],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [19, 5, 19, 46],
          name: {
            kind: "id",
            loc: [19, 11, 19, 21],
            text: "fractional",
            bindingKey: "fractional$1o8290c5hfi65$4",
          },
          initializer: {
            kind: "()",
            loc: [19, 24, 19, 45],
            expression: {
              kind: ".",
              loc: [19, 24, 19, 40],
              expression: {
                kind: "bltn",
                loc: [19, 24, 19, 30],
                name: "Number",
              },
              name: "isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [19, 41, 19, 44],
                value: 2.5,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [21, 5, 21, 42],
          name: {
            kind: "id",
            loc: [21, 11, 21, 18],
            text: "written",
            bindingKey: "written$1o8290c5hfi65$5",
          },
          initializer: {
            kind: "()",
            loc: [21, 21, 21, 41],
            expression: {
              kind: ".",
              loc: [21, 21, 21, 36],
              expression: {
                kind: "bltn",
                loc: [21, 21, 21, 27],
                name: "Number",
              },
              name: "isFinite",
            },
            arguments: [
              {
                kind: "string",
                loc: [21, 37, 21, 40],
                text: "2",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [22, 5, 36, 7],
          expression: {
            kind: "jsx",
            loc: [23, 7, 35, 14],
            type: {
              kind: "string",
              loc: [23, 8, 23, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [24, 10, 34, 15],
                left: {
                  kind: "binop",
                  loc: [24, 10, 33, 14],
                  left: {
                    kind: "binop",
                    loc: [24, 10, 32, 18],
                    left: {
                      kind: "binop",
                      loc: [24, 10, 31, 14],
                      left: {
                        kind: "binop",
                        loc: [24, 10, 30, 19],
                        left: {
                          kind: "binop",
                          loc: [24, 10, 29, 14],
                          left: {
                            kind: "binop",
                            loc: [24, 10, 28, 18],
                            left: {
                              kind: "binop",
                              loc: [24, 10, 27, 14],
                              left: {
                                kind: "binop",
                                loc: [24, 10, 26, 21],
                                left: {
                                  kind: "binop",
                                  loc: [24, 10, 25, 14],
                                  left: {
                                    kind: "id",
                                    loc: [24, 10, 24, 15],
                                    text: "whole",
                                    bindingKey: "whole$1o8290c5hfi65$3",
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "string",
                                    loc: [25, 11, 25, 14],
                                    text: " ",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "id",
                                  loc: [26, 11, 26, 21],
                                  text: "fractional",
                                  bindingKey: "fractional$1o8290c5hfi65$4",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "string",
                                loc: [27, 11, 27, 14],
                                text: " ",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [28, 11, 28, 18],
                              text: "written",
                              bindingKey: "written$1o8290c5hfi65$5",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "string",
                            loc: [29, 11, 29, 14],
                            text: " ",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [30, 11, 30, 19],
                          text: "positive",
                          bindingKey: "positive$1o8290c5hfi65$0",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [31, 11, 31, 14],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [32, 11, 32, 18],
                      text: "largest",
                      bindingKey: "largest$1o8290c5hfi65$1",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [33, 11, 33, 14],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [34, 11, 34, 15],
                  text: "safe",
                  bindingKey: "safe$1o8290c5hfi65$2",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
it("Checked", async (t) => {
  await snapshotCase(t, "Checked", _jsx(Checked, {}));
});
