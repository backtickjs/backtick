import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "nested-scripts.ts",
    fileHash: "3d1j5mxf94bs6",
    kind: "value",
    splices: {
      $0splice0: cs.create(
        [5, 12, 5, 17],
        {
          version: "0.0.0",
          filePath: "nested-scripts.ts",
          fileHash: "3d1j5mxf94bs6",
          kind: "value",
          splices: {},
          captures: ["x$3d1j5mxf94bs6$0"],
          declarations: [],
        },
        (v) => v.identifier([5, 15, 5, 16], "x", "x$3d1j5mxf94bs6$0"),
      ),
    },
    captures: [],
    declarations: ["x$3d1j5mxf94bs6$0"],
  },
  (v) =>
    v.block(
      [3, 19, 6, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 15],
          "const",
          v.identifier([4, 9, 4, 10], "x", "x$3d1j5mxf94bs6$0"),
          v.number([4, 13, 4, 14], 0),
        ),
        v.return([5, 3, 5, 19], v.splice([5, 10, 5, 18], "$0splice0")),
      ],
    ),
);
