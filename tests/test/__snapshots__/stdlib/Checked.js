import { cs } from "@backtickjs/core";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    [7, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "Checked.tsx",
      fileHash: "20g2za4wjwohf",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 16, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 41],
          name: {
            kind: "id",
            loc: [8, 11, 8, 19],
            text: "positive",
            bindingKey: "positive$20g2za4wjwohf$0",
          },
          initializer: {
            kind: "binop",
            loc: [8, 22, 8, 40],
            left: {
              kind: "bltn",
              loc: [8, 22, 8, 36],
              name: "Number.EPSILON",
            },
            operatorToken: ">",
            right: {
              kind: "number",
              loc: [8, 39, 8, 40],
              value: 0,
            },
          },
        },
        {
          kind: "const",
          loc: [9, 5, 9, 39],
          name: {
            kind: "id",
            loc: [9, 11, 9, 16],
            text: "whole",
            bindingKey: "whole$20g2za4wjwohf$1",
          },
          initializer: {
            kind: "()",
            loc: [9, 19, 9, 38],
            expression: {
              kind: "bltn",
              loc: [9, 19, 9, 35],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [9, 36, 9, 37],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [10, 5, 10, 46],
          name: {
            kind: "id",
            loc: [10, 11, 10, 21],
            text: "fractional",
            bindingKey: "fractional$20g2za4wjwohf$2",
          },
          initializer: {
            kind: "()",
            loc: [10, 24, 10, 45],
            expression: {
              kind: "bltn",
              loc: [10, 24, 10, 40],
              name: "Number.isInteger",
            },
            arguments: [
              {
                kind: "number",
                loc: [10, 41, 10, 44],
                value: 2.5,
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [12, 5, 12, 42],
          name: {
            kind: "id",
            loc: [12, 11, 12, 18],
            text: "written",
            bindingKey: "written$20g2za4wjwohf$3",
          },
          initializer: {
            kind: "()",
            loc: [12, 21, 12, 41],
            expression: {
              kind: "bltn",
              loc: [12, 21, 12, 36],
              name: "Number.isFinite",
            },
            arguments: [
              {
                kind: "string",
                loc: [12, 37, 12, 40],
                text: "2",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [13, 5, 15, 7],
          expression: {
            kind: "jsx",
            loc: [14, 7, 14, 79],
            type: {
              kind: "string",
              loc: [14, 8, 14, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [14, 14, 14, 71],
                left: {
                  kind: "binop",
                  loc: [14, 14, 14, 60],
                  left: {
                    kind: "binop",
                    loc: [14, 14, 14, 54],
                    left: {
                      kind: "binop",
                      loc: [14, 14, 14, 44],
                      left: {
                        kind: "binop",
                        loc: [14, 14, 14, 38],
                        left: {
                          kind: "binop",
                          loc: [14, 14, 14, 25],
                          left: {
                            kind: "id",
                            loc: [14, 14, 14, 19],
                            text: "whole",
                            bindingKey: "whole$20g2za4wjwohf$1",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "string",
                            loc: [14, 22, 14, 25],
                            text: " ",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [14, 28, 14, 38],
                          text: "fractional",
                          bindingKey: "fractional$20g2za4wjwohf$2",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [14, 41, 14, 44],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [14, 47, 14, 54],
                      text: "written",
                      bindingKey: "written$20g2za4wjwohf$3",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [14, 57, 14, 60],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [14, 63, 14, 71],
                  text: "positive",
                  bindingKey: "positive$20g2za4wjwohf$0",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
