import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [5, 19, 7, 2],
    statements: [
      {
        kind: 244,
        loc: [6, 3, 6, 15],
        declarationList: {
          kind: 262,
          loc: [6, 3, 6, 14],
          declarations: [
            {
              kind: 261,
              loc: [6, 9, 6, 14],
              name: {
                kind: 80,
                loc: [6, 9, 6, 10],
                text: "x",
                bindingKey: "x$1937kl3l6y7n7$0",
              },
              initializer: {
                kind: 9,
                loc: [6, 13, 6, 14],
                value: 1,
              },
            },
          ],
          keyword: "const",
        },
      },
    ],
  }),
);
export const listed = cs.create(
  [9, 23, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [9, 26, 12, 2],
    statements: [
      {
        kind: 244,
        loc: [10, 3, 10, 28],
        declarationList: {
          kind: 262,
          loc: [10, 3, 10, 27],
          declarations: [
            {
              kind: 261,
              loc: [10, 9, 10, 27],
              name: {
                kind: 80,
                loc: [10, 9, 10, 13],
                text: "list",
                bindingKey: "list$1937kl3l6y7n7$1",
              },
              initializer: {
                kind: 1000,
                loc: [10, 16, 10, 27],
                key: "$0splice0",
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [11, 3, 11, 12],
        expression: {
          kind: 9,
          loc: [11, 10, 11, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const keyed = cs.create(
  [14, 22, 17, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    splices: { $0splice0: { value: { press: action }, params: [] } },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [14, 25, 17, 2],
    statements: [
      {
        kind: 244,
        loc: [15, 3, 15, 36],
        declarationList: {
          kind: 262,
          loc: [15, 3, 15, 35],
          declarations: [
            {
              kind: 261,
              loc: [15, 9, 15, 35],
              name: {
                kind: 80,
                loc: [15, 9, 15, 12],
                text: "map",
                bindingKey: "map$1937kl3l6y7n7$2",
              },
              initializer: {
                kind: 1000,
                loc: [15, 15, 15, 35],
                key: "$0splice0",
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [16, 3, 16, 12],
        expression: {
          kind: 9,
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
