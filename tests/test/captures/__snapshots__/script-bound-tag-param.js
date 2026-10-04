import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2vonkhcq0yva8:13:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<ul>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($splice0, $splice1) => {\n    const twice = Row => (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => $splice0(Row), null);\n        (0, web_2.insert)(_el$, () => $splice1(Row), null);\n        return _el$;\n    })();\n    return twice(p => (() => {\n        var _el$2 = _tmpl$2();\n        (0, web_2.insert)(_el$2, () => "row " + p.n);\n        return _el$2;\n    })());\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAYO,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,KAAK,GAAIC,GAAsC;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAEhDJ,QAAA,CAAAG,GAAA,CAAoB;QAAAG,gBAAA,EAAAF,IAAA,QACpBH,QAAA,CAAAE,GAAA,CAAoB;QAAA,OAAAC,IAAA;IAAA,IAExB;IACD,OAAOF,KAAK,CAAEK,CAAgB;QAAA,IAAAC,KAAA,GAAAC,OAAA;QAAAH,gBAAA,EAAAE,KAAA,QAAU,MAAM,GAAGD,CAAC,CAACG,CAAC;QAAA,OAAAF,KAAA;IAAA,IAAM,CAAC;AAC7D,CAAC","names":["$splice0","$splice1","twice","Row","_el$","_tmpl$","_$insert","p","_el$2","_tmpl$2","n"],"ignoreList":[],"sources":["captures/script-bound-tag-param.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: ["Row$2vonkhcq0yva8$1"] },
    { kind: "splice", bindings: ["Row$2vonkhcq0yva8$1"] },
  ],
};
const $module1 = {
  id: "2vonkhcq0yva8:16:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $capture0 => (0, web_1.createComponent)($capture0, {\n    n: 1\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAegBA,SAAA,IAAAC,yBAAA,EAACD,SAAG;IAACE,CAAC,EAAE;CAAC,CAAI","names":["$capture0","_$createComponent","n"],"ignoreList":[],"sources":["captures/script-bound-tag-param.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "capture", key: "Row$2vonkhcq0yva8$1" }],
};
const $module2 = {
  id: "2vonkhcq0yva8:17:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $capture0 => (0, web_1.createComponent)($capture0, {\n    n: 2\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAgBgBA,SAAA,IAAAC,yBAAA,EAACD,SAAG;IAACE,CAAC,EAAE;CAAC,CAAI","names":["$capture0","_$createComponent","n"],"ignoreList":[],"sources":["captures/script-bound-tag-param.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "capture", key: "Row$2vonkhcq0yva8$1" }],
};
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.create($module0, [cs.create($module1, []), cs.create($module2, [])]),
  );
});
