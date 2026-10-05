import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "jnagv17juckt:11:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "counted";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUY,eAAY","names":[],"ignoreList":[],"sources":["components/component-answers-children.test.tsx"]}',
  dependencies: [],
  params: [],
};
const $module1 = {
  id: "jnagv17juckt:15:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>one`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<em>two`);\nexports.default = () => [_tmpl$(), _tmpl$2()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAcY,OAAAA,MAAA,IAAAC,OAAA,GAKT","names":["_tmpl$","_tmpl$2"],"ignoreList":[],"sources":["components/component-answers-children.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module2 = {
  id: "jnagv17juckt:27:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice1, null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA0BO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAEEF,QAAA;IAAAI,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAEJ","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-answers-children.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// A component stands exactly where its tag did, so what it may answer with is
// what may stand there: one drawing, or nothing at all. Text and a list are
// neither — a component with several children to give, or a bare string, wraps
// them in a fragment, which is the one drawing that holds them and draws no
// node of its own.
async function Label() {
  return cs.create($module0, []);
}
async function Pair() {
  return cs.create($module1, []);
}
it("componentAnswersChildren", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersChildren",
    cs.create($module2, [_jsx(Label, {}), _jsx(Pair, {})]),
  );
});
