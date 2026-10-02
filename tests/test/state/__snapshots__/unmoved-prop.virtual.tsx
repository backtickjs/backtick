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
  return cs.lift((() => {
    const __cs_selected = cs.splice((createSignal))(0);
    const __cs_isSelected = cs.splice((createSelector))(__cs_selected[0]);
    return (<div>{<span onclick={() => __cs_selected[1](1)}>select</span>}{<div>{(void For, cs.splice(For)({ each: [0, 1, 2], children: (__cs_id: number) => (<a href={__cs_isSelected(__cs_id) ? "#open" : "#closed"}>{"row " + __cs_id}</a>) }))}</div>}</div>);
})());
}

describe("local state", () => {
  // A signal a whole list reads would re-run every row's prop, and Solid writes
  // a single dynamic attribute again even when its value did not change. A
  // selector re-runs only the rows whose answer changed, so the host hears
  // about the two that moved and nothing else — a write per row per selection
  // is what a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const view = await drawn(<SelectableRows />);
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);

    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records: MutationRecord[] = [];
    const watching = new MutationObserver((arrived) =>
      records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = (): unknown[][] =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target as Element),
        record.attributeName,
        (record.target as Element).getAttribute(record.attributeName!),
      ]);

    const href = (): unknown[] =>
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
  await snapshotCase(t, "SelectableRows", <SelectableRows />);
});
