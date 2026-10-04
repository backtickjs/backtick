import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "7lcft72v2y3x:10:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>Hi`);\nexports.default = () => {\n    return _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBASY;IACR,OAAAA,MAAA;AAGF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["stdlib/string-from-code-point.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create($module0, []);
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
