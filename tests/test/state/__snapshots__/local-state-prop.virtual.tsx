import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";

// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }: { size: Client<State<number>> }) => (
  <span
    style={cs.lift(cs.const("font-size: " + cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).get() + "px"))}
    onclick={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).set(cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).get() + 1));
}))}
  >
    press
  </span>
);

async function SharingPanel() {
  return cs.lift((() => {
    const __cs_size = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(16));
    return cs.const(<div>{cs.lift(<SharedCounter size={cs.lift(__cs_size)}/>)}{cs.lift(<SharedCounter size={cs.lift(__cs_size)}/>)}</div>);
})());
}

describe("local state", () => {
  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(<SharingPanel />);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});

it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", <SharingPanel />);
});
