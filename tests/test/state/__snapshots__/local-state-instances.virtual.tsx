import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";

// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a signal of its own.
async function OwnCounter() {
  return cs.lift((() => {
    const __cs_size = cs.splice((createSignal))(16);
    return <span style={"font-size: " + __cs_size[0]() + "px"} onclick={() => {
        __cs_size[1](__cs_size[0]() + 1);
    }}>
        press
      </span>;
})());
}

const instances = (
  <div>
    <OwnCounter />
    <OwnCounter />
  </div>
);

describe("local state", () => {
  it("two invocations of one component hold independent signals", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});

it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
