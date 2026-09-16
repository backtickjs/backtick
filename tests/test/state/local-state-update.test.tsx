import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function UpdatingStepper() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.update((current: number) => current + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

describe("local state", () => {
  it("`update` derives the next value from the current one", async () => {
    const text = await drawn(<UpdatingStepper />);
    assert.equal(fontSize(text), 16);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});

it("UpdatingStepper", async (t) => {
  await snapshotCase(t, "UpdatingStepper", <UpdatingStepper />);
});
