import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs`{
    const count = $state(0);
    return (
      <div>
        <button onclick={() => count.write(count.read() + 1)}>Add</button>
        <p>{"Count: " + count.read()}</p>
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
