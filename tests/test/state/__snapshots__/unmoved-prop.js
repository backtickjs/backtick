import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSelector, createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn } from "./dom.ts";
// A list whose rows ask a selector whether they are the one selected. A write
// re-runs the `href` of only the two rows whose answer changed — the row
// selected, and the row that no longer is. The third is not asked again, and
// the host hears nothing about it.
async function SelectableRows() {
  return cs.create(
    "22k5zjmfkrtpf:14:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: createSelector, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nconst web_6 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>select</span><div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<a>`);\nexports.default = ($splice0, $splice1, $tag2) => {\n    const selected = $splice0()(0);\n    const isSelected = $splice1()(selected[0]);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => selected[1](1);\n        (0, web_5.insert)(_el$3, (0, web_6.createComponent)($tag2, {\n            each: [0, 1, 2],\n            children: id => (() => {\n                var _el$4 = _tmpl$2();\n                (0, web_5.insert)(_el$4, "row " + id);\n                (0, web_4.effect)(() => (0, web_3.setAttribute)(_el$4, "href", isSelected(id) ? "#open" : "#closed"));\n                return _el$4;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;;kBAaY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,KAAA;IACR,MAAMC,QAAQ,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IACjC,MAAMI,UAAU,GAAGH,QAAA,EAAe,CAACE,QAAQ,CAAC,CAAC,CAAC,CAAC;IAC/C;QAAA,IAAAE,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEmB,MAAMR,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAS,gBAAA,EAAAH,KAAA,EAAAI,yBAAA,EAEhCX,KAAG;YAACY,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;YAAAC,QAAA,EAChBC,EAAU;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAN,gBAAA,EAAAK,KAAA,EACsC,MAAM,GAAGD,EAAE;gBAAAG,gBAAA,QAAAC,sBAAA,EAAAH,KAAA,UAAlDb,UAAU,CAACY,EAAE,CAAC,GAAG,OAAO,GAAG,SAAS;gBAAA,OAAAC,KAAA;YAAA;SAC9C;QAAA,OAAAZ,IAAA;IAAA;AAKX,CAAC","names":["$splice0","$splice1","$tag2","selected","isSelected","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$createComponent","each","children","id","_el$4","_tmpl$2","_$effect","_$setAttribute"],"ignoreList":[],"sources":["state/unmoved-prop.test.tsx"]}',
    ["solid-js/web"],
  );
}
describe("local state", () => {
  // A signal a whole list reads would re-run every row's prop, and Solid writes
  // a single dynamic attribute again even when its value did not change. A
  // selector re-runs only the rows whose answer changed, so the host hears
  // about the two that moved and nothing else — a write per row per selection
  // is what a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const view = await drawn(_jsx(SelectableRows, {}));
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);
    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records = [];
    const watching = new MutationObserver((arrived) =>
      records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = () =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target),
        record.attributeName,
        record.target.getAttribute(record.attributeName),
      ]);
    const href = () =>
      [...list.children].map((row) => row.getAttribute("href"));
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    written();
    await userEvent.click(select);
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row's answer did not change, so it did not run.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
  });
});
it("SelectableRows", async (t) => {
  await snapshotCase(t, "SelectableRows", _jsx(SelectableRows, {}));
});
