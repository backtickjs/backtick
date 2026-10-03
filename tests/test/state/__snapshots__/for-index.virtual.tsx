import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
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
    const [__cs_names, __cs_setNames] = cs.splice((createSignal))<string[]>(["a", "b", "c"]);
    const __cs_rotate = () => {
      const __cs_held = __cs_names();
      __cs_setNames([__cs_held[2], __cs_held[0], __cs_held[1]]);
    };
    return (
      <div>
        <span onclick={__cs_rotate}>rotate</span>
        <div>
          {(void For, cs.splice(For)({ each: __cs_names(), children: (__cs_name: string, __cs_index: () => number) => (
              <span>{__cs_name + " at " + __cs_index()}</span>
            ) }))}
        </div>
      </div>
    );
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
