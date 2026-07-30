import { cs } from "@backtickjs/core";
// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-while-condition.ts",
    fileHash: "22k8zyijhbub1",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 19, 11, 2],
    parameters: [
      {
        kind: 170,
        loc: [5, 20, 5, 29],
        name: {
          kind: 80,
          loc: [5, 20, 5, 21],
          text: "n",
          bindingKey: "n$22k8zyijhbub1$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [5, 34, 11, 2],
      statements: [
        {
          kind: 244,
          loc: [6, 3, 6, 16],
          declarationList: {
            kind: 262,
            loc: [6, 3, 6, 15],
            declarations: [
              {
                kind: 261,
                loc: [6, 7, 6, 15],
                name: {
                  kind: 80,
                  loc: [6, 7, 6, 11],
                  text: "left",
                  bindingKey: "left$22k8zyijhbub1$1",
                },
                initializer: {
                  kind: 80,
                  loc: [6, 14, 6, 15],
                  text: "n",
                  bindingKey: "n$22k8zyijhbub1$0",
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 248,
          loc: [7, 3, 9, 4],
          expression: {
            kind: 80,
            loc: [7, 10, 7, 14],
            text: "left",
            bindingKey: "left$22k8zyijhbub1$1",
          },
          statement: {
            kind: 242,
            loc: [7, 16, 9, 4],
            statements: [
              {
                kind: 227,
                loc: [8, 5, 8, 20],
                left: {
                  kind: 80,
                  loc: [8, 5, 8, 9],
                  text: "left",
                  bindingKey: "left$22k8zyijhbub1$1",
                },
                operatorToken: "=",
                right: {
                  kind: 227,
                  loc: [8, 12, 8, 20],
                  left: {
                    kind: 80,
                    loc: [8, 12, 8, 16],
                    text: "left",
                    bindingKey: "left$22k8zyijhbub1$1",
                  },
                  operatorToken: "-",
                  right: {
                    kind: 9,
                    loc: [8, 19, 8, 20],
                    value: 1,
                  },
                },
              },
            ],
          },
        },
        {
          kind: 254,
          loc: [10, 3, 10, 15],
          expression: {
            kind: 80,
            loc: [10, 10, 10, 14],
            text: "left",
            bindingKey: "left$22k8zyijhbub1$1",
          },
        },
      ],
    },
  }),
);
