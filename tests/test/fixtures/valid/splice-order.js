import { cs } from "@backtickjs/core";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
export default cs.create(
  [8, 16, 8, 50],
  {
    version: "0.0.0",
    filePath: "splice-order.ts",
    fileHash: "6o3erh5ve8um",
    splices: {
      $count: { value: count, params: [] },
      $0splice0: { value: ++count, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [8, 20, 8, 48],
    properties: [
      {
        kind: ":",
        loc: [8, 22, 8, 31],
        name: "a",
        initializer: {
          kind: "splice",
          loc: [8, 25, 8, 31],
          key: "$count",
        },
      },
      {
        kind: ":",
        loc: [8, 33, 8, 46],
        name: "b",
        initializer: {
          kind: "splice",
          loc: [8, 36, 8, 46],
          key: "$0splice0",
        },
      },
    ],
  }),
);
