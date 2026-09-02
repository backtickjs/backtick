import { cs } from "@backtickjs/core";
// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.create(
  [10, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "nested-non-boolean-operand.ts",
    fileHash: "1yqqpc9g2l4nh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [10, 19, 16, 2],
    parameters: [
      {
        kind: 170,
        loc: [10, 20, 10, 33],
        name: {
          kind: 80,
          loc: [10, 20, 10, 25],
          text: "count",
          bindingKey: "count$1yqqpc9g2l4nh$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [10, 38, 16, 2],
      statements: [
        {
          kind: 244,
          loc: [11, 3, 11, 36],
          declarationList: {
            kind: 262,
            loc: [11, 3, 11, 35],
            declarations: [
              {
                kind: 261,
                loc: [11, 9, 11, 35],
                name: {
                  kind: 80,
                  loc: [11, 9, 11, 13],
                  text: "keep",
                  bindingKey: "keep$1yqqpc9g2l4nh$1",
                },
                initializer: {
                  kind: 220,
                  loc: [11, 16, 11, 35],
                  parameters: [
                    {
                      kind: 170,
                      loc: [11, 17, 11, 28],
                      name: {
                        kind: 80,
                        loc: [11, 17, 11, 19],
                        text: "on",
                        bindingKey: "on$1yqqpc9g2l4nh$2",
                      },
                    },
                  ],
                  body: {
                    kind: 80,
                    loc: [11, 33, 11, 35],
                    text: "on",
                    bindingKey: "on$1yqqpc9g2l4nh$2",
                  },
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 246,
          loc: [12, 3, 14, 4],
          expression: {
            kind: 214,
            loc: [12, 7, 12, 31],
            expression: {
              kind: 80,
              loc: [12, 7, 12, 11],
              text: "keep",
              bindingKey: "keep$1yqqpc9g2l4nh$1",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 227,
                loc: [12, 12, 12, 30],
                left: {
                  kind: 80,
                  loc: [12, 12, 12, 17],
                  text: "count",
                  bindingKey: "count$1yqqpc9g2l4nh$0",
                },
                operatorToken: "&&",
                right: {
                  kind: 227,
                  loc: [12, 21, 12, 30],
                  left: {
                    kind: 80,
                    loc: [12, 21, 12, 26],
                    text: "count",
                    bindingKey: "count$1yqqpc9g2l4nh$0",
                  },
                  operatorToken: ">",
                  right: {
                    kind: 9,
                    loc: [12, 29, 12, 30],
                    value: 0,
                  },
                },
              },
            ],
          },
          thenStatement: {
            kind: 242,
            loc: [12, 33, 14, 4],
            statements: [
              {
                kind: 254,
                loc: [13, 5, 13, 19],
                expression: {
                  kind: 11,
                  loc: [13, 12, 13, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [15, 3, 15, 20],
          expression: {
            kind: 11,
            loc: [15, 10, 15, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
