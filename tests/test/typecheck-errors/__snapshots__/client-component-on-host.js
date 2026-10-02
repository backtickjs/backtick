import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
// A client component is client code, a tag in a script. On the host it isn't
// callable, so TypeScript refuses it as a tag: a client import, and a script
// answering a component alike.
const Badge = cs.create(
  "j2gfou1pgla3:7:14",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.n);\n    return _el$;\n})();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAMiB,MAACA,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAASD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["typecheck-errors/client-component-on-host.test.tsx"]}',
  ["solid-js/web"],
);
// @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
export const forOnHost = _jsx(For, { each: [1, 2], children: (n) => n });
// @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
export const badgeOnHost = _jsx(Badge, { n: 1 });
// In a script, both are what they are on the client.
export const inScript = cs.create(
  "j2gfou1pgla3:16:24",
  {
    params: [
      { kind: "tag", value: For },
      { kind: "tag", value: Badge },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($tag0, $tag1) => (0, web_1.createComponent)($tag0, {\n    each: [1, 2],\n    children: n => (0, web_1.createComponent)($tag1, {\n        n: n\n    })\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAe2B,CAAAA,KAAA,EAAAC,KAAA,KAAAC,yBAAA,EAACF,KAAG;IAACG,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;IAAAC,QAAA,EAAIC,CAAC,IAAAH,yBAAA,EAAMD,KAAK;QAACI,CAAC,EAAEA;KAAC;CAAI,CAAO","names":["$tag0","$tag1","_$createComponent","each","children","n"],"ignoreList":[],"sources":["typecheck-errors/client-component-on-host.test.tsx"]}',
  ["solid-js/web"],
);
