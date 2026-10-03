import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
// A host tag is checked as a call, and each of its errors is reported where the
// JSX that made it is written: a prop's under the prop, a missing one and an
// unknown one under the tag, a child's over the children.
const Card = cs.create(
  "3b5sh5ysekaql:7:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.title);\n    return _el$;\n})();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAMgB,MAACA,KAA4C;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QACjDD,KAAK,CAACI,KAAK;IAAA,OAAAH,IAAA;AAAA,IACtB","names":["props","_el$","_tmpl$","_$insert","title"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: Property 'title' is missing.
export const missing = cs.create(
  "3b5sh5ysekaql:12:23",
  { params: [{ kind: "tag", value: Card }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAW0BA,KAAA,IAAAC,yBAAA,EAACD,KAAI,KAAG","names":["$tag0","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrong = cs.create(
  "3b5sh5ysekaql:15:21",
  { params: [{ kind: "tag", value: Card }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    title: 1\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAcwBA,KAAA,IAAAC,yBAAA,EAACD,KAAI;IAACE,KAAK,EAAE;CAAC,CAAI","names":["$tag0","_$createComponent","title"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: Object literal may only specify known properties.
export const unknown = cs.create(
  "3b5sh5ysekaql:18:23",
  { params: [{ kind: "tag", value: Card }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    title: "x",\n    nope: 1\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAiB0BA,KAAA,IAAAC,yBAAA,EAACD,KAAI;IAACE,KAAK;IAAKC,IAAI,EAAE;CAAC,CAAI","names":["$tag0","_$createComponent","title","nope"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: the child reads each item as a string, not a number.
export const wrongChild = cs.create(
  "3b5sh5ysekaql:21:26",
  { params: [{ kind: "tag", value: For }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    each: [1],\n    children: n => n\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAoB6BA,KAAA,IAAAC,yBAAA,EAACD,KAAG;IAACE,IAAI,EAAE,CAAC,CAAC,CAAC;IAAAC,QAAA,EAAIC,CAAS,IAAKA;CAAC,CAAO","names":["$tag0","_$createComponent","each","children","n"],"ignoreList":[],"sources":["typecheck-errors/host-tag-props.test.tsx"]}',
  ["solid-js/web"],
);
