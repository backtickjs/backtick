import { jsx as _jsx } from "@backtickjs/web-client/jsx-runtime";
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
    fileHash: "1saq0k0s3hlgh",
    splices: {
      $0splice0: {
        value: _jsx("span", {
          onclick: cs.create(
            [11, 28, 11, 39],
            {
              version: "0.0.0",
              filePath: "jsx-capture.tsx",
              fileHash: "1saq0k0s3hlgh",
              splices: {},
              captures: ["x$1saq0k0s3hlgh$0"],
            },
            () => ({
              kind: "=>",
              loc: [11, 31, 11, 38],
              parameters: [],
              body: {
                kind: "id",
                loc: [11, 37, 11, 38],
                text: "x",
                bindingKey: "x$1saq0k0s3hlgh$0",
              },
            }),
          ),
        }),
        params: ["x$1saq0k0s3hlgh$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 46, 12, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [9, 52, 12, 2],
      statements: [
        {
          kind: "const",
          loc: [10, 3, 10, 15],
          name: {
            kind: "id",
            loc: [10, 9, 10, 10],
            text: "x",
            bindingKey: "x$1saq0k0s3hlgh$0",
          },
          initializer: {
            kind: "number",
            loc: [10, 13, 10, 14],
            value: 1,
          },
        },
        {
          kind: "return",
          loc: [11, 3, 11, 46],
          expression: {
            kind: "splice",
            loc: [11, 10, 11, 45],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
export default script;
