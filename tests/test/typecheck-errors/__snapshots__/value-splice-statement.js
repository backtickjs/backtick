import { cs } from "@backtickjs/core";
// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.create(
  [5, 15, 5, 20],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/value-splice-statement.test.tsx",
    fileHash: "1nbm51mtfsgbx",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [5, 18, 5, 19],
    value: 1,
  }),
);
export const script = cs.create(
  [7, 23, 10, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/value-splice-statement.test.tsx",
    fileHash: "1nbm51mtfsgbx",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 26, 10, 2],
    statements: [
      {
        kind: "splice",
        loc: [9, 3, 9, 9],
        key: "$count",
      },
    ],
  }),
);
