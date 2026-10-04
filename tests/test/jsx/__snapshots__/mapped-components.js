import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3muqirg3sfmdb:8:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAOYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAOD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAc","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-components.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "3muqirg3sfmdb:19:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAkBOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAMD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAA6D","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-components.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const componentLabels = ["alpha", "beta", "gamma"];
async function Row({ label }) {
  return cs.create($module0, [{ kind: "splice", value: label, bindings: [] }]);
}
// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mappedElements`, where the key sits inside an inlined element instead.
it("mappedComponents", async (t) => {
  await snapshotCase(
    t,
    "mappedComponents",
    cs.create($module1, [
      {
        kind: "splice",
        value: componentLabels.map((item) => _jsx(Row, { label: item })),
        bindings: [],
      },
    ]),
  );
});
