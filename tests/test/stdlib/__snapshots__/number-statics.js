import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    [9, 10, 29, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/number-statics.test.tsx",
      fileHash: "2nrwvnc0tmqsw",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [9, 13, 29, 4],
      statements: [
        {
          kind: "const",
          loc: [10, 5, 10, 41],
          name: {
            kind: "id",
            loc: [10, 11, 10, 19],
            text: "positive",
            bindingKey: "positive$2nrwvnc0tmqsw$0",
          },
          initializer: {
            kind: "binop",
            loc: [10, 22, 10, 40],
            left: {
              kind: "bltn",
              loc: [10, 22, 10, 36],
              name: "Number.EPSILON",
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
            bindingKey: "largest$2nrwvnc0tmqsw$1",
          },
          initializer: {
            kind: "binop",
            loc: [11, 21, 11, 45],
            left: {
              kind: "bltn",
              loc: [11, 21, 11, 37],
              name: "Number.MAX_VALUE",
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
          loc: [12, 5, 12, 39],
          name: {
            kind: "id",
            loc: [12, 11, 12, 16],
            text: "whole",
            bindingKey: "whole$2nrwvnc0tmqsw$2",
          },
          initializer: {
            kind: "()",
            loc: [12, 19, 12, 38],
            expression: {
              kind: "bltn",
              loc: [12, 19, 12, 35],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [12, 36, 12, 37],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [13, 5, 13, 46],
          name: {
            kind: "id",
            loc: [13, 11, 13, 21],
            text: "fractional",
            bindingKey: "fractional$2nrwvnc0tmqsw$3",
          },
          initializer: {
            kind: "()",
            loc: [13, 24, 13, 45],
            expression: {
              kind: "bltn",
              loc: [13, 24, 13, 40],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [13, 41, 13, 44],
                value: 2.5,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [15, 5, 15, 42],
          name: {
            kind: "id",
            loc: [15, 11, 15, 18],
            text: "written",
            bindingKey: "written$2nrwvnc0tmqsw$4",
          },
          initializer: {
            kind: "()",
            loc: [15, 21, 15, 41],
            expression: {
              kind: "bltn",
              loc: [15, 21, 15, 36],
              name: "Number.isFinite",
            },
            arguments: [
              {
                kind: "string",
                loc: [15, 37, 15, 40],
                text: "2",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [16, 5, 28, 7],
          expression: {
            kind: "jsx",
            loc: [17, 7, 27, 14],
            type: {
              kind: "string",
              loc: [17, 8, 17, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [18, 10, 26, 18],
                left: {
                  kind: "binop",
                  loc: [18, 10, 25, 14],
                  left: {
                    kind: "binop",
                    loc: [18, 10, 24, 19],
                    left: {
                      kind: "binop",
                      loc: [18, 10, 23, 14],
                      left: {
                        kind: "binop",
                        loc: [18, 10, 22, 18],
                        left: {
                          kind: "binop",
                          loc: [18, 10, 21, 14],
                          left: {
                            kind: "binop",
                            loc: [18, 10, 20, 21],
                            left: {
                              kind: "binop",
                              loc: [18, 10, 19, 14],
                              left: {
                                kind: "id",
                                loc: [18, 10, 18, 15],
                                text: "whole",
                                bindingKey: "whole$2nrwvnc0tmqsw$2",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "string",
                                loc: [19, 11, 19, 14],
                                text: " ",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [20, 11, 20, 21],
                              text: "fractional",
                              bindingKey: "fractional$2nrwvnc0tmqsw$3",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "string",
                            loc: [21, 11, 21, 14],
                            text: " ",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [22, 11, 22, 18],
                          text: "written",
                          bindingKey: "written$2nrwvnc0tmqsw$4",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [23, 11, 23, 14],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [24, 11, 24, 19],
                      text: "positive",
                      bindingKey: "positive$2nrwvnc0tmqsw$0",
                    },
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
                  loc: [26, 11, 26, 18],
                  text: "largest",
                  bindingKey: "largest$2nrwvnc0tmqsw$1",
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
