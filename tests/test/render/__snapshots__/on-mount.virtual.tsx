import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";

// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw: () => Promise<unknown>): Promise<string[]> {
  const seen: string[] = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}

describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const seen = await logged(() =>
      render(
        cs.lift((() => {
    const __cs_count = cs.splice((createSignal) satisfies typeof cs.Spliceable)(0);
    cs.splice((onMount) satisfies typeof cs.Spliceable)(() => {
        cs.globalThis.window.console.log();
        __cs_count[1](__cs_count[0]() + 1);
    });
    return <p>{cs.lift("mounted " + __cs_count[0]())}</p>;
})()),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });

  it("runs at once when called from a handler", async () => {
    await render(
      cs.lift((() => {
    const __cs_said = cs.splice((createSignal) satisfies typeof cs.Spliceable)("not yet");
    return <button onclick={cs.lift(() => cs.splice((onMount) satisfies typeof cs.Spliceable)(() => __cs_said[1]("ran")))}>{cs.lift(__cs_said[0]())}</button>;
})()),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
