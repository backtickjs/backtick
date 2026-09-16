import { cs } from "@backtickjs/core";
const arrow = cs.create(
  [3, 15, 6, 3],
  {
    version: "0.0.0",
    filePath: "arrow.tsx",
    fileHash: "1m0o1z1dqz5ql",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 18, 6, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 19],
        name: {
          kind: "id",
          loc: [4, 9, 4, 13],
          text: "base",
          bindingKey: "base$1m0o1z1dqz5ql$0",
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
                bindingKey: "one$1m0o1z1dqz5ql$1",
              },
            },
            {
              kind: "param",
              loc: [5, 24, 5, 35],
              name: {
                kind: "id",
                loc: [5, 24, 5, 27],
                text: "two",
                bindingKey: "two$1m0o1z1dqz5ql$2",
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
                bindingKey: "one$1m0o1z1dqz5ql$1",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [5, 46, 5, 49],
                text: "two",
                bindingKey: "two$1m0o1z1dqz5ql$2",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [5, 52, 5, 56],
              text: "base",
              bindingKey: "base$1m0o1z1dqz5ql$0",
            },
          },
        },
      },
    ],
  }),
);
