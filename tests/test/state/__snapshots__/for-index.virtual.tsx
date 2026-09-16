import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import type { ReadonlyState } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";

// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.lift((() => {
    const __cs_names = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<string[]>(["a", "b", "c"]));
    const __cs_rotate = cs.const(() => {
        cs.statement(cs.receiver(__cs_names).update(__cs_held => [cs.receiver(__cs_held)[2], cs.receiver(__cs_held)[0], cs.receiver(__cs_held)[1]]));
    });
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(__cs_rotate)}>rotate</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift(cs.receiver(__cs_names).read())}>{cs.lift((__cs_name: string, __cs_index: ReadonlyState<number>) => <span>{cs.lift(__cs_name + " at " + cs.receiver(__cs_index).read())}</span>)}</For>)}</div>)}</div>);
})());
}

describe("local state", () => {
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(<RotatingRows />);
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});

it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", <RotatingRows />);
});
