import { cs } from "@backtickjs/core";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "bindingless-catch.ts",
    fileHash: "1jo3526bq0xmc",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [5, 19, 11, 2],
    statements: [
      {
        kind: 259,
        loc: [6, 3, 10, 4],
        tryBlock: {
          kind: 242,
          loc: [6, 7, 8, 4],
          statements: [
            {
              kind: 258,
              loc: [7, 5, 7, 18],
              expression: {
                kind: 11,
                loc: [7, 11, 7, 17],
                text: "boom",
              },
            },
          ],
        },
        catchClause: {
          kind: 300,
          loc: [8, 5, 10, 4],
          variableDeclaration: null,
          block: {
            kind: 242,
            loc: [8, 11, 10, 4],
            statements: [
              {
                kind: 254,
                loc: [9, 5, 9, 21],
                expression: {
                  kind: 11,
                  loc: [9, 12, 9, 20],
                  text: "caught",
                },
              },
            ],
          },
        },
      },
    ],
  }),
);
