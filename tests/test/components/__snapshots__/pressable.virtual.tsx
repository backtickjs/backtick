import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.lift((() => {
    const __cs_count = cs.splice((createSignal) satisfies typeof cs.Spliceable)(0);
    return <button id={cs.lift("row")} style={cs.lift("display: flex; gap: 8px")} onclick={cs.lift(() => __cs_count[1](__cs_count[0]() + 1))}>{cs.lift(<span style={cs.lift("font-weight: 700")}>{cs.lift(__cs_count[0]() > 0 ? "\u2611" : "\u2610")}</span>)}{cs.lift(<span>{cs.lift("pressed " + __cs_count[0]() + " times")}</span>)}</button>;
})());
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
