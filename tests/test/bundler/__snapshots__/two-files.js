import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { Badge } from "./parts/badge.tsx";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "fb5gdg5h2ujo:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>in `);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n    (0, web_2.insert)(_el$, $splice0, null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAWOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,gBAAA,EAAAJ,IAAA,EAEAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IACC","names":["$splice0","_el$","_tmpl$","_el$2","firstChild","_$insert"],"ignoreList":[],"sources":["bundler/two-files.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// Scripts written in two host files, in one bundle: its map leads into each
// file by its own path.
it("twoFiles", async (t) => {
  await snapshotCase(t, "twoFiles", cs.create($module0, [_jsx(Badge, {})]));
});
