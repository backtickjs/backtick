import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 3, 75],
  {
    version: "0.0.0",
    filePath: "runtime-values.ts",
    fileHash: "1rjo8fz06u9rg",
    splices: {
      $0splice0: { value: [1, "two", true, null], params: [] },
      $0splice1: { value: { k: 3 }, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [3, 20, 3, 73],
    properties: [
      {
        kind: ":",
        loc: [3, 22, 3, 53],
        name: "list",
        initializer: {
          kind: "splice",
          loc: [3, 28, 3, 53],
          key: "$0splice0",
        },
      },
      {
        kind: ":",
        loc: [3, 55, 3, 71],
        name: "obj",
        initializer: {
          kind: "splice",
          loc: [3, 60, 3, 71],
          key: "$0splice1",
        },
      },
    ],
  }),
);
