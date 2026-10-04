import { cs } from "@backtickjs/core";
const $module0 = {
  id: "2exh6id0qbirq:8:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAOYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAKD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAY","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "2exh6id0qbirq:12:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<h1>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAWYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAKD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAW","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module2 = {
  id: "2exh6id0qbirq:16:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<hr>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAeY,MAAAA,MAAA,EAAM","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module3 = {
  id: "2exh6id0qbirq:20:26",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    label: "a"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAmB6BA,KAAA,IAAAC,yBAAA,EAACD,KAAI;IAACE,KAAK;CAAA,CAAO","names":["$tag0","_$createComponent","label"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "tag" }],
};
const $module4 = {
  id: "2exh6id0qbirq:23:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    text: "Week"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAsByBA,KAAA,IAAAC,yBAAA,EAACD,KAAM;IAACE,IAAI;CAAA,CAAU","names":["$tag0","_$createComponent","text"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "tag" }],
};
const $module5 = {
  id: "2exh6id0qbirq:26:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAyB0BA,KAAA,IAAAC,yBAAA,EAACD,KAAK,KAAG","names":["$tag0","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "tag" }],
};
// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
// A host function isn't `Spliceable`, which is what the tag is checked as.
async function Row({ label }) {
  return cs.create($module0, [label]);
}
function Title({ text }) {
  return cs.create($module1, [text]);
}
function Rule() {
  return cs.create($module2, []);
}
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const clientOnly = cs.create($module3, [Row]);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const hybrid = cs.create($module4, [Title]);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const noProps = cs.create($module5, [Rule]);
