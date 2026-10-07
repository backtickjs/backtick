import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "6co403gp36pa:11:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAUYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAOD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAa","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["state/derived-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "6co403gp36pa:17:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>add`);\nexports.default = ($splice0, $splice1) => {\n    const [count, setCount] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        _el$2.$$click = () => setCount(count() + 1);\n        (0, web_3.insert)(_el$, () => $splice1(count), null);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAgBmB,CAAAA,QAAA,EAAAC,QAAA;IACjB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAD,KAAA,CAAAE,OAAA,GAEqB,MAAML,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAAO,gBAAA,EAAAL,IAAA,QAC3CH,QAAA,CAAAC,KAAA,CAA6C;QAAA,OAAAE,IAAA;IAAA;AAGpD,CAAC","names":["$splice0","$splice1","count","setCount","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert"],"ignoreList":[],"sources":["state/derived-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["count$6co403gp36pa$0"] },
  ],
};
const $module2 = {
  id: "6co403gp36pa:22:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => "Count: " + $capture0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqB0BA,SAAA,aAAS,GAAGA,SAAK,EAAE","names":["$capture0"],"ignoreList":[],"sources":["state/derived-prop.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "count$6co403gp36pa$0" }],
};
// A server component drawing what it's handed.
async function Label({ text }) {
  return cs.create($module0, [text]);
}
// A prop derived from a signal, handed to a server component drawn in the
// script that holds the signal. As in Solid, `"Count: " + count()` is read
// again each time the label is drawn, so it follows the count.
const counter = cs.create($module1, [
  createSignal,
  _jsx(Label, { text: cs.create($module2, []) }),
]);
// `react-native-client/derived-prop.test.ts` is the same in React.
it("a prop derived from a signal follows it", async () => {
  render(await evaluate(() => counter));
  assert.ok(screen.getByText("Count: 0"));
  await userEvent.click(screen.getByText("add"));
  assert.ok(screen.getByText("Count: 1"));
});
