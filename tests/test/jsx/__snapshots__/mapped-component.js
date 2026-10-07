import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "5vl2m1vo5mat:26:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1, $splice2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($For => (0, web_2.createComponent)($For, {\n        get each() {\n            return $splice1();\n        },\n        children: row => $splice2(row)\n    }))($splice0()));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAyBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEC,CAAAG,IAAA,IAAAC,yBAAA,EAACD,IAAI;QAAA,IAACE,IAAIA;YAAA,OAAEP,QAAA,EAAK;QAAA;QAAAQ,QAAA,EACbC,GAAW,IAAKR,QAAA,CAAAQ,GAAA;KAAkC,CAC/C,EAFNV,QAAA,EAAI,CAGP;IAAA,OAAAG,IAAA;AAAA,IACD","names":["$splice0","$splice1","$splice2","_el$","_tmpl$","_$insert","$For","_$createComponent","each","children","row"],"ignoreList":[],"sources":["jsx/mapped-component.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["row$5vl2m1vo5mat$0"] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "5vl2m1vo5mat:29:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $capture0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, "row " + $capture0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA4BiCA,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAO,MAAM,GAAGD,SAAG;IAAA,OAAAC,IAAA;AAAA,IAAQ","names":["$capture0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-component.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "capture", key: "row$5vl2m1vo5mat$0" }],
  kind: "expression",
};
// One element template, expanded once per row on the client: the splice hole
// sits inside a `.map` callback, so it is reached once per iteration and each
// expansion must see its own `row`.
//
// The template is written inside the script because that is what lets `row`
// resolve to the callback's binding — hoisting it out would make `row` a free
// host reference instead of a capture.
//
// Inlining is what keeps the expansions apart today: the splice lands in body
// position, where a tree reference is a plain call and instantiates afresh. If
// it ever arrives as a thunk instead, the reference becomes an `apply` in tree
// position, and those memoize one instance per node — one instance shared by
// every row, each overwriting the last. The three values below are what tells
// the two apart.
const rows = [1, 2, 3];
it("mappedComponent", async (t) => {
  await snapshotCase(
    t,
    "mappedComponent",
    cs.create($module0, [For, rows, cs.create($module1, [])]),
  );
});
