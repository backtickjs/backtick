import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";

// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its cell holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({
  id,
  selected,
}: {
  id: Client<number>;
  selected: Client<State<number>>;
}) => (
  <div>
    <span
      style={cs.lift(cs.const("font-size: " + (cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read() === cs.splice((id)) satisfies typeof cs.ClientUnknown ? 20 : 16) + "px"))}
    >
      {cs.lift(cs.const("row " + (cs.splice((id)) satisfies typeof cs.ClientUnknown) + " of " + cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read()))}
    </span>
    {cs.lift(cs.const(cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read() === cs.splice((id)) satisfies typeof cs.ClientUnknown ? cs.splice((<span>marker</span>)) satisfies typeof cs.ClientUnknown : null))}
  </div>
);

async function ReadingPanel() {
  return cs.lift((() => {
    const __cs_selected = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(() => cs.receiver(__cs_selected).write(1))}>select</span>)}{cs.lift(<ReadingRow id={cs.lift(0)} selected={cs.lift(__cs_selected)}/>)}{cs.lift(<ReadingRow id={cs.lift(1)} selected={cs.lift(__cs_selected)}/>)}</div>);
})());
}

// What one `ReadingRow` draws, in the three positions it read the cell from: a
// prop, a text child, and a branch.
function readRow(row: Element): {
  size: unknown;
  text: unknown;
  marked: boolean;
} {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}

describe("local state", () => {
  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await drawn(<ReadingPanel />);
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
  await snapshotCase(t, "ReadingPanel", <ReadingPanel />);
});
