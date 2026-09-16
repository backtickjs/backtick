import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "3u22ze1jwlgvr",
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
          bindingKey: "x$3u22ze1jwlgvr$0",
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
  [9, 23, 13, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "3u22ze1jwlgvr",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 26, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 28],
        name: {
          kind: "id",
          loc: [11, 9, 11, 13],
          text: "list",
          bindingKey: "list$3u22ze1jwlgvr$1",
        },
        initializer: {
          kind: "splice",
          loc: [11, 16, 11, 27],
          key: "$0splice0",
        },
      },
      {
        kind: "return",
        loc: [12, 3, 12, 12],
        expression: {
          kind: "number",
          loc: [12, 10, 12, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const keyed = cs.create(
  [15, 22, 19, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "3u22ze1jwlgvr",
    splices: { $0splice0: { value: { press: action }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [15, 25, 19, 2],
    statements: [
      {
        kind: "const",
        loc: [17, 3, 17, 36],
        name: {
          kind: "id",
          loc: [17, 9, 17, 12],
          text: "map",
          bindingKey: "map$3u22ze1jwlgvr$2",
        },
        initializer: {
          kind: "splice",
          loc: [17, 15, 17, 35],
          key: "$0splice0",
        },
      },
      {
        kind: "return",
        loc: [18, 3, 18, 12],
        expression: {
          kind: "number",
          loc: [18, 10, 18, 11],
          value: 1,
        },
      },
    ],
  }),
);
