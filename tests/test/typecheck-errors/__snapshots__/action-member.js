import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-member.test.tsx",
    fileHash: "o6lq8vbi43ci",
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
          bindingKey: "x$o6lq8vbi43ci$0",
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
  [9, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-member.test.tsx",
    fileHash: "o6lq8vbi43ci",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 19, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 28],
        name: {
          kind: "id",
          loc: [11, 9, 11, 13],
          text: "list",
          bindingKey: "list$o6lq8vbi43ci$1",
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
