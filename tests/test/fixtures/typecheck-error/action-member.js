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
    spliceParams: {},
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
                bindingKey: "x$1wli9dj2vweno$0",
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
export default cs.create(
  [9, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "1wli9dj2vweno",
    splices: { $0splice0: [action] },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 242,
    loc: [9, 19, 12, 2],
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
                bindingKey: "list$1wli9dj2vweno$1",
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
