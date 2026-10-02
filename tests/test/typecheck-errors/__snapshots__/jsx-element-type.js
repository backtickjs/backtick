import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
// What the JSX namespace admits, and what it refuses, in a script.
//
// `JSX.ElementType` admits any `string`. What that does *not* cost is the whole
// of this fixture: a lowercase name is still looked up in `IntrinsicElements`,
// and props are still checked against the type of the tag rather than against
// what `ElementType` allows. The lines that draw something report nothing; the
// rest are in the snapshot beside this, by message, so a rule that changed
// shows as a message that changed.
// ─── what a target draws ──────────────────────────────────────────────
export const tag = cs.create(
  "1giuj76msk4u3:14:19",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div class=a>`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAasB,MAAAA,MAAA,EAAiB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = cs.create(
  "1giuj76msk4u3:18:26",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<blink>`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAiB6B,MAAAA,MAAA,EAAS","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = cs.create(
  "1giuj76msk4u3:25:25",
  { params: [{ kind: "tag", value: NotATag }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAwB4BA,KAAA,IAAAC,yBAAA,EAACD,KAAO,KAAG","names":["$tag0","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// ─── what arranges rather than draws ──────────────────────────────────
export const shorthand = cs.create(
  "1giuj76msk4u3:28:25",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>a`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBA2B4B,MAAAA,MAAA,EAEzB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
export const list = cs.create(
  "1giuj76msk4u3:32:20",
  { params: [{ kind: "tag", value: For }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<i>`);\nexports.default = $tag0 => (0, web_3.createComponent)($tag0, {\n    each: [],\n    children: n => (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, n);\n        return _el$;\n    })()\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+BuBA,KAAA,IAAAC,yBAAA,EAACD,KAAG;IAACE,IAAI,EAAE,EAAc;IAAAC,QAAA,EAAIC,CAAC;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAASD,CAAC;QAAA,OAAAC,IAAA;IAAA;CAAK,CAAO","names":["$tag0","_$createComponent","each","children","n","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// ─── what the app wrote: a server component, on the host ──────────────
const Panel = async () => null;
export const component = _jsx(Panel, {});
// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HTMLAttributes<HTMLDivElement>'.
export const strayProp = cs.create(
  "1giuj76msk4u3:41:25",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div nosuch=1>`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAwC4B,MAAAA,MAAA,EAAkB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrongType = cs.create(
  "1giuj76msk4u3:45:25",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div class=1>`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBA4C4B,MAAAA,MAAA,EAAiB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// `<>` is the fragment, and `<Fragment>` a tag like any other: here it names
// nothing
// @ts-expect-error: Cannot find name 'Fragment'.
export const named = cs.create(
  "1giuj76msk4u3:50:21",
  { params: [{ kind: "tag", value: Fragment }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAiDwBA,KAAA,IAAAC,yBAAA,EAACD,KAAQ,KAAG","names":["$tag0","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
// ─── children, which are structure ────────────────────────────────────
export const text = cs.create(
  "1giuj76msk4u3:53:20",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>hello`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAoDuB,MAAAA,MAAA,EAAgB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
export const number = cs.create(
  "1giuj76msk4u3:54:22",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>1`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAqDyB,MAAAA,MAAA,EAAc","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
export const nested = cs.create(
  "1giuj76msk4u3:55:22",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>a`);\nexports.default = () => _tmpl$();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;kBAsDyB,MAAAA,MAAA,EAEnB","names":["_tmpl$"],"ignoreList":[],"sources":["typecheck-errors/jsx-element-type.test.tsx"]}',
  ["solid-js/web"],
);
