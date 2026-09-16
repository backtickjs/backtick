import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  [11, 43, 14, 3],
  {
    version: "0.0.0",
    filePath: "captures/jsx-capture.test.tsx",
    fileHash: "g38hwxw7rhvi",
    splices: {
      $0splice0: {
        value: _jsx("span", {
          onclick: cs.create(
            [13, 28, 13, 39],
            {
              version: "0.0.0",
              filePath: "captures/jsx-capture.test.tsx",
              fileHash: "g38hwxw7rhvi",
              splices: {},
              captures: ["x$g38hwxw7rhvi$0"],
            },
            () => ({
              kind: "=>",
              loc: [13, 31, 13, 38],
              parameters: [],
              body: {
                kind: "id",
                loc: [13, 37, 13, 38],
                text: "x",
                bindingKey: "x$g38hwxw7rhvi$0",
              },
            }),
          ),
        }),
        params: ["x$g38hwxw7rhvi$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 46, 14, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [11, 52, 14, 2],
      statements: [
        {
          kind: "const",
          loc: [12, 3, 12, 15],
          name: {
            kind: "id",
            loc: [12, 9, 12, 10],
            text: "x",
            bindingKey: "x$g38hwxw7rhvi$0",
          },
          initializer: {
            kind: "number",
            loc: [12, 13, 12, 14],
            value: 1,
          },
        },
        {
          kind: "return",
          loc: [13, 3, 13, 46],
          expression: {
            kind: "splice",
            loc: [13, 10, 13, 45],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
