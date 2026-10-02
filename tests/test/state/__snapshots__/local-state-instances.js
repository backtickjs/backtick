import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// State belongs to the script that declares it, and a declared script is called
// once per place that reaches it — so two `<OwnCounter />` splices are two calls
// of one script, and each declares a signal of its own.
async function OwnCounter() {
  return cs.create(
    "3i5bqg6nv7j1v:13:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>press`);\nexports.default = $splice0 => {\n    const size = $splice0()(16);\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => {\n            size[1](size[0]() + 1);\n        };\n        (0, web_4.effect)(_$p => (0, web_3.style)(_el$, "font-size: " + size[0]() + "px", _$p));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAYYA,QAAA;IACR,MAAMC,IAAI,GAAGD,QAAA,EAAa,CAAC,EAAE,CAAC;IAC9B;QAAA,IAAAE,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAGa;YACPH,IAAI,CAAC,CAAC,CAAC,CAACA,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACxB,CAAC;QAAAI,gBAAA,EAAAC,GAAA,IAAAC,eAAA,EAAAL,IAAA,EAHM,aAAa,GAAGD,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,EAAAK,GAAA;QAAA,OAAAJ,IAAA;IAAA;AAQ7C,CAAC","names":["$splice0","size","_el$","_tmpl$","$$click","_$effect","_$p","_$style"],"ignoreList":[],"sources":["state/local-state-instances.test.tsx"]}',
    ["solid-js/web"],
  );
}
const instances = cs.create(
  "3i5bqg6nv7j1v:28:18",
  {
    params: [
      { kind: "splice", value: _jsx(OwnCounter, {}), bindings: [] },
      { kind: "splice", value: _jsx(OwnCounter, {}), bindings: [] },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice1, null);\n    return _el$;\n})();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA2BqB,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAClBF,QAAA;IAAAI,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IACG","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["state/local-state-instances.test.tsx"]}',
  ["solid-js/web"],
);
describe("local state", () => {
  it("two invocations of one component hold independent signals", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});
it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
