import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  "1byndzbo89yv8:11:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>a sentence across lines`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span> `);\nexports.default = () => name => [_tmpl$(), (() => {\n        var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;\n        (0, web_2.insert)(_el$2, name, _el$3);\n        (0, web_2.insert)(_el$2, name, null);\n        return _el$2;\n    })()];\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAUkB,MAACA,IAAY,KAAAC,MAAA;QAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAJ,KAAA,EAIxBF,IAAI,EAAAI,KAAA;QAAAE,gBAAA,EAAAJ,KAAA,EAAGF,IAAI;QAAA,OAAAE,KAAA;IAAA,KAGjB","names":["name","_tmpl$","_el$2","_tmpl$2","_el$3","firstChild","_$insert"],"ignoreList":[],"sources":["jsx/script-fragment.test.tsx"]}',
  ["solid-js/web"],
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    cs.create(
      "1byndzbo89yv8:21:42",
      { params: [{ kind: "splice", value: listed, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0()("x"));\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAoB6CA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAMD,QAAA,EAAO,CAAC,GAAG,CAAC;IAAA,OAAAC,IAAA;AAAA,IAAO","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/script-fragment.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
