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
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { setAttribute as _$setAttribute } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>select</span><div>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<a>`);\nexport default ($0, $1, $2) => {\n  const selected = $0()(0);\n  const isSelected = $1()(selected[0]);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => selected[1](1);\n    _$insert(_el$3, _$createComponent($2, {\n      each: [0, 1, 2],\n      children: id => (() => {\n        var _el$4 = _tmpl$2();\n        _$insert(_el$4, "row " + id);\n        _$effect(() => _$setAttribute(_el$4, "href", isSelected(id) ? "#open" : "#closed"));\n        return _el$4;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;;;eAaY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,QAAQ,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EACjC,MAAMI,UAAU,GAAGH,EAAA,EAAe,CAACE,QAAQ,CAAC,CAAC,CAAC,CAAC;EAC/C;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEmB,MAAMR,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAAAS,QAAA,CAAAH,KAAA,EAAAI,iBAAA,CAEhCX,EAAG;MAACY,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;MAAAC,QAAA,EAChBC,EAAU;QAAA,IAAAC,KAAA,GAAAC,OAAA;QAAAN,QAAA,CAAAK,KAAA,EACsC,MAAM,GAAGD,EAAE;QAAAG,QAAA,OAAAC,cAAA,CAAAH,KAAA,UAAlDb,UAAU,CAACY,EAAE,CAAC,GAAG,OAAO,GAAG,SAAS;QAAA,OAAAC,KAAA;MAAA;IAC9C;IAAA,OAAAZ,IAAA;EAAA;AAKX,CAAC;AAAAgB,gBAAA","names":["$0","$1","$2","selected","isSelected","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$createComponent","each","children","id","_el$4","_tmpl$2","_$effect","_$setAttribute","_$delegateEvents"],"ignoreList":[],"sources":["unmoved-prop.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 121],
          bindings: [{ name: "delegateEvents", local: "_$delegateEvents" }],
        },
        {
          from: "solid-js/web",
          range: [122, 184],
          bindings: [{ name: "setAttribute", local: "_$setAttribute" }],
        },
        {
          from: "solid-js/web",
          range: [185, 235],
          bindings: [{ name: "effect", local: "_$effect" }],
        },
        {
          from: "solid-js/web",
          range: [236, 286],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [287, 355],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 471,
    },
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
