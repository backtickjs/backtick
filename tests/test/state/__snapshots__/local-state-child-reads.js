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
          "31j2lgl6qv8q6:28:17",
          {
            params: [
              { kind: "splice", value: selected, bindings: [] },
              { kind: "splice", value: id, bindings: [] },
            ],
          },
          '($splice0, $splice1) => "font-size: " + ($splice0()[0]() === $splice1() ? 20 : 16) + "px"',
          '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AA2BoB,wBAAA,aAAa,GAAG,CAAC,UAAS,CAAC,CAAC,CAAC,EAAE,KAAK,UAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,IAAI"}',
        ),
        children: cs.create(
          "31j2lgl6qv8q6:29:7",
          {
            params: [
              { kind: "splice", value: id, bindings: [] },
              { kind: "splice", value: selected, bindings: [] },
            ],
          },
          '($splice0, $splice1) => "row " + $splice0() + " of " + $splice1()[0]()',
          '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AA4BU,wBAAA,MAAM,GAAG,UAAG,GAAG,MAAM,GAAG,UAAS,CAAC,CAAC,CAAC,EAAE"}',
        ),
      }),
      cs.create(
        "31j2lgl6qv8q6:31:5",
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
        "($splice0, $splice1, $splice2) => $splice0()[0]() === $splice1() ? $splice2() : null",
        '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AA8BQ,kCAAA,UAAS,CAAC,CAAC,CAAC,EAAE,KAAK,UAAG,CAAC,CAAC,CAAC,UAAC,CAAwB,CAAC,CAAC,IAAI"}',
      ),
    ],
  });
async function ReadingPanel() {
  return cs.create(
    "31j2lgl6qv8q6:36:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        {
          kind: "splice",
          value: _jsx(ReadingRow, {
            id: cs.create(
              "31j2lgl6qv8q6:41:28",
              { params: [] },
              "() => 0",
              '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAwC+B,MAAA,CAAC"}',
            ),
            selected: cs.create(
              "31j2lgl6qv8q6:41:45",
              {
                params: [{ kind: "capture", key: "selected$31j2lgl6qv8q6$0" }],
              },
              "($capture0) => $capture0",
              '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAwCgD,eAAA,SAAQ"}',
            ),
          }),
          bindings: ["selected$31j2lgl6qv8q6$0"],
        },
        {
          kind: "splice",
          value: _jsx(ReadingRow, {
            id: cs.create(
              "31j2lgl6qv8q6:42:28",
              { params: [] },
              "() => 1",
              '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAyC+B,MAAA,CAAC"}',
            ),
            selected: cs.create(
              "31j2lgl6qv8q6:42:45",
              {
                params: [{ kind: "capture", key: "selected$31j2lgl6qv8q6$0" }],
              },
              "($capture0) => $capture0",
              '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAyCgD,eAAA,SAAQ"}',
            ),
          }),
          bindings: ["selected$31j2lgl6qv8q6$0"],
        },
      ],
    },
    "($splice0, $splice1, $splice2) => {\n    const selected = $splice0()(0);\n    return (<div>\n        <span onclick={() => selected[1](1)}>select</span>\n        {$splice1(selected)}\n        {$splice2(selected)}\n      </div>);\n}",
    '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["state/local-state-child-reads.test.tsx"],"names":[],"mappings":"AAmCY;IACR,MAAM,QAAQ,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAClC,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,IAAI,CACjD;QAAA,CAAC,kBAAsD,CACvD;QAAA,CAAC,kBAAsD,CACzD;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
