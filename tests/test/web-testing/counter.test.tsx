import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A signal a script declares, and a button that writes it.
async function Counter() {
  return cs`{
    const count = $createSignal(0);
    return (
      <div>
        <button onclick={() => count[1](count[0]() + 1)}>Add</button>
        <p>{"Count: " + count[0]()}</p>
      </div>
    );
  }`;
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
