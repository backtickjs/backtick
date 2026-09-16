import { cs } from "@backtickjs/core";
// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-condition.test.tsx",
    fileHash: "e0jptcfnt0fh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 19, 11, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 20, 5, 32],
        name: {
          kind: "id",
          loc: [5, 20, 5, 24],
          text: "name",
          bindingKey: "name$e0jptcfnt0fh$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 37, 11, 2],
      statements: [
        {
          kind: "if",
          loc: [7, 3, 9, 4],
          expression: {
            kind: "id",
            loc: [7, 7, 7, 11],
            text: "name",
            bindingKey: "name$e0jptcfnt0fh$0",
          },
          thenStatement: {
            kind: "{}",
            loc: [7, 13, 9, 4],
            statements: [
              {
                kind: "return",
                loc: [8, 5, 8, 17],
                expression: {
                  kind: "id",
                  loc: [8, 12, 8, 16],
                  text: "name",
                  bindingKey: "name$e0jptcfnt0fh$0",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [10, 3, 10, 22],
          expression: {
            kind: "string",
            loc: [10, 10, 10, 21],
            text: "anonymous",
          },
        },
      ],
    },
  }),
);
