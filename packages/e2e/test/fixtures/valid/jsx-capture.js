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
          () => ({
            kind: 220,
            loc: [10, 31, 10, 38],
            parameters: [],
            body: {
              kind: 80,
              loc: [10, 37, 10, 38],
              text: "x",
              bindingKey: "x$dxmm13j6jyfs$0",
            },
          }),
        ),
      }),
    },
    captures: [],
    spliceParams: { $0splice0: ["x$dxmm13j6jyfs$0"] },
  },
  () => ({
    kind: 220,
    loc: [8, 46, 11, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [8, 52, 11, 2],
      statements: [
        {
          kind: 244,
          loc: [9, 3, 9, 15],
          declarationList: {
            kind: 262,
            loc: [9, 3, 9, 14],
            declarations: [
              {
                kind: 261,
                loc: [9, 9, 9, 14],
                name: {
                  kind: 80,
                  loc: [9, 9, 9, 10],
                  text: "x",
                  bindingKey: "x$dxmm13j6jyfs$0",
                },
                initializer: {
                  kind: 9,
                  loc: [9, 13, 9, 14],
                  value: 1,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [10, 3, 10, 46],
          expression: {
            kind: 1000,
            loc: [10, 10, 10, 45],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
export default script;
