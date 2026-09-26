import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A child reading a signal it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the signal never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its signal holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({ id, selected }) =>
  _jsxs("div", {
    children: [
      _jsx("span", {
        style: cs.create(
          "1pnyalh8z32fc:29:13",
          {
            params: [
              { kind: "splice", value: selected, bindings: [] },
              { kind: "splice", value: id, bindings: [] },
            ],
          },
          {
            code: 'export default ($0, $1) => "font-size: " + ($0()[0]() === $1() ? 20 : 16) + "px";',
            map: '{"version":3,"mappings":"eA4BgB,CAAAA,EAAA,EAAAC,EAAA,kBAAa,IAAID,EAAA,EAAS,CAAC,CAAC,CAAC,EAAE,KAAKC,EAAA,EAAG,GAAG,EAAE,GAAG,EAAE,CAAC,GAAG,IAAI","names":["$0","$1"],"ignoreList":[],"sources":["local-state-child-reads.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
        children: cs.create(
          "1pnyalh8z32fc:31:7",
          {
            params: [
              { kind: "splice", value: id, bindings: [] },
              { kind: "splice", value: selected, bindings: [] },
            ],
          },
          {
            code: 'export default ($0, $1) => "row " + $0() + " of " + $1()[0]();',
            map: '{"version":3,"mappings":"eA8BU,CAAAA,EAAA,EAAAC,EAAA,WAAM,GAAGD,EAAA,EAAG,GAAG,MAAM,GAAGC,EAAA,EAAS,CAAC,CAAC,CAAC,EAAE","names":["$0","$1"],"ignoreList":[],"sources":["local-state-child-reads.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
      cs.create(
        "1pnyalh8z32fc:33:5",
        {
          params: [
            { kind: "splice", value: selected, bindings: [] },
            { kind: "splice", value: id, bindings: [] },
            {
              kind: "splice",
              value: _jsx("span", { children: "marker" }),
              bindings: [],
            },
          ],
        },
        {
          code: "export default ($0, $1, $2) => $0()[0]() === $1() ? $2() : null;",
          map: '{"version":3,"mappings":"eAgCQ,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,KAAAF,EAAA,EAAS,CAAC,CAAC,CAAC,EAAE,KAAKC,EAAA,EAAG,GAAGC,EAAA,EAAC,GAA0B,IAAI","names":["$0","$1","$2"],"ignoreList":[],"sources":["local-state-child-reads.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
    ],
  });
async function ReadingPanel() {
  return cs.create(
    "1pnyalh8z32fc:38:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: ReadingRow },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>select`);\nexport default ($0, $1) => {\n  const selected = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _el$2.$$click = () => selected[1](1);\n    _$insert(_el$, _$createComponent($1, {\n      id: 0,\n      selected: selected\n    }), null);\n    _$insert(_el$, _$createComponent($1, {\n      id: 1,\n      selected: selected\n    }), null);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;eAqCY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,QAAQ,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EACjC;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAD,KAAA,CAAAE,OAAA,GAEmB,MAAML,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAAAM,QAAA,CAAAL,IAAA,EAAAM,iBAAA,CAClCR,EAAU;MAACS,EAAE,EAAE,CAAC;MAAER,QAAQ,EAAEA;IAAQ;IAAAM,QAAA,CAAAL,IAAA,EAAAM,iBAAA,CACpCR,EAAU;MAACS,EAAE,EAAE,CAAC;MAAER,QAAQ,EAAEA;IAAQ;IAAA,OAAAC,IAAA;EAAA;AAG3C,CAAC;AAAAQ,gBAAA","names":["$0","$1","selected","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert","_$createComponent","id","_$delegateEvents"],"ignoreList":[],"sources":["local-state-child-reads.test.tsx"]}',
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
          range: [122, 172],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [173, 241],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 301,
    },
  );
}
// What one `ReadingRow` draws, in the three positions it read the signal from: a
// prop, a text child, and a branch.
function readRow(row) {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}
describe("local state", () => {
  it("a child redraws everything it read of a signal it was handed", async () => {
    const view = await drawn(_jsx(ReadingPanel, {}));
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });
});
it("ReadingPanel", async (t) => {
  await snapshotCase(t, "ReadingPanel", _jsx(ReadingPanel, {}));
});
