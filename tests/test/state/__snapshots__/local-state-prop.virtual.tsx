import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Signal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";

// A signal crossing a component boundary: declared once by the script that
// draws the pair, handed to each child as a prop, so both read one storage. The
// signal is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }: { size: Client<Signal<number>> }) =>
  cs.lift((() => <span
    style={"font-size: " + cs.splice((size))[0]() + "px"}
    onclick={() => {
      cs.splice((size))[1](cs.splice((size))[0]() + 1);
    }}
  >
    press
  </span>)());

async function SharingPanel() {
  return cs.lift((() => {
    const __cs_size = cs.splice((createSignal))(16);
    return (
      <div>
        {cs.splice((<SharedCounter size={cs.lift((() => __cs_size)())} />))}
        {cs.splice((<SharedCounter size={cs.lift((() => __cs_size)())} />))}
      </div>
    );
  })());
}

describe("local state", () => {
  it("a signal passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(<SharingPanel />);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the signal and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});

it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", <SharingPanel />);
});
