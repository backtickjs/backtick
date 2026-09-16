import { cs } from "@backtickjs/core";
const methodCall = cs.create(
  [3, 20, 6, 3],
  {
    version: "0.0.0",
    filePath: "methodCall.tsx",
    fileHash: "hab02rl5t7np",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 23, 6, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 28],
        name: {
          kind: "id",
          loc: [4, 9, 4, 17],
          text: "greeting",
          bindingKey: "greeting$hab02rl5t7np$0",
        },
        initializer: {
          kind: "string",
          loc: [4, 20, 4, 27],
          text: "Hello",
        },
      },
      {
        kind: "return",
        loc: [5, 3, 5, 55],
        expression: {
          kind: "()",
          loc: [5, 10, 5, 54],
          expression: {
            kind: ".",
            loc: [5, 10, 5, 52],
            expression: {
              kind: "()",
              loc: [5, 10, 5, 40],
              expression: {
                kind: ".",
                loc: [5, 10, 5, 25],
                expression: {
                  kind: "id",
                  loc: [5, 10, 5, 18],
                  text: "greeting",
                  bindingKey: "greeting$hab02rl5t7np$0",
                },
                name: "concat",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [5, 26, 5, 30],
                  text: ", ",
                },
                {
                  kind: "string",
                  loc: [5, 32, 5, 39],
                  text: "World",
                },
              ],
            },
            name: "toUpperCase",
          },
          arguments: [],
        },
      },
    ],
  }),
);
