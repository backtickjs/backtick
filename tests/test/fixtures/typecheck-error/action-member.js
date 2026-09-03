import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "1wli9dj2vweno",
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
          bindingKey: "x$1wli9dj2vweno$0",
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
export default cs.create(
  [9, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "1wli9dj2vweno",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 19, 12, 2],
    statements: [
      {
        kind: "const",
        loc: [10, 3, 10, 28],
        name: {
          kind: "id",
          loc: [10, 9, 10, 13],
          text: "list",
          bindingKey: "list$1wli9dj2vweno$1",
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
