import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";

// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.write(size.read() + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn(<Stepper />);
    assert.equal(fontSize(text), 16);
  });

  it("a write persists and re-renders the instance", async () => {
    const text = await drawn(<Stepper />);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });

  it("the display and the handler share one cell", async () => {
    const text = await drawn(<Stepper />);
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });

  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn(<Stepper />);
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage. One registration per event, reading whatever
    // the prop holds now — so the click after a write runs the handler the
    // write left behind, not the one that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});

it("Stepper", async (t) => {
  await snapshotCase(t, "Stepper", <Stepper />);
});
