import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "o3pj0r23dyym:13:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = $splice0 => () => {\n    const [count, setCount] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => setCount(count() + 1);\n        (0, web_3.insert)(_el$, () => "child " + count());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAYyBA,QAAA;IACvB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C;QAAA,IAAAG,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMH,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAAK,gBAAA,EAAAH,IAAA,QAAG,QAAQ,GAAGF,KAAK,EAAE;QAAA,OAAAE,IAAA;IAAA;AAErE,CAAC","names":["$splice0","count","setCount","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/section-state.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "o3pj0r23dyym:21:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section><h2>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n    (0, web_3.insert)(_el$2, $splice0);\n    (0, web_3.insert)(_el$, () => ($CounterButton => (0, web_2.createComponent)($CounterButton, {}))($splice1()), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAoBY,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,gBAAA,EAAAF,KAAA,EAEDJ,QAAA;IAAAM,gBAAA,EAAAJ,IAAA,QACL,CAAAK,cAAA,IAAAC,yBAAA,EAACD,cAAc,KAAG,EAAjBN,QAAA,EAAc,CACjB;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","$splice1","_el$","_tmpl$","_el$2","firstChild","_$insert","$CounterButton","_$createComponent"],"ignoreList":[],"sources":["state/section-state.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
const $module2 = {
  id: "o3pj0r23dyym:29:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>`);\nexports.default = ($splice0, $splice1) => {\n    const [count, setCount] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        _el$2.$$click = () => setCount(count() + 1);\n        (0, web_3.insert)(_el$2, () => "parent " + count());\n        (0, web_3.insert)(_el$, () => $splice1(count), null);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA4BkB,CAAAA,QAAA,EAAAC,QAAA;IAChB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAD,KAAA,CAAAE,OAAA,GAEqB,MAAML,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAAO,gBAAA,EAAAH,KAAA,QACzC,SAAS,GAAGJ,KAAK,EAAE;QAAAO,gBAAA,EAAAL,IAAA,QAErBH,QAAA,CAAAC,KAAA,CAAiD;QAAA,OAAAE,IAAA;IAAA;AAGxD,CAAC","names":["$splice0","$splice1","count","setCount","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert"],"ignoreList":[],"sources":["state/section-state.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["count$o3pj0r23dyym$2"] },
  ],
};
const $module3 = {
  id: "o3pj0r23dyym:36:26",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => "Section " + $capture0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmC6BA,SAAA,cAAU,GAAGA,SAAK,EAAE","names":["$capture0"],"ignoreList":[],"sources":["state/section-state.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "count$o3pj0r23dyym$2" }],
};
// A server component handed its parent's state, drawing a client component
// with state of its own: the title follows the parent, and the child keeps
// its count. `react-native-client/section-state.test.ts` is the same in
// React.
const CounterButton = cs.create($module0, [createSignal]);
async function Section({ title }) {
  return cs.create($module1, [title, CounterButton]);
}
const parent = cs.create($module2, [
  createSignal,
  _jsx(Section, { title: cs.create($module3, []) }),
]);
it("a server component's client child keeps its state", async () => {
  render(await evaluate(() => parent));
  await userEvent.click(screen.getByText("child 0"));
  await userEvent.click(screen.getByText("parent 0"));
  assert.ok(screen.getByText("parent 1"));
  assert.ok(screen.getByText("Section 1"));
  assert.ok(screen.getByText("child 1"));
});
