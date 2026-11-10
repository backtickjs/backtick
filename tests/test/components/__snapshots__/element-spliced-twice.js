import { jsx as _jsx } from "@backtickjs/jsx-solid/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "1y0x8hd3gch2e:16:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAeYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAID,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAU","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/element-spliced-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module1 = {
  id: "1y0x8hd3gch2e:20:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice1, null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAmBiB,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAEZF,QAAA;IAAAI,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAEJ","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/element-spliced-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "module",
};
// One element, held in a variable and drawn in two places. As React's server
// renderer does, its component runs once: one object, rendered once, and its
// result referenced in each place. Two elements, <Stamp /> written twice, run
// twice. Drawn by Solid, that result is one node, which moves when it's placed
// again, so it shows once.
let runs = 0;
async function Stamp() {
  runs = runs + 1;
  return cs.create($module0, [runs]);
}
const stamp = _jsx(Stamp, {});
const twice = cs.create($module1, [stamp, stamp]);
it("an element drawn twice runs its component once", async () => {
  runs = 0;
  const { container } = render(await evaluate(() => twice));
  assert.equal(runs, 1);
  assert.equal(container.textContent, "1");
});
