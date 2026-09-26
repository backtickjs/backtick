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
          '($0, $1) => "font-size: " + ($0()[0]() === $1() ? 20 : 16) + "px"',
          '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AA4BgB,YAAA,aAAa,GAAG,CAAC,IAAS,CAAC,CAAC,CAAC,EAAE,KAAK,IAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,IAAI"}',
        ),
        children: cs.create(
          "1pnyalh8z32fc:31:7",
          {
            params: [
              { kind: "splice", value: id, bindings: [] },
              { kind: "splice", value: selected, bindings: [] },
            ],
          },
          '($0, $1) => "row " + $0() + " of " + $1()[0]()',
          '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AA8BU,YAAA,MAAM,GAAG,IAAG,GAAG,MAAM,GAAG,IAAS,CAAC,CAAC,CAAC,EAAE"}',
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
        "($0, $1, $2) => $0()[0]() === $1() ? $2() : null",
        '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAgCQ,gBAAA,IAAS,CAAC,CAAC,CAAC,EAAE,KAAK,IAAG,CAAC,CAAC,CAAC,IAAC,CAAwB,CAAC,CAAC,IAAI"}',
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
    "($0, $1) => {\n    const selected = $0()(0);\n    return (<div>\n        <span onclick={() => selected[1](1)}>select</span>\n        <$1 id={0} selected={selected}/>\n        <$1 id={1} selected={selected}/>\n      </div>);\n}",
    '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAqCY;IACR,MAAM,QAAQ,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAClC,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,IAAI,CACjD;QAAA,CAAC,EAAU,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,QAAQ,CAAC,EACtC;QAAA,CAAC,EAAU,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,QAAQ,CAAC,EACxC;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
