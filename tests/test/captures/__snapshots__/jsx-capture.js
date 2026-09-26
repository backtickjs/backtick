import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
            {
              code: "export default ($0) => () => $0;",
              map: '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["jsx-capture.test.tsx"],"names":[],"mappings":"eAY8B,QAAA,GAAG,EAAE,CAAC,EAAC"}',
              imports: [],
              exportAt: 0,
            },
          ),
        }),
        bindings: ["x$g38hwxw7rhvi$0"],
      },
    ],
  },
  {
    code: "export default ($0) => () => {\n    const x = 1;\n    return $0(x);\n};",
    map: '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["jsx-capture.test.tsx"],"names":[],"mappings":"eAU6C,QAAA,GAAG,EAAE;IAChD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,KAAC,CAAmC;AAC7C,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
