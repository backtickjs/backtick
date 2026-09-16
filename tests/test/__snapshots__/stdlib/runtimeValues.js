import { cs } from "@backtickjs/core";
const runtimeValues = cs.create(
  [3, 23, 6, 4],
  {
    version: "0.0.0",
    filePath: "runtimeValues.tsx",
    fileHash: "vyvvt4d328ir",
    splices: {
      $0splice0: { value: [1, "two", true, null], params: [] },
      $0splice1: { value: { k: 3 }, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [3, 27, 6, 2],
    properties: [
      {
        kind: ":",
        loc: [4, 3, 4, 34],
        name: "list",
        initializer: {
          kind: "splice",
          loc: [4, 9, 4, 34],
          key: "$0splice0",
        },
      },
      {
        kind: ":",
        loc: [5, 3, 5, 19],
        name: "obj",
        initializer: {
          kind: "splice",
          loc: [5, 8, 5, 19],
          key: "$0splice1",
        },
      },
    ],
  }),
);
