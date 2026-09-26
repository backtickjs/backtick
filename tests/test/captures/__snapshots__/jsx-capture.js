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
              code: "export default $0 => () => $0;",
              map: '{"version":3,"mappings":"eAY8BA,EAAA,UAAMA,EAAC","names":["$0"],"ignoreList":[],"sources":["jsx-capture.test.tsx"]}',
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
    code: "export default $0 => () => {\n  const x = 1;\n  return $0(x);\n};",
    map: '{"version":3,"mappings":"eAU6CA,EAAA,UAAK;EAChD,MAAMC,CAAC,GAAG,CAAC;EACX,OAAOD,EAAA,CAAAC,CAAA,CAAC;AACV,CAAC","names":["$0","x"],"ignoreList":[],"sources":["jsx-capture.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
