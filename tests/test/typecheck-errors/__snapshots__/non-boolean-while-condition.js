import { cs } from "@backtickjs/core";
// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-while-condition.test.tsx",
    fileHash: "35ew3k4d5ef7n",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 19, 12, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 20, 5, 29],
        name: {
          kind: "id",
          loc: [5, 20, 5, 21],
          text: "n",
          bindingKey: "n$35ew3k4d5ef7n$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 34, 12, 2],
      statements: [
        {
          kind: "let",
          loc: [6, 3, 6, 16],
          name: {
            kind: "id",
            loc: [6, 7, 6, 11],
            text: "left",
            bindingKey: "left$35ew3k4d5ef7n$1",
          },
          initializer: {
            kind: "id",
            loc: [6, 14, 6, 15],
            text: "n",
            bindingKey: "n$35ew3k4d5ef7n$0",
          },
        },
        {
          kind: "while",
          loc: [8, 3, 10, 4],
          expression: {
            kind: "id",
            loc: [8, 10, 8, 14],
            text: "left",
            bindingKey: "left$35ew3k4d5ef7n$1",
          },
          statement: {
            kind: "{}",
            loc: [8, 16, 10, 4],
            statements: [
              {
                kind: "binop",
                loc: [9, 5, 9, 20],
                left: {
                  kind: "id",
                  loc: [9, 5, 9, 9],
                  text: "left",
                  bindingKey: "left$35ew3k4d5ef7n$1",
                },
                operatorToken: "=",
                right: {
                  kind: "binop",
                  loc: [9, 12, 9, 20],
                  left: {
                    kind: "id",
                    loc: [9, 12, 9, 16],
                    text: "left",
                    bindingKey: "left$35ew3k4d5ef7n$1",
                  },
                  operatorToken: "-",
                  right: {
                    kind: "number",
                    loc: [9, 19, 9, 20],
                    value: 1,
                  },
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [11, 3, 11, 15],
          expression: {
            kind: "id",
            loc: [11, 10, 11, 14],
            text: "left",
            bindingKey: "left$35ew3k4d5ef7n$1",
          },
        },
      ],
    },
  }),
);
