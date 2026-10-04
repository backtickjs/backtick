import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3l2na8sxw8878:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div style=padding:8px><span style=font-size:12px>hi</span><img src=https://example.com/a.png>`);\nexports.default = () => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n    _el$2.$$click = () => { };\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAQO;IAAA,IAAAA,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAD,KAAA,CAAAE,OAAA,GACsC,QAAO,CAAC;IAAA,OAAAJ,IAAA;AAAA,IAI3C","names":["_el$","_tmpl$","_el$2","firstChild","$$click"],"ignoreList":[],"sources":["components/core-components.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
it("coreComponents", async (t) => {
  await snapshotCase(t, "coreComponents", cs.create($module0, []));
});
