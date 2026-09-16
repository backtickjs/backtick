import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs`{
    const count = $state(0);
    return (
      <button
        id="row"
        style="display: flex; gap: 8px"
        onclick={() => count.write(count.read() + 1)}
      >
        <span style="font-weight: 700">{count.read() > 0 ? "☑" : "☐"}</span>
        <span>{"pressed " + count.read() + " times"}</span>
      </button>
    );
  }`;
}

describe("screen", () => {
  it("increments the counter", async () => {
    await render(<Row />);
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });

  it("reads a fresh page in each test", async () => {
    await render(<Row />);
    assert.ok(screen.getByText("pressed 0 times"));
  });
});

describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", <Row />);
  });
});
