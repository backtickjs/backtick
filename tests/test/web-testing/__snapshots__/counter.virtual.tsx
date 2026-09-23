import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => __cs_count.set(__cs_count.get() + 1))}>Add</button>)}{cs.lift(<p>{cs.lift("Count: " + __cs_count.get())}</p>)}</div>);
})());
}

describe("a counter", () => {
  it("Counter", async (t) => {
    await snapshotCase(t, "Counter", <Counter />);
  });

  it("increments on a click", async () => {
    await render(<Counter />);
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    assert.ok(screen.getByText("Count: 1"));
  });
});
