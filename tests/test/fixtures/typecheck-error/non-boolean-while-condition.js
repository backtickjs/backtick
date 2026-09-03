import { cs } from "@backtickjs/core";
// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-while-condition.ts",
    fileHash: "22k8zyijhbub1",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 19, 11, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 20, 5, 29],
        name: {
          kind: "id",
          loc: [5, 20, 5, 21],
          text: "n",
          bindingKey: "n$22k8zyijhbub1$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 34, 11, 2],
      statements: [
        {
          kind: "let",
          loc: [6, 3, 6, 16],
          name: {
            kind: "id",
            loc: [6, 7, 6, 11],
            text: "left",
            bindingKey: "left$22k8zyijhbub1$1",
          },
          initializer: {
            kind: "id",
            loc: [6, 14, 6, 15],
            text: "n",
            bindingKey: "n$22k8zyijhbub1$0",
          },
        },
        {
          kind: "while",
          loc: [7, 3, 9, 4],
          expression: {
            kind: "id",
            loc: [7, 10, 7, 14],
            text: "left",
            bindingKey: "left$22k8zyijhbub1$1",
          },
          statement: {
            kind: "{}",
            loc: [7, 16, 9, 4],
            statements: [
              {
                kind: "binop",
                loc: [8, 5, 8, 20],
                left: {
                  kind: "id",
                  loc: [8, 5, 8, 9],
                  text: "left",
                  bindingKey: "left$22k8zyijhbub1$1",
                },
                operatorToken: "=",
                right: {
                  kind: "binop",
                  loc: [8, 12, 8, 20],
                  left: {
                    kind: "id",
                    loc: [8, 12, 8, 16],
                    text: "left",
                    bindingKey: "left$22k8zyijhbub1$1",
                  },
                  operatorToken: "-",
                  right: {
                    kind: "number",
                    loc: [8, 19, 8, 20],
                    value: 1,
                  },
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [10, 3, 10, 15],
          expression: {
            kind: "id",
            loc: [10, 10, 10, 14],
            text: "left",
            bindingKey: "left$22k8zyijhbub1$1",
          },
        },
      ],
    },
  }),
);
