import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs } from "@backtickjs/core";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  [9, 43, 12, 3],
  {
    version: "0.0.0",
    filePath: "jsx-capture.tsx",
    fileHash: "1u36t3611yobt",
    kind: "value",
    splices: {
      $0splice0: _jsx("span", {
        onclick: cs.create(
          [11, 28, 11, 39],
          {
            version: "0.0.0",
            filePath: "jsx-capture.tsx",
            fileHash: "1u36t3611yobt",
            kind: "value",
            splices: {},
            captures: ["x$1u36t3611yobt$0"],
            spliceParams: {},
          },
          () => ({
            kind: 220,
            loc: [11, 31, 11, 38],
            parameters: [],
            body: {
              kind: 80,
              loc: [11, 37, 11, 38],
              text: "x",
              bindingKey: "x$1u36t3611yobt$0",
            },
          }),
        ),
      }),
    },
    captures: [],
    spliceParams: { $0splice0: ["x$1u36t3611yobt$0"] },
  },
  () => ({
    kind: 220,
    loc: [9, 46, 12, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [9, 52, 12, 2],
      statements: [
        {
          kind: 244,
          loc: [10, 3, 10, 15],
          declarationList: {
            kind: 262,
            loc: [10, 3, 10, 14],
            declarations: [
              {
                kind: 261,
                loc: [10, 9, 10, 14],
                name: {
                  kind: 80,
                  loc: [10, 9, 10, 10],
                  text: "x",
                  bindingKey: "x$1u36t3611yobt$0",
                },
                initializer: {
                  kind: 9,
                  loc: [10, 13, 10, 14],
                  value: 1,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [11, 3, 11, 46],
          expression: {
            kind: 1000,
            loc: [11, 10, 11, 45],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
export default script;
