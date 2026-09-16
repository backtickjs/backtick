import { cs } from "@backtickjs/core";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    [7, 10, 12, 5],
    {
      version: "0.0.0",
      filePath: "Parsed.tsx",
      fileHash: "1tlx97m9ip9o1",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 12, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 43],
          name: {
            kind: "id",
            loc: [8, 11, 8, 16],
            text: "whole",
            bindingKey: "whole$1tlx97m9ip9o1$0",
          },
          initializer: {
            kind: "()",
            loc: [8, 19, 8, 42],
            expression: {
              kind: "bltn",
              loc: [8, 19, 8, 34],
              name: "Number.parseInt",
            },
            arguments: [
              {
                kind: "string",
                loc: [8, 35, 8, 41],
                text: "42px",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [9, 5, 9, 45],
          name: {
            kind: "id",
            loc: [9, 11, 9, 16],
            text: "based",
            bindingKey: "based$1tlx97m9ip9o1$1",
          },
          initializer: {
            kind: "()",
            loc: [9, 19, 9, 44],
            expression: {
              kind: "bltn",
              loc: [9, 19, 9, 34],
              name: "Number.parseInt",
            },
            arguments: [
              {
                kind: "string",
                loc: [9, 35, 9, 39],
                text: "ff",
              },
              {
                kind: "number",
                loc: [9, 41, 9, 43],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [10, 5, 10, 49],
          name: {
            kind: "id",
            loc: [10, 11, 10, 21],
            text: "fractional",
            bindingKey: "fractional$1tlx97m9ip9o1$2",
          },
          initializer: {
            kind: "()",
            loc: [10, 24, 10, 48],
            expression: {
              kind: "bltn",
              loc: [10, 24, 10, 41],
              name: "Number.parseFloat",
            },
            arguments: [
              {
                kind: "string",
                loc: [10, 42, 10, 47],
                text: "1.5",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [11, 5, 11, 59],
          expression: {
            kind: "jsx",
            loc: [11, 12, 11, 58],
            type: {
              kind: "string",
              loc: [11, 13, 11, 17],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [11, 19, 11, 50],
                left: {
                  kind: "binop",
                  loc: [11, 19, 11, 45],
                  left: {
                    kind: "binop",
                    loc: [11, 19, 11, 32],
                    left: {
                      kind: "id",
                      loc: [11, 19, 11, 24],
                      text: "whole",
                      bindingKey: "whole$1tlx97m9ip9o1$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [11, 27, 11, 32],
                      text: "based",
                      bindingKey: "based$1tlx97m9ip9o1$1",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [11, 35, 11, 45],
                    text: "fractional",
                    bindingKey: "fractional$1tlx97m9ip9o1$2",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
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
