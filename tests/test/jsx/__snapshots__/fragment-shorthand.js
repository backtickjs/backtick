import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "5ovmh9gpjyzk:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>a`), _tmpl$3 = /*#__PURE__*/ (0, web_1.template)(`<span>b`);\nexports.default = () => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, [_tmpl$2(), _tmpl$3()]);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAWO;IAAA,IAAAA,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,GAAAG,OAAA,IAAAC,OAAA;IAAA,OAAAJ,IAAA;AAAA,IASF","names":["_el$","_tmpl$","_$insert","_tmpl$2","_tmpl$3"],"ignoreList":[],"sources":["jsx/fragment-shorthand.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
// `<>…</>` in a script is Solid's fragment: its children where it stands, and no
// node of its own. Solid takes one only at the top of an expression, so a child
// that is one is written in braces.
it("fragmentShorthand", async (t) => {
  await snapshotCase(t, "fragmentShorthand", cs.create($module0, []));
});
