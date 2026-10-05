import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
const $module0 = {
  id: "2fhvbeuunldpw:7:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.title);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAMgB,MAACA,KAA4C;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QACjDD,KAAK,CAACI,KAAK;IAAA,OAAAH,IAAA;AAAA,IACtB","names":["props","_el$","_tmpl$","_$insert","title"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "2fhvbeuunldpw:12:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Card => (0, web_1.createComponent)($Card, {}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAW0BA,QAAA,KAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK,KAAG,EAARD,QAAA,EAAK,CAAG","names":["$splice0","$Card","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module2 = {
  id: "2fhvbeuunldpw:15:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Card => (0, web_1.createComponent)($Card, {\n    title: 1\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAcwBA,QAAA,KAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK;IAACE,KAAK,EAAE;CAAC,CAAI,EAAlBH,QAAA,EAAK,CAAa","names":["$splice0","$Card","_$createComponent","title"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module3 = {
  id: "2fhvbeuunldpw:18:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Card => (0, web_1.createComponent)($Card, {\n    title: "x",\n    nope: 1\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAiB0BA,QAAA,KAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK;IAACE,KAAK;IAAKC,IAAI,EAAE;CAAC,CAAI,EAA3BJ,QAAA,EAAK,CAAsB","names":["$splice0","$Card","_$createComponent","title","nope"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module4 = {
  id: "2fhvbeuunldpw:21:26",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($For => (0, web_1.createComponent)($For, {\n    each: [1],\n    children: n => n\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAoB6BA,QAAA,KAAAC,IAAA,IAAAC,yBAAA,EAACD,IAAI;IAACE,IAAI,EAAE,CAAC,CAAC,CAAC;IAAAC,QAAA,EAAIC,CAAS,IAAKA;CAAC,CAAQ,EAAzCL,QAAA,EAAI,CAAqC","names":["$splice0","$For","_$createComponent","each","children","n"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module5 = {
  id: "2fhvbeuunldpw:24:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Card => (0, web_1.createComponent)($Card, {\n    key: "a",\n    title: "x"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAuBwBA,QAAA,KAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK;IAACE,GAAG;IAAKC,KAAK;CAAA,CAAO,EAA1BJ,QAAA,EAAK,CAAqB","names":["$splice0","$Card","_$createComponent","key","title"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// A host tag is checked as a call, and each of its errors is reported where the
// JSX that made it is written: a prop's under the prop, a missing one and an
// unknown one under the tag, a child's over the children.
const Card = cs.create($module0, []);
// @ts-expect-error: Property 'title' is missing.
export const missing = cs.create($module1, [Card]);
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrong = cs.create($module2, [Card]);
// @ts-expect-error: Object literal may only specify known properties.
export const unknown = cs.create($module3, [Card]);
// @ts-expect-error: the child reads each item as a string, not a number.
export const wrongChild = cs.create($module4, [For]);
// @ts-expect-error: Solid's JSX takes no `key`, so neither does a host tag.
export const keyed = cs.create($module5, [Card]);
