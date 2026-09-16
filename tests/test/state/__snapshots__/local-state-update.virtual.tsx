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
  return cs.lift((() => {
    const __cs_size = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(16));
    return cs.const(<span style={cs.lift("font-size: " + cs.receiver(__cs_size).read() + "px")} onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_size).update((__cs_current: number) => __cs_current + 1));
    })}>
        press
      </span>);
})());
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
