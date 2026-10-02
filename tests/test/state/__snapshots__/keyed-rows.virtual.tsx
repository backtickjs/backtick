import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";

// A keyed list driven by a signal. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.lift(((__cs_For = cs.splice(For)) => {
    const __cs_ids = cs.splice((createSignal))<number[]>([1, 2, 3]);
    const __cs_swap = () => {
        const __cs_held = __cs_ids[0]();
        __cs_ids[1](__cs_held.with(0, __cs_held[2]).with(2, __cs_held[0]));
    };
    const __cs_drop = () => {
        __cs_ids[1](__cs_ids[0]().filter(__cs_id => __cs_id !== 2));
    };
    return (<div>{<span onclick={__cs_swap}>swap</span>}{<span onclick={__cs_drop}>drop</span>}{<div>{<__cs_For each={__cs_ids[0]()}>{(__cs_id: number) => <span>{"row " + __cs_id}</span>}</__cs_For>}</div>}</div>);
})());
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
