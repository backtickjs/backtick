import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "qxhjl19zgsnv:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0() === $splice1() ? "same" : "different");\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAaY,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAIF,QAAA,EAAM,KAAKC,QAAA,EAAM,GAAG,MAAM,GAAG,WAAW;IAAA,OAAAC,IAAA;AAAA,IAAK","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["state/prop-read-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "qxhjl19zgsnv:17:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1) => {\n    const [count] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => $splice1(count));\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAgBkB,CAAAA,QAAA,EAAAC,QAAA;IAChB,MAAM,CAACC,KAAK,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAChC;QAAA,IAAAG,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAaF,QAAA,CAAAC,KAAA,CAAiD;QAAA,OAAAC,IAAA;IAAA;AAChE,CAAC","names":["$splice0","$splice1","count","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["state/prop-read-twice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["count$qxhjl19zgsnv$0"] },
  ],
  kind: "block",
};
const $module2 = {
  id: "qxhjl19zgsnv:19:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => ({\n    count: $capture0()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBqCA,SAAA,KAAC;IAAEC,KAAK,EAAED,SAAK;CAAI,CAAC","names":["$capture0","count"],"ignoreList":[],"sources":["state/prop-read-twice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "count$qxhjl19zgsnv$0" }],
  kind: "expression",
};
// A prop built from the parent's signal, read twice by the server component
// it's handed to. In Solid, a prop is a getter, so each read runs its
// expression again and builds a new object.
// `react-native-client/prop-read-twice.test.ts` is the same in React, where a
// prop is a value.
async function Compare({ value }) {
  return cs.create($module0, [value, value]);
}
const parent = cs.create($module1, [
  createSignal,
  _jsx(Compare, { value: cs.create($module2, []) }),
]);
it("a prop read twice is evaluated twice", async () => {
  render(await evaluate(() => parent));
  assert.ok(screen.getByText("different"));
});
