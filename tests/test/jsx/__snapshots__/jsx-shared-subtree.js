import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3f0us4dfufikl:5:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>hi`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAIkB,MAAAA,MAAA,EAAe","names":["_tmpl$"],"ignoreList":[],"sources":["jsx/jsx-shared-subtree.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "3f0us4dfufikl:13:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAYOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAMD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAA0B","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/jsx-shared-subtree.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const shared = cs.create($module0, []);
// The same script spliced twice is declared once in the bundle, and called
// where each splice stands.
it("jsxSharedSubtree", async (t) => {
  await snapshotCase(
    t,
    "jsxSharedSubtree",
    cs.create($module1, [
      { kind: "splice", value: [shared, shared], bindings: [] },
    ]),
  );
});
