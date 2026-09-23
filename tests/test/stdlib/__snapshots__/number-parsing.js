import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    [9, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/number-parsing.test.tsx",
      fileHash: "28kni4l69t7vb",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [9, 13, 14, 4],
      statements: [
        {
          kind: "const",
          loc: [10, 5, 10, 43],
          name: {
            kind: "id",
            loc: [10, 11, 10, 16],
            text: "whole",
            bindingKey: "whole$28kni4l69t7vb$0",
          },
          initializer: {
            kind: "()",
            loc: [10, 19, 10, 42],
            expression: {
              kind: ".",
              loc: [10, 19, 10, 34],
              expression: {
                kind: "bltn",
                loc: [10, 19, 10, 25],
                name: "Number",
              },
              name: "parseInt",
            },
            arguments: [
              {
                kind: "string",
                loc: [10, 35, 10, 41],
                text: "42px",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [11, 5, 11, 45],
          name: {
            kind: "id",
            loc: [11, 11, 11, 16],
            text: "based",
            bindingKey: "based$28kni4l69t7vb$1",
          },
          initializer: {
            kind: "()",
            loc: [11, 19, 11, 44],
            expression: {
              kind: ".",
              loc: [11, 19, 11, 34],
              expression: {
                kind: "bltn",
                loc: [11, 19, 11, 25],
                name: "Number",
              },
              name: "parseInt",
            },
            arguments: [
              {
                kind: "string",
                loc: [11, 35, 11, 39],
                text: "ff",
              },
              {
                kind: "number",
                loc: [11, 41, 11, 43],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [12, 5, 12, 49],
          name: {
            kind: "id",
            loc: [12, 11, 12, 21],
            text: "fractional",
            bindingKey: "fractional$28kni4l69t7vb$2",
          },
          initializer: {
            kind: "()",
            loc: [12, 24, 12, 48],
            expression: {
              kind: ".",
              loc: [12, 24, 12, 41],
              expression: {
                kind: "bltn",
                loc: [12, 24, 12, 30],
                name: "Number",
              },
              name: "parseFloat",
            },
            arguments: [
              {
                kind: "string",
                loc: [12, 42, 12, 47],
                text: "1.5",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [13, 5, 13, 59],
          expression: {
            kind: "jsx",
            loc: [13, 12, 13, 58],
            type: {
              kind: "string",
              loc: [13, 13, 13, 17],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [13, 19, 13, 50],
                left: {
                  kind: "binop",
                  loc: [13, 19, 13, 45],
                  left: {
                    kind: "binop",
                    loc: [13, 19, 13, 32],
                    left: {
                      kind: "id",
                      loc: [13, 19, 13, 24],
                      text: "whole",
                      bindingKey: "whole$28kni4l69t7vb$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [13, 27, 13, 32],
                      text: "based",
                      bindingKey: "based$28kni4l69t7vb$1",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [13, 35, 13, 45],
                    text: "fractional",
                    bindingKey: "fractional$28kni4l69t7vb$2",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [13, 48, 13, 50],
                  text: "",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", _jsx(Parsed, {}));
});
