import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "1m4wzlyymm6k1:17:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button id=row style=display:flex;gap:8px><span style=font-weight:700></span><span>`);\nexports.default = $splice0 => {\n    const [count, setCount] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$.$$click = () => setCount(count() + 1);\n        (0, web_3.insert)(_el$2, () => count() > 0 ? "\u2611" : "\u2610");\n        (0, web_3.insert)(_el$3, () => "pressed " + count() + " times");\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAgBYA,QAAA;IACR,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAL,IAAA,CAAAM,OAAA,GAIa,MAAMP,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAAS,gBAAA,EAAAL,KAAA,QAEJJ,KAAK,EAAE,GAAG,CAAC,GAAG,GAAG,GAAG,GAAG;QAAAS,gBAAA,EAAAH,KAAA,QAChD,UAAU,GAAGN,KAAK,EAAE,GAAG,QAAQ;QAAA,OAAAE,IAAA;IAAA;AAG5C,CAAC","names":["$splice0","count","setCount","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["components/pressable.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create($module0, [
    { kind: "splice", value: createSignal, bindings: [] },
  ]);
}
describe("screen", () => {
  it("increments the counter", async () => {
    render(await evaluate(() => _jsx(Row, {})));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });
  it("reads a fresh page in each test", async () => {
    render(await evaluate(() => _jsx(Row, {})));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", _jsx(Row, {}));
  });
});
