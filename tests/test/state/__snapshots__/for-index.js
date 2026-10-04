import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
const $module0 = {
  id: "1pr4tznq24wkc:16:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>rotate</span><div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $tag1) => {\n    const [names, setNames] = $splice0()(["a", "b", "c"]);\n    const rotate = () => {\n        const held = names();\n        setNames([held[2], held[0], held[1]]);\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = rotate;\n        (0, web_3.insert)(_el$3, (0, web_4.createComponent)($tag1, {\n            get each() {\n                return names();\n            },\n            children: (name, index) => (() => {\n                var _el$4 = _tmpl$2();\n                (0, web_3.insert)(_el$4, () => name + " at " + index());\n                return _el$4;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAeY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAW,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC,CAAC;IAClE,MAAMI,MAAM,GAAGA,GAAA;QACb,MAAMC,IAAI,GAAGH,KAAK,EAAE;QACpBC,QAAQ,CAAC,CAACE,IAAI,CAAC,CAAC,CAAC,EAAEA,IAAI,CAAC,CAAC,CAAC,EAAEA,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC;IACvC,CAAC;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEmBR,MAAM;QAAAS,gBAAA,EAAAH,KAAA,EAAAI,yBAAA,EAElBb,KAAI;YAAA,IAACc,IAAIA;gBAAA,OAAEb,KAAK,EAAE;YAAA;YAAAc,QAAA,EAChBA,CAACC,IAAY,EAAEC,KAAmB;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAP,gBAAA,EAAAM,KAAA,QAC1BF,IAAI,GAAG,MAAM,GAAGC,KAAK,EAAE;gBAAA,OAAAC,KAAA;YAAA;SAC/B;QAAA,OAAAb,IAAA;IAAA;AAKX,CAAC","names":["$splice0","$tag1","names","setNames","rotate","held","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$createComponent","each","children","name","index","_el$4","_tmpl$2"],"ignoreList":[],"sources":["state/for-index.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create($module0, [
    { kind: "splice", value: createSignal, bindings: [] },
    { kind: "tag", value: For },
  ]);
}
describe("local state", () => {
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(_jsx(RotatingRows, {}));
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});
it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", _jsx(RotatingRows, {}));
});
