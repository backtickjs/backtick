import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";
const $module0 = {
  id: "617sil125iw3:12:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => n * 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWmB,MAACA,CAAS,IAAKA,CAAC,GAAG,CAAC","names":["n"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "617sil125iw3:13:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => m => n + m;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYgB,MAACA,CAAS,IAAMC,CAAS,IAAKD,CAAC,GAAGC,CAAC","names":["n","m"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module2 = {
  id: "617sil125iw3:16:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<h2>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0().title);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAeYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAKD,QAAA,EAAM,CAACI,KAAK;IAAA,OAAAH,IAAA;AAAA,IAAM","names":["$splice0","_el$","_tmpl$","_$insert","title"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "617sil125iw3:19:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "shared";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBkB,cAAQ","names":[],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module4 = {
  id: "617sil125iw3:21:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section><p></p><p></p><p></p><p></p><ul>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $splice7) => {\n    const [count, setCount] = $splice0()(1);\n    const rows = [1, 2, 3];\n    const total = count() + $splice1(rows);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;\n        (0, web_3.insert)(_el$, () => $splice2(rows), _el$2);\n        (0, web_3.insert)(_el$, () => $splice3(rows), _el$2);\n        (0, web_3.insert)(_el$2, () => $splice4(rows)(count()));\n        (0, web_3.insert)(_el$3, () => $splice5(rows)(1)(2));\n        (0, web_3.insert)(_el$4, () => $splice6(rows));\n        (0, web_3.insert)(_el$5, total);\n        (0, web_3.insert)(_el$6, () => ($For => (0, web_2.createComponent)($For, {\n            each: rows,\n            children: row => (() => {\n                var _el$7 = _tmpl$2();\n                (0, web_3.insert)(_el$7, () => row + count());\n                return _el$7;\n            })()\n        }))($splice7(rows)));\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAoBsB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACpB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGT,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C,MAAMU,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtB,MAAMC,KAAK,GAAGH,KAAK,EAAE,GAAGP,QAAA,CAAAS,IAAA,CAAkB;IAC1C;QAAA,IAAAE,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA,EAAAE,KAAA,GAAAD,KAAA,CAAAD,WAAA,EAAAG,KAAA,GAAAD,KAAA,CAAAF,WAAA;QAAAI,gBAAA,EAAAT,IAAA,QAEKV,QAAA,CAAAQ,IAAA,CAA6B,EAAAI,KAAA;QAAAO,gBAAA,EAAAT,IAAA,QAC7BT,QAAA,CAAAO,IAAA,CAA4B,EAAAI,KAAA;QAAAO,gBAAA,EAAAP,KAAA,QACzBV,QAAA,CAAAM,IAAA,CAAQ,CAACF,KAAK,EAAE,CAAC;QAAAa,gBAAA,EAAAL,KAAA,QACjBX,QAAA,CAAAK,IAAA,CAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAW,gBAAA,EAAAH,KAAA,QACXZ,QAAA,CAAAI,IAAA,CAAO;QAAAW,gBAAA,EAAAF,KAAA,EACPR,KAAK;QAAAU,gBAAA,EAAAD,KAAA,QAEP,CAAAE,IAAA,IAAAC,yBAAA,EAACD,IAAI;YAACE,IAAI,EAAEd,IAAI;YAAAe,QAAA,EAAIC,GAAW;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAP,gBAAA,EAAAM,KAAA,QAAUD,GAAG,GAAGlB,KAAK,EAAE;gBAAA,OAAAmB,KAAA;YAAA;SAAM,CAAQ,EAAnEpB,QAAA,CAAAG,IAAA,CAAI,CACP;QAAA,OAAAE,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","$splice5","$splice6","$splice7","count","setCount","rows","total","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","_el$5","_el$6","_$insert","$For","_$createComponent","each","children","row","_el$7","_tmpl$2"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
    { kind: "splice", bindings: ["rows$617sil125iw3$5"] },
  ],
  kind: "block",
};
const $module5 = {
  id: "617sil125iw3:24:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0.length;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuB+BA,SAAA,IAAAA,SAAI,CAACC,MAAM","names":["$capture0","length"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "rows$617sil125iw3$5" }],
  kind: "expression",
};
const $module6 = {
  id: "617sil125iw3:46:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(1);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6CgBA,QAAA,IAAAA,QAAA,EAAQ,CAAC,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module7 = {
  id: "617sil125iw3:47:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(1)(2) + $splice1().length;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8CgB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAGC,QAAA,EAAO,CAACC,MAAM","names":["$splice0","$splice1","length"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module8 = {
  id: "617sil125iw3:48:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+CgBA,QAAA,IAAAA,QAAA,EAA2B","names":["$splice0"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Scripts are where most of the bundler's
// bookkeeping is — their numbers, the names captures print under, the thunks a
// hole feeds — so this is the bundler's own repeatability test with them in.
const doubled = cs.create($module0, []);
const pair = cs.create($module1, []);
function Card(props) {
  return cs.create($module2, [props]);
}
const shared = cs.create($module3, []);
const page = () =>
  cs.create($module4, [
    createSignal,
    cs.create($module5, []),
    _jsx(Card, { title: "element" }),
    _jsx(Card, { title: shared }),
    doubled,
    pair,
    shared,
    For,
  ]);
const code = async (value) => (await bundle(value)).code;
it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its scripts and components.
  await code(cs.create($module6, [doubled]));
  await code(cs.create($module7, [pair, shared]));
  await code(cs.create($module8, [_jsx(Card, { title: "other" })]));
  assert.equal(await code(page()), first);
});
