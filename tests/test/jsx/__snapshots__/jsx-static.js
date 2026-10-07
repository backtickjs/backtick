import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "28pb8qn8s2tny:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>hi`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAUO,MAAAA,MAAA,EAIF","names":["_tmpl$"],"ignoreList":[],"sources":["jsx/jsx-static.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
  kind: "expression",
};
// A tree with only static props: one script, nothing spliced into it, and the
// nested element written in place.
it("jsxStatic", async (t) => {
  await snapshotCase(t, "jsxStatic", cs.create($module0, []));
});
