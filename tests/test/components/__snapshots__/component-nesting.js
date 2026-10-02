import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Invocations nest, and each one is an instance. `Outer` renders `Inner`, which
// renders the `Text`, so there are three entries — and `Outer`'s content is a
// reference to `Inner`'s rather than an element of its own.
//
// A flag on the resolved element couldn't express this: the outer mark would
// overwrite the inner one and both invocations would collapse into a single
// entry, sharing one instance and therefore one lifetime for any state they
// declared.
async function Inner() {
  return cs.create(
    "2l5eb0u3jx2g5:14:9",
    { params: [] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>x`);\nexports.default = () => _tmpl$();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;kBAaY,MAAAA,MAAA,EAAc","names":["_tmpl$"],"ignoreList":[],"sources":["components/component-nesting.test.tsx"]}',
    ["solid-js/web"],
  );
}
async function Outer() {
  return _jsx(Inner, {});
}
it("componentNesting", async (t) => {
  await snapshotCase(
    t,
    "componentNesting",
    cs.create(
      "2l5eb0u3jx2g5:22:44",
      { params: [{ kind: "splice", value: _jsx(Outer, {}), bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAqB+CA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAMD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAqB","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-nesting.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
