import { cs } from "@backtickjs/core";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
const spliceOrder = cs.create(
  [8, 21, 8, 55],
  {
    version: "0.0.0",
    filePath: "spliceOrder.tsx",
    fileHash: "26qqzduscx31j",
    splices: {
      $count: { value: count, params: [] },
      $0splice0: { value: ++count, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [8, 25, 8, 53],
    properties: [
      {
        kind: ":",
        loc: [8, 27, 8, 36],
        name: "a",
        initializer: {
          kind: "splice",
          loc: [8, 30, 8, 36],
          key: "$count",
        },
      },
      {
        kind: ":",
        loc: [8, 38, 8, 51],
        name: "b",
        initializer: {
          kind: "splice",
          loc: [8, 41, 8, 51],
          key: "$0splice0",
        },
      },
    ],
  }),
);
