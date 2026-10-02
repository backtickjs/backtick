import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tree with only static props: one script, nothing spliced into it, and the
// nested element written in place.
it("jsxStatic", async (t) => {
  await snapshotCase(
    t,
    "jsxStatic",
    cs.create(
      "3x1f5ri4d7p5:11:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>hi`);\nexports.default = () => _tmpl$();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;kBAUO,MAAAA,MAAA,EAEG","names":["_tmpl$"],"ignoreList":[],"sources":["jsx/jsx-static.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
