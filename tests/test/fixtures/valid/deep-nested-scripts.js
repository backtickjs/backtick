import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "deep-nested-scripts.ts",
      fileHash: "jmxp905pbgk8",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: 227,
      loc: [4, 13, 4, 24],
      left: {
        kind: 1000,
        loc: [4, 13, 4, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: 1000,
        loc: [4, 20, 4, 24],
        key: "$rhs",
      },
    }),
  );
}
export default cs.create(
  [7, 16, 7, 40],
  {
    version: "0.0.0",
    filePath: "deep-nested-scripts.ts",
    fileHash: "jmxp905pbgk8",
    splices: {
      $0splice0: {
        value: add(
          cs.create(
            [7, 25, 7, 30],
            {
              version: "0.0.0",
              filePath: "deep-nested-scripts.ts",
              fileHash: "jmxp905pbgk8",
              splices: {},
              captures: [],
            },
            () => ({
              kind: 9,
              loc: [7, 28, 7, 29],
              value: 1,
            }),
          ),
          cs.create(
            [7, 32, 7, 37],
            {
              version: "0.0.0",
              filePath: "deep-nested-scripts.ts",
              fileHash: "jmxp905pbgk8",
              splices: {},
              captures: [],
            },
            () => ({
              kind: 9,
              loc: [7, 35, 7, 36],
              value: 2,
            }),
          ),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: 1000,
    loc: [7, 19, 7, 39],
    key: "$0splice0",
  }),
);
