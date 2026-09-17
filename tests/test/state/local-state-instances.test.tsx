import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";

// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function OwnCounter() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.get() + "px"}
        onclick={() => {
          size.set(size.get() + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

const instances = (
  <div>
    <OwnCounter />
    <OwnCounter />
  </div>
);

describe("local state", () => {
  it("two invocations of one component hold independent cells", async () => {
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
