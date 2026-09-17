import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";

// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs`{
    const ids = $state<number[]>([1, 2, 3]);
    const swap = () => {
      const held = ids.get();
      ids.set(held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
      ids.set(ids.get().filter((id) => id !== 2));
    };
    return (
      <div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          <For each={ids.get()}>
            {(id: number) => <span>{"row " + id}</span>}
          </For>
        </div>
      </div>
    );
  }`;
}

describe("local state", () => {
  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(<SwappableRows />);
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });

  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(<SwappableRows />);
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });
});

it("SwappableRows", async (t) => {
  await snapshotCase(t, "SwappableRows", <SwappableRows />);
});
