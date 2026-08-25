import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    [7, 10, 12, 5],
    {
      version: "0.0.0",
      filePath: "number-parsing.tsx",
      fileHash: "2ae90j4efmz9h",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [7, 13, 12, 4],
      statements: [
        {
          kind: 244,
          loc: [8, 5, 8, 43],
          declarationList: {
            kind: 262,
            loc: [8, 5, 8, 42],
            declarations: [
              {
                kind: 261,
                loc: [8, 11, 8, 42],
                name: {
                  kind: 80,
                  loc: [8, 11, 8, 16],
                  text: "whole",
                  bindingKey: "whole$2ae90j4efmz9h$0",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 19, 8, 42],
                  expression: {
                    kind: 1001,
                    loc: [8, 19, 8, 34],
                    name: "Number.parseInt",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [8, 35, 8, 41],
                      text: "42px",
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
          loc: [9, 5, 9, 45],
          declarationList: {
            kind: 262,
            loc: [9, 5, 9, 44],
            declarations: [
              {
                kind: 261,
                loc: [9, 11, 9, 44],
                name: {
                  kind: 80,
                  loc: [9, 11, 9, 16],
                  text: "based",
                  bindingKey: "based$2ae90j4efmz9h$1",
                },
                initializer: {
                  kind: 214,
                  loc: [9, 19, 9, 44],
                  expression: {
                    kind: 1001,
                    loc: [9, 19, 9, 34],
                    name: "Number.parseInt",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [9, 35, 9, 39],
                      text: "ff",
                    },
                    {
                      kind: 9,
                      loc: [9, 41, 9, 43],
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
          kind: 244,
          loc: [10, 5, 10, 49],
          declarationList: {
            kind: 262,
            loc: [10, 5, 10, 48],
            declarations: [
              {
                kind: 261,
                loc: [10, 11, 10, 48],
                name: {
                  kind: 80,
                  loc: [10, 11, 10, 21],
                  text: "fractional",
                  bindingKey: "fractional$2ae90j4efmz9h$2",
                },
                initializer: {
                  kind: 214,
                  loc: [10, 24, 10, 48],
                  expression: {
                    kind: 1001,
                    loc: [10, 24, 10, 41],
                    name: "Number.parseFloat",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [10, 42, 10, 47],
                      text: "1.5",
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
          loc: [11, 5, 11, 59],
          expression: {
            kind: 285,
            loc: [11, 12, 11, 58],
            type: {
              kind: 11,
              loc: [11, 13, 11, 17],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: 227,
                loc: [11, 19, 11, 50],
                left: {
                  kind: 227,
                  loc: [11, 19, 11, 45],
                  left: {
                    kind: 227,
                    loc: [11, 19, 11, 32],
                    left: {
                      kind: 80,
                      loc: [11, 19, 11, 24],
                      text: "whole",
                      bindingKey: "whole$2ae90j4efmz9h$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 80,
                      loc: [11, 27, 11, 32],
                      text: "based",
                      bindingKey: "based$2ae90j4efmz9h$1",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: 80,
                    loc: [11, 35, 11, 45],
                    text: "fractional",
                    bindingKey: "fractional$2ae90j4efmz9h$2",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 11,
                  loc: [11, 48, 11, 50],
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
export default _jsx(Parsed, {});
