import { cs } from "@backtickjs/core";
const $module0 = {
  id: "83k1lytjebk3:5:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = $splice0 => {\n    const Badge = p => (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => "n " + p.n);\n        return _el$;\n    })();\n    return $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAIkBA,QAAA;IAChB,MAAMC,KAAK,GAAIC,CAAgB;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAS,IAAI,GAAGD,CAAC,CAACI,CAAC;QAAA,OAAAH,IAAA;IAAA,IAAK;IACvD,OAAOH,QAAA,EAIJ;AACL,CAAC","names":["$splice0","Badge","p","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["typecheck-errors/script-bound-tag-shadowed.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "83k1lytjebk3:7:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const Badge = 5;\n    return $splice0(Badge);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMcA,QAAA;IACV,MAAMC,KAAK,GAAG,CAAC;IAEf,OAAOD,QAAA,CAAAC,KAAA,CAAsB;AAC/B,CAAC","names":["$splice0","Badge"],"ignoreList":[],"sources":["typecheck-errors/script-bound-tag-shadowed.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["Badge$83k1lytjebk3$2"] }],
};
const $module2 = {
  id: "83k1lytjebk3:10:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $capture0 => (0, web_1.createComponent)($capture0, {\n    n: 1\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBASgBA,SAAA,IAAAC,yBAAA,EAACD,SAAK;IAACE,CAAC,EAAE;CAAC,CAAI","names":["$capture0","_$createComponent","n"],"ignoreList":[],"sources":["typecheck-errors/script-bound-tag-shadowed.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "capture", key: "Badge$83k1lytjebk3$2" }],
};
// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.create($module0, [
  cs.create($module1, [cs.create($module2, [])]),
]);
