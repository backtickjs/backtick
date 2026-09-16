import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    [9, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/number-statics.test.tsx",
      fileHash: "1odtlacqmaaab",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [9, 13, 18, 4],
      statements: [
        {
          kind: "const",
          loc: [10, 5, 10, 41],
          name: {
            kind: "id",
            loc: [10, 11, 10, 19],
            text: "positive",
            bindingKey: "positive$1odtlacqmaaab$0",
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
          loc: [11, 5, 11, 39],
          name: {
            kind: "id",
            loc: [11, 11, 11, 16],
            text: "whole",
            bindingKey: "whole$1odtlacqmaaab$1",
          },
          initializer: {
            kind: "()",
            loc: [11, 19, 11, 38],
            expression: {
              kind: "bltn",
              loc: [11, 19, 11, 35],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [11, 36, 11, 37],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [12, 5, 12, 46],
          name: {
            kind: "id",
            loc: [12, 11, 12, 21],
            text: "fractional",
            bindingKey: "fractional$1odtlacqmaaab$2",
          },
          initializer: {
            kind: "()",
            loc: [12, 24, 12, 45],
            expression: {
              kind: "bltn",
              loc: [12, 24, 12, 40],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [12, 41, 12, 44],
                value: 2.5,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [14, 5, 14, 42],
          name: {
            kind: "id",
            loc: [14, 11, 14, 18],
            text: "written",
            bindingKey: "written$1odtlacqmaaab$3",
          },
          initializer: {
            kind: "()",
            loc: [14, 21, 14, 41],
            expression: {
              kind: "bltn",
              loc: [14, 21, 14, 36],
              name: "Number.isFinite",
            },
            arguments: [
              {
                kind: "string",
                loc: [14, 37, 14, 40],
                text: "2",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [15, 5, 17, 7],
          expression: {
            kind: "jsx",
            loc: [16, 7, 16, 79],
            type: {
              kind: "string",
              loc: [16, 8, 16, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [16, 14, 16, 71],
                left: {
                  kind: "binop",
                  loc: [16, 14, 16, 60],
                  left: {
                    kind: "binop",
                    loc: [16, 14, 16, 54],
                    left: {
                      kind: "binop",
                      loc: [16, 14, 16, 44],
                      left: {
                        kind: "binop",
                        loc: [16, 14, 16, 38],
                        left: {
                          kind: "binop",
                          loc: [16, 14, 16, 25],
                          left: {
                            kind: "id",
                            loc: [16, 14, 16, 19],
                            text: "whole",
                            bindingKey: "whole$1odtlacqmaaab$1",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "string",
                            loc: [16, 22, 16, 25],
                            text: " ",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [16, 28, 16, 38],
                          text: "fractional",
                          bindingKey: "fractional$1odtlacqmaaab$2",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [16, 41, 16, 44],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [16, 47, 16, 54],
                      text: "written",
                      bindingKey: "written$1odtlacqmaaab$3",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [16, 57, 16, 60],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [16, 63, 16, 71],
                  text: "positive",
                  bindingKey: "positive$1odtlacqmaaab$0",
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
