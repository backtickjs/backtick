import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.create(
    "rfc8jtzlhm6q:8:9",
    { params: [] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>Hi\uD83D\uDE00`);\nexports.default = () => {\n    return _tmpl$();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;kBAOY;IACR,OAAAA,MAAA;AAKF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["stdlib/string-from-char-code.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
