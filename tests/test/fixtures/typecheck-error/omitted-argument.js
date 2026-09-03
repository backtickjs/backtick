import { cs } from "@backtickjs/core";
// A nullable parameter is not an optional argument: omitting it would put
// `undefined` in the function's type, so the caller passes `null`.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    version: "0.0.0",
    filePath: "omitted-argument.ts",
    fileHash: "1gqqin78x7yev",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 18, 7, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 19, 5, 32],
        name: {
          kind: "id",
          loc: [5, 19, 5, 23],
          text: "name",
          bindingKey: "name$1gqqin78x7yev$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 37, 7, 2],
      statements: [
        {
          kind: "return",
          loc: [6, 3, 6, 28],
          expression: {
            kind: "()",
            loc: [6, 10, 6, 27],
            expression: {
              kind: "?.",
              loc: [6, 10, 6, 22],
              expression: {
                kind: "id",
                loc: [6, 10, 6, 14],
                text: "name",
                bindingKey: "name$1gqqin78x7yev$0",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [6, 23, 6, 26],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [9, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "omitted-argument.ts",
    fileHash: "1gqqin78x7yev",
    splices: { $greet: { value: greet, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 19, 11, 2],
    statements: [
      {
        kind: "return",
        loc: [10, 3, 10, 19],
        expression: {
          kind: "()",
          loc: [10, 10, 10, 18],
          expression: {
            kind: "splice",
            loc: [10, 10, 10, 16],
            key: "$greet",
          },
          arguments: [],
        },
      },
    ],
  }),
);
