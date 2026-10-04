import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "4mst6ui5kdcm:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>`);\nexports.default = $splice0 => {\n    const [n, setN] = $splice0()(2);\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, n);\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAaYA,QAAA;IACR,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAClC;QAAA,IAAAG,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAAYF,CAAC;QAAA,OAAAE,IAAA;IAAA;AACf,CAAC","names":["$splice0","n","setN","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-answers-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "4mst6ui5kdcm:24:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAuBOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAMD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAqB","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-answers-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.create($module0, [
    { kind: "splice", value: createSignal, bindings: [] },
  ]);
}
it("componentAnswersScript", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersScript",
    cs.create($module1, [
      { kind: "splice", value: _jsx(Panel, {}), bindings: [] },
    ]),
  );
});
