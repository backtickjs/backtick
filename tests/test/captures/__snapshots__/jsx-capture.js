import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  { start: { line: 11, column: 42 }, end: { line: 14, column: 2 } },
  {
    version: "0.0.0",
    filePath: "captures/jsx-capture.test.tsx",
    fileHash: "g38hwxw7rhvi",
    splices: {
      $0splice0: {
        value: _jsx("span", {
          onclick: cs.create(
            { start: { line: 13, column: 27 }, end: { line: 13, column: 38 } },
            {
              version: "0.0.0",
              filePath: "captures/jsx-capture.test.tsx",
              fileHash: "g38hwxw7rhvi",
              splices: {},
              captures: ["x$g38hwxw7rhvi$0"],
            },
            () => ({
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 13, column: 30 },
                end: { line: 13, column: 37 },
              },
              params: [],
              body: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 36 },
                  end: { line: 13, column: 37 },
                },
                name: "x",
                bindingKey: "x$g38hwxw7rhvi$0",
              },
              expression: true,
            }),
          ),
        }),
        params: ["x$g38hwxw7rhvi$0"],
      },
    },
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 45 }, end: { line: 14, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 11, column: 51 }, end: { line: 14, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 12, column: 2 },
            end: { line: 12, column: 14 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 13 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 8 },
                  end: { line: 12, column: 9 },
                },
                name: "x",
                bindingKey: "x$g38hwxw7rhvi$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 13 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 13, column: 2 },
            end: { line: 13, column: 45 },
          },
          argument: {
            type: "Splice",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 44 },
            },
            key: "$0splice0",
          },
        },
      ],
    },
    expression: false,
  }),
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
