import { cs } from "@backtickjs/core";
// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.create(
  [5, 15, 5, 20],
  {
    version: "0.0.0",
    filePath: "value-splice-statement.ts",
    fileHash: "2xzewragy8kyn",
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
  [7, 23, 9, 3],
  {
    version: "0.0.0",
    filePath: "value-splice-statement.ts",
    fileHash: "2xzewragy8kyn",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 26, 9, 2],
    statements: [
      {
        kind: "splice",
        loc: [8, 3, 8, 9],
        key: "$count",
      },
    ],
  }),
);
