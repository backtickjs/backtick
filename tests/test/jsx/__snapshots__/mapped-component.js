import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
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
    cs.create(
      "vmu74mwm42ey:26:4",
      {
        params: [
          { kind: "tag", value: For },
          { kind: "splice", value: rows, bindings: [] },
          {
            kind: "splice",
            value: cs.create(
              "vmu74mwm42ey:28:28",
              { params: [{ kind: "capture", key: "row$vmu74mwm42ey$0" }] },
              '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $capture0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, "row " + $capture0);\n    return _el$;\n})();\n}',
              '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA2B+BA,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAO,MAAM,GAAGD,SAAG;IAAA,OAAAC,IAAA;AAAA,IAAQ","names":["$capture0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-component.test.tsx"]}',
              ["solid-js/web"],
            ),
            bindings: ["row$vmu74mwm42ey$0"],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($tag0, $splice1, $splice2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, (0, web_3.createComponent)($tag0, {\n        get each() {\n            return $splice1();\n        },\n        children: row => $splice2(row)\n    }));\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAyBO,CAAAA,KAAA,EAAAC,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EACAN,KAAI;QAAA,IAACO,IAAIA;YAAA,OAAEN,QAAA,EAAK;QAAA;QAAAO,QAAA,EACbC,GAAW,IAAKP,QAAA,CAAAO,GAAA;KAAkC;IAAA,OAAAN,IAAA;AAAA,IAElD","names":["$tag0","$splice1","$splice2","_el$","_tmpl$","_$insert","_$createComponent","each","children","row"],"ignoreList":[],"sources":["jsx/mapped-component.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
