import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { draw } from "@backtickjs/solid-js/testing";

// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs`{
    const count = $createSignal(0);
    return (
      <button
        id="row"
        style="display: flex; gap: 8px"
        onclick={() => count[1](count[0]() + 1)}
      >
        <span style="font-weight: 700">{count[0]() > 0 ? "☑" : "☐"}</span>
        <span>{"pressed " + count[0]() + " times"}</span>
      </button>
    );
  }`;
}

describe("screen", () => {
  it("increments the counter", async () => {
    render(await draw(<Row />));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });

  it("reads a fresh page in each test", async () => {
    render(await draw(<Row />));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});

describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", <Row />);
  });
});
