import { cs } from "@backtickjs/core";
// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
// A host function isn't `Spliceable`, which is what the tag is checked as.
async function Row({ label }) {
  return cs.create(
    "2vpefhygm6190:8:9",
    { params: [{ kind: "splice", value: label, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAOYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAKD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAY","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
    ["solid-js/web"],
  );
}
function Title({ text }) {
  return cs.create(
    "2vpefhygm6190:12:9",
    { params: [{ kind: "splice", value: text, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<h1>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAWYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAKD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAW","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
    ["solid-js/web"],
  );
}
function Rule() {
  return cs.create(
    "2vpefhygm6190:16:9",
    { params: [] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<hr>`);\nexports.default = () => _tmpl$();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;kBAeY,MAAAA,MAAA,EAAM","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
    ["solid-js/web"],
  );
}
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const clientOnly = cs.create(
  "2vpefhygm6190:20:26",
  { params: [{ kind: "tag", value: Row }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    label: "a"\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAmB6BA,KAAA,IAAAC,yBAAA,EAACD,KAAG;IAACE,KAAK;CAAA,CAAO","names":["$tag0","_$createComponent","label"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const hybrid = cs.create(
  "2vpefhygm6190:23:22",
  { params: [{ kind: "tag", value: Title }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    text: "Week"\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAsByBA,KAAA,IAAAC,yBAAA,EAACD,KAAK;IAACE,IAAI;CAAA,CAAU","names":["$tag0","_$createComponent","text"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const noProps = cs.create(
  "2vpefhygm6190:26:23",
  { params: [{ kind: "tag", value: Rule }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAyB0BA,KAAA,IAAAC,yBAAA,EAACD,KAAI,KAAG","names":["$tag0","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/server-component-in-script.test.tsx"]}',
  ["solid-js/web"],
);
