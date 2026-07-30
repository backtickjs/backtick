import { cs } from "@backtickjs/core";
// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.create(
  [5, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-condition.ts",
    fileHash: "7s4lkv4w2ddn",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 19, 10, 2],
    parameters: [
      {
        kind: 170,
        loc: [5, 20, 5, 32],
        name: {
          kind: 80,
          loc: [5, 20, 5, 24],
          text: "name",
          bindingKey: "name$7s4lkv4w2ddn$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [5, 37, 10, 2],
      statements: [
        {
          kind: 246,
          loc: [6, 3, 8, 4],
          expression: {
            kind: 80,
            loc: [6, 7, 6, 11],
            text: "name",
            bindingKey: "name$7s4lkv4w2ddn$0",
          },
          thenStatement: {
            kind: 242,
            loc: [6, 13, 8, 4],
            statements: [
              {
                kind: 254,
                loc: [7, 5, 7, 17],
                expression: {
                  kind: 80,
                  loc: [7, 12, 7, 16],
                  text: "name",
                  bindingKey: "name$7s4lkv4w2ddn$0",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [9, 3, 9, 22],
          expression: {
            kind: 11,
            loc: [9, 10, 9, 21],
            text: "anonymous",
          },
        },
      ],
    },
  }),
);
