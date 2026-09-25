import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  "g38hwxw7rhvi:11:42",
  {
    params: [
      {
        kind: "splice",
        value: _jsx("span", {
          onclick: cs.create(
            "g38hwxw7rhvi:13:27",
            { params: [{ kind: "capture", key: "x$g38hwxw7rhvi$0" }] },
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
                key: "x$g38hwxw7rhvi$0",
              },
              expression: true,
            }),
            "export default ($0) => () => $0;",
            '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["jsx-capture.test.tsx"],"names":[],"mappings":"eAY8B,QAAA,GAAG,EAAE,CAAC,EAAC"}',
          ),
        }),
        bindings: ["x$g38hwxw7rhvi$0"],
      },
    ],
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
                key: "x$g38hwxw7rhvi$0",
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
            param: 0,
          },
        },
      ],
    },
    expression: false,
  }),
  "export default ($0) => () => {\n    const x = 1;\n    return $0(x);\n};",
  '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["jsx-capture.test.tsx"],"names":[],"mappings":"eAU6C,QAAA,GAAG,EAAE;IAChD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,KAAC,CAAmC;AAC7C,CAAC"}',
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
