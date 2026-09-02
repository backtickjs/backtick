import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "nested-scripts.ts",
    fileHash: "3d1j5mxf94bs6",
    splices: {
      $0splice0: {
        value: cs.create(
          [5, 12, 5, 17],
          {
            version: "0.0.0",
            filePath: "nested-scripts.ts",
            fileHash: "3d1j5mxf94bs6",
            splices: {},
            captures: ["x$3d1j5mxf94bs6$0"],
          },
          () => ({
            kind: 80,
            loc: [5, 15, 5, 16],
            text: "x",
            bindingKey: "x$3d1j5mxf94bs6$0",
          }),
        ),
        params: ["x$3d1j5mxf94bs6$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: 244,
        loc: [4, 3, 4, 15],
        declarationList: {
          kind: 262,
          loc: [4, 3, 4, 14],
          declarations: [
            {
              kind: 261,
              loc: [4, 9, 4, 14],
              name: {
                kind: 80,
                loc: [4, 9, 4, 10],
                text: "x",
                bindingKey: "x$3d1j5mxf94bs6$0",
              },
              initializer: {
                kind: 9,
                loc: [4, 13, 4, 14],
                value: 0,
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [5, 3, 5, 19],
        expression: {
          kind: 1000,
          loc: [5, 10, 5, 18],
          key: "$0splice0",
        },
      },
    ],
  }),
);
