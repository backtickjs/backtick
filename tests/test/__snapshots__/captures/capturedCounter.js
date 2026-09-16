import { cs } from "@backtickjs/core";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
const capturedCounter = cs.create(
  [5, 25, 12, 3],
  {
    version: "0.0.0",
    filePath: "capturedCounter.tsx",
    fileHash: "3tdhzpfdpc9f9",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 28, 12, 2],
    statements: [
      {
        kind: "let",
        loc: [6, 3, 6, 17],
        name: {
          kind: "id",
          loc: [6, 7, 6, 12],
          text: "count",
          bindingKey: "count$3tdhzpfdpc9f9$0",
        },
        initializer: {
          kind: "number",
          loc: [6, 15, 6, 16],
          value: 0,
        },
      },
      {
        kind: "const",
        loc: [7, 3, 10, 5],
        name: {
          kind: "id",
          loc: [7, 9, 7, 13],
          text: "bump",
          bindingKey: "bump$3tdhzpfdpc9f9$1",
        },
        initializer: {
          kind: "=>",
          loc: [7, 16, 10, 4],
          parameters: [],
          body: {
            kind: "{}",
            loc: [7, 22, 10, 4],
            statements: [
              {
                kind: "binop",
                loc: [8, 5, 8, 22],
                left: {
                  kind: "id",
                  loc: [8, 5, 8, 10],
                  text: "count",
                  bindingKey: "count$3tdhzpfdpc9f9$0",
                },
                operatorToken: "=",
                right: {
                  kind: "binop",
                  loc: [8, 13, 8, 22],
                  left: {
                    kind: "id",
                    loc: [8, 13, 8, 18],
                    text: "count",
                    bindingKey: "count$3tdhzpfdpc9f9$0",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "number",
                    loc: [8, 21, 8, 22],
                    value: 1,
                  },
                },
              },
              {
                kind: "return",
                loc: [9, 5, 9, 18],
                expression: {
                  kind: "id",
                  loc: [9, 12, 9, 17],
                  text: "count",
                  bindingKey: "count$3tdhzpfdpc9f9$0",
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [11, 3, 11, 26],
        expression: {
          kind: "binop",
          loc: [11, 10, 11, 25],
          left: {
            kind: "()",
            loc: [11, 10, 11, 16],
            expression: {
              kind: "id",
              loc: [11, 10, 11, 14],
              text: "bump",
              bindingKey: "bump$3tdhzpfdpc9f9$1",
            },
            arguments: [],
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [11, 19, 11, 25],
            expression: {
              kind: "id",
              loc: [11, 19, 11, 23],
              text: "bump",
              bindingKey: "bump$3tdhzpfdpc9f9$1",
            },
            arguments: [],
          },
        },
      },
    ],
  }),
);
