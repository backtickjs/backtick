import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text } from "@backtickjs/core";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  [8, 43, 11, 3],
  {
    version: "0.0.0",
    filePath: "jsx-capture.tsx",
    fileHash: "dxmm13j6jyfs",
    kind: "value",
    splices: {
      $0splice0: _jsx(Text, {
        onPress: cs.create(
          [10, 28, 10, 39],
          {
            version: "0.0.0",
            filePath: "jsx-capture.tsx",
            fileHash: "dxmm13j6jyfs",
            kind: "value",
            splices: {},
            captures: ["x$dxmm13j6jyfs$0"],
            spliceParams: {},
          },
          (v) =>
            v.arrowFunction(
              [10, 31, 10, 38],
              [],
              v.identifier([10, 37, 10, 38], "x", "x$dxmm13j6jyfs$0"),
            ),
        ),
      }),
    },
    captures: [],
    spliceParams: { $0splice0: ["x$dxmm13j6jyfs$0"] },
  },
  (v) =>
    v.arrowFunction(
      [8, 46, 11, 2],
      [],
      v.block(
        [8, 52, 11, 2],
        [
          v.variableDeclaration(
            [9, 3, 9, 15],
            v.identifier([9, 9, 9, 10], "x", "x$dxmm13j6jyfs$0"),
            v.numericLiteral([9, 13, 9, 14], 1),
            "const",
          ),
          v.returnStatement(
            [10, 3, 10, 46],
            v.splice([10, 10, 10, 45], "$0splice0"),
          ),
        ],
      ),
    ),
);
export default script;
