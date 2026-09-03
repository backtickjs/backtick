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
    kind: "{}",
    loc: [5, 19, 7, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 15],
        name: {
          kind: "id",
          loc: [6, 9, 6, 10],
          text: "x",
          bindingKey: "x$1937kl3l6y7n7$0",
        },
        initializer: {
          kind: "number",
          loc: [6, 13, 6, 14],
          value: 1,
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
    kind: "{}",
    loc: [9, 26, 12, 2],
    statements: [
      {
        kind: "const",
        loc: [10, 3, 10, 28],
        name: {
          kind: "id",
          loc: [10, 9, 10, 13],
          text: "list",
          bindingKey: "list$1937kl3l6y7n7$1",
        },
        initializer: {
          kind: "splice",
          loc: [10, 16, 10, 27],
          key: "$0splice0",
        },
      },
      {
        kind: "return",
        loc: [11, 3, 11, 12],
        expression: {
          kind: "number",
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
    kind: "{}",
    loc: [14, 25, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [15, 3, 15, 36],
        name: {
          kind: "id",
          loc: [15, 9, 15, 12],
          text: "map",
          bindingKey: "map$1937kl3l6y7n7$2",
        },
        initializer: {
          kind: "splice",
          loc: [15, 15, 15, 35],
          key: "$0splice0",
        },
      },
      {
        kind: "return",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "number",
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
