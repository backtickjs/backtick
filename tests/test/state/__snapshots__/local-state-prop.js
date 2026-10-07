import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
const $module0 = {
  id: "1t9uf2rmx1hr4:16:2",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>press`);\nexports.default = ($splice0, $splice1, $splice2) => (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => {\n        $splice1()[1]($splice2()[0]() + 1);\n    };\n    (0, web_4.effect)(_$p => (0, web_3.style)(_el$, "font-size: " + $splice0()[0]() + "px", _$p));\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAeK,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAGU;QACPJ,QAAA,EAAK,CAAC,CAAC,CAAC,CAACC,QAAA,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAC1B,CAAC;IAAAI,gBAAA,EAAAC,GAAA,IAAAC,eAAA,EAAAL,IAAA,EAHM,aAAa,GAAGH,QAAA,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,EAAAO,GAAA;IAAA,OAAAJ,IAAA;AAAA,IAO3C","names":["$splice0","$splice1","$splice2","_el$","_tmpl$","$$click","_$effect","_$p","_$style"],"ignoreList":[],"sources":["state/local-state-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "1t9uf2rmx1hr4:28:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1, $splice2) => {\n    const size = $splice0()(16);\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => $splice1(size), null);\n        (0, web_2.insert)(_el$, () => $splice2(size), null);\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA2BY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAMC,IAAI,GAAGH,QAAA,EAAa,CAAC,EAAE,CAAC;IAC9B;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAEKH,QAAA,CAAAE,IAAA,CAAsC;QAAAG,gBAAA,EAAAF,IAAA,QACtCF,QAAA,CAAAC,IAAA,CAAsC;QAAA,OAAAC,IAAA;IAAA;AAG7C,CAAC","names":["$splice0","$splice1","$splice2","size","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["state/local-state-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: ["size$1t9uf2rmx1hr4$0"] },
    { kind: "splice", bindings: ["size$1t9uf2rmx1hr4$0"] },
  ],
  kind: "block",
};
const $module2 = {
  id: "1t9uf2rmx1hr4:32:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+BoCA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["state/local-state-prop.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "size$1t9uf2rmx1hr4$0" }],
  kind: "expression",
};
const $module3 = {
  id: "1t9uf2rmx1hr4:33:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgCoCA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["state/local-state-prop.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "size$1t9uf2rmx1hr4$0" }],
  kind: "expression",
};
// A signal crossing a component boundary: declared once by the script that
// draws the pair, handed to each child as a prop, so both read one storage. The
// signal is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }) =>
  cs.create($module0, [size, size, size]);
async function SharingPanel() {
  return cs.create($module1, [
    createSignal,
    _jsx(SharedCounter, { size: cs.create($module2, []) }),
    _jsx(SharedCounter, { size: cs.create($module3, []) }),
  ]);
}
describe("local state", () => {
  it("a signal passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(_jsx(SharingPanel, {}));
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the signal and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});
it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", _jsx(SharingPanel, {}));
});
