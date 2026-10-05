import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
const $module0 = {
  id: "e4ehd6s3ebyx:7:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.n);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAMiB,MAACA,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAASD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["typecheck-errors/client-component-on-host.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "e4ehd6s3ebyx:16:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($splice0, $splice1) => ($For => (0, web_1.createComponent)($For, {\n    each: [1, 2],\n    children: n => ($Badge => (0, web_1.createComponent)($Badge, {\n        n: n\n    }))($splice1())\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAe2B,CAAAA,QAAA,EAAAC,QAAA,MAAAC,IAAA,IAAAC,yBAAA,EAACD,IAAI;IAACE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;IAAAC,QAAA,EACzCC,CAAC,IAAK,CAAAC,MAAA,IAAAJ,yBAAA,EAACI,MAAM;QAACD,CAAC,EAAEA;KAAC,CAAI,EAAfL,QAAA,EAAM;CAAS,CACnB,EAFqBD,QAAA,EAAI,CAEzB","names":["$splice0","$splice1","$For","_$createComponent","each","children","n","$Badge"],"ignoreList":[],"sources":["typecheck-errors/client-component-on-host.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// A client component is client code, a tag in a script. On the host it isn't
// callable, so TypeScript refuses it as a tag: a client import, and a script
// answering a component alike.
const Badge = cs.create($module0, []);
// @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
export const forOnHost = _jsx(For, { each: [1, 2], children: (n) => n });
// @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
export const badgeOnHost = _jsx(Badge, { n: 1 });
// In a script, both are what they are on the client.
export const inScript = cs.create($module1, [For, Badge]);
