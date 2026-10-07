import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2o7316orwoyih:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAaYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAID,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAU","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/element-spliced-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2o7316orwoyih:18:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice0, null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAiBiBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAEZD,QAAA;IAAAG,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAEJ","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/element-spliced-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// One element, held in a variable and drawn in two places. As React renders
// an element each place it stands, its component runs once per place, and
// each place draws what its own run returned.
let runs = 0;
async function Stamp() {
  runs = runs + 1;
  return cs.create($module0, [runs]);
}
const stamp = _jsx(Stamp, {});
const twice = cs.create($module1, [stamp]);
// A known bug: the bundler caches each element's expansion, so the component
// runs once and both places draw its one result. A todo until it's fixed,
// when the runner reports it passing.
it(
  "an element drawn twice runs its component twice",
  { todo: "runs once, both places drawing its result" },
  async () => {
    runs = 0;
    const { container } = render(await evaluate(() => twice));
    assert.equal(runs, 2);
    assert.equal(container.textContent, "12");
  },
);
