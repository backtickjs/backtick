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
      code: 'export default ($0, $1, $2) => {\n    const selected = $0()(0);\n    const isSelected = $1()(selected[0]);\n    return (<div>\n        <span onclick={() => selected[1](1)}>select</span>\n        <div>\n          <$2 each={[0, 1, 2]}>\n            {(id) => (<a href={isSelected(id) ? "#open" : "#closed"}>{"row " + id}</a>)}\n          </$2>\n        </div>\n      </div>);\n};',
      map: '{"version":3,"file":"unmoved-prop.test.jsx","sourceRoot":"","sources":["state/unmoved-prop.test.tsx"],"names":[],"mappings":"eAaY;IACR,MAAM,QAAQ,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAClC,MAAM,UAAU,GAAG,IAAe,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC;IAChD,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,IAAI,CACjD;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CACnB;YAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CACf,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,EAAE,CAAC,CAAC,CACjE,CACH;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
