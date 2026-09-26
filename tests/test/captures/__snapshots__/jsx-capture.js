import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  "2ztxkt2oy5dex:11:42",
  {
    params: [
      {
        kind: "splice",
        value: _jsx("span", {
          onclick: cs.create(
            "2ztxkt2oy5dex:13:27",
            { params: [{ kind: "capture", key: "x$2ztxkt2oy5dex$0" }] },
            "($capture0) => () => $capture0",
            '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["captures/jsx-capture.test.tsx"],"names":[],"mappings":"AAY8B,eAAA,GAAG,EAAE,CAAC,SAAC"}',
          ),
        }),
        bindings: ["x$2ztxkt2oy5dex$0"],
      },
    ],
  },
  "($splice0) => () => {\n    const x = 1;\n    return $splice0(x);\n}",
  '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["captures/jsx-capture.test.tsx"],"names":[],"mappings":"AAU6C,cAAA,GAAG,EAAE;IAChD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,WAAC,CAAmC;AAC7C,CAAC"}',
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
