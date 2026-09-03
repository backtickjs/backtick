import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "arrow.ts",
    fileHash: "357jk2g9zktff",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 19],
        name: {
          kind: "id",
          loc: [4, 9, 4, 13],
          text: "base",
          bindingKey: "base$357jk2g9zktff$0",
        },
        initializer: {
          kind: "number",
          loc: [4, 16, 4, 18],
          value: 10,
        },
      },
      {
        kind: "return",
        loc: [5, 3, 5, 57],
        expression: {
          kind: "=>",
          loc: [5, 10, 5, 56],
          parameters: [
            {
              kind: "param",
              loc: [5, 11, 5, 22],
              name: {
                kind: "id",
                loc: [5, 11, 5, 14],
                text: "one",
                bindingKey: "one$357jk2g9zktff$1",
              },
            },
            {
              kind: "param",
              loc: [5, 24, 5, 35],
              name: {
                kind: "id",
                loc: [5, 24, 5, 27],
                text: "two",
                bindingKey: "two$357jk2g9zktff$2",
              },
            },
          ],
          body: {
            kind: "binop",
            loc: [5, 40, 5, 56],
            left: {
              kind: "binop",
              loc: [5, 40, 5, 49],
              left: {
                kind: "id",
                loc: [5, 40, 5, 43],
                text: "one",
                bindingKey: "one$357jk2g9zktff$1",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [5, 46, 5, 49],
                text: "two",
                bindingKey: "two$357jk2g9zktff$2",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [5, 52, 5, 56],
              text: "base",
              bindingKey: "base$357jk2g9zktff$0",
            },
          },
        },
      },
    ],
  }),
);
