import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3tch88psikxru:10:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>/at?q=a%20b%2Bc%26d%23%C3%A9&amp;page=2.5 a b+c&amp;d#\u00E9`);\nexports.default = () => {\n    return _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBASY;IACR,OAAAA,MAAA;AAUF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["stdlib/encode-uri-component.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.create($module0, []);
}
it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", _jsx(Encoded, {}));
});
