import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "spliceSharing.tsx",
      fileHash: "v5j0gov1aw7q",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [4, 13, 4, 24],
      left: {
        kind: "splice",
        loc: [4, 13, 4, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "splice",
        loc: [4, 20, 4, 24],
        key: "$rhs",
      },
    }),
  );
}
const spliceSharing = cs.create(
  [7, 23, 10, 4],
  {
    version: "0.0.0",
    filePath: "spliceSharing.tsx",
    fileHash: "v5j0gov1aw7q",
    splices: {
      $0splice0: {
        value: add(
          cs.create(
            [8, 12, 8, 17],
            {
              version: "0.0.0",
              filePath: "spliceSharing.tsx",
              fileHash: "v5j0gov1aw7q",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [8, 15, 8, 16],
              value: 1,
            }),
          ),
          cs.create(
            [8, 19, 8, 24],
            {
              version: "0.0.0",
              filePath: "spliceSharing.tsx",
              fileHash: "v5j0gov1aw7q",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [8, 22, 8, 23],
              value: 2,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: add(
          cs.create(
            [9, 12, 9, 17],
            {
              version: "0.0.0",
              filePath: "spliceSharing.tsx",
              fileHash: "v5j0gov1aw7q",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [9, 15, 9, 16],
              value: 3,
            }),
          ),
          cs.create(
            [9, 19, 9, 24],
            {
              version: "0.0.0",
              filePath: "spliceSharing.tsx",
              fileHash: "v5j0gov1aw7q",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [9, 22, 9, 23],
              value: 4,
            }),
          ),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [7, 27, 10, 2],
    properties: [
      {
        kind: ":",
        loc: [8, 3, 8, 26],
        name: "x",
        initializer: {
          kind: "splice",
          loc: [8, 6, 8, 26],
          key: "$0splice0",
        },
      },
      {
        kind: ":",
        loc: [9, 3, 9, 26],
        name: "y",
        initializer: {
          kind: "splice",
          loc: [9, 6, 9, 26],
          key: "$0splice1",
        },
      },
    ],
  }),
);
