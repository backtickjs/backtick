import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3ouwrs0p0z6cs:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAaYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAOD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAa","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-boundary.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "3ouwrs0p0z6cs:21:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice1, null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAoBO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EACAF,QAAA;IAAAI,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IACG","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-boundary.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<TextLabel />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `TextLabel`.
async function TextLabel(props) {
  const text = props.text;
  return cs.create($module0, [text]);
}
it("componentBoundary", async (t) => {
  await snapshotCase(
    t,
    "componentBoundary",
    cs.create($module1, [
      _jsx(TextLabel, { text: "one" }),
      _jsx(TextLabel, { text: "two" }),
    ]),
  );
});
