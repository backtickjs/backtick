import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn } from "./dom.ts";

// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs.lift((() => {
    const __cs_selected = cs.splice((state) satisfies typeof cs.Spliceable)(0);
    return <div>{cs.lift(<span onclick={cs.lift(() => __cs_selected.set(1))}>select</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift([0, 1, 2])}>{cs.lift((__cs_id: number) => <a href={cs.lift(__cs_selected.get() === __cs_id ? "#open" : "#closed")}>{cs.lift("row " + __cs_id)}</a>)}</For>)}</div>)}</div>;
})());
}

describe("local state", () => {
  // A prop re-runs when something it read was written, which is not the same as
  // holding anything new: a cell a whole list reads decides one row's prop, and
  // every other row recomputes the value it already had. The host hears about
  // the two that moved and nothing else — a write per row per selection is what
  // a list of any size would otherwise cost.
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
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
  });
});

it("SelectableRows", async (t) => {
  await snapshotCase(t, "SelectableRows", <SelectableRows />);
});
