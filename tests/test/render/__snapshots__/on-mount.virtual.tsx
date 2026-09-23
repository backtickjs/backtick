import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
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
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    cs.statement((cs.splice((onMount)) satisfies typeof cs.ClientUnknown)(() => {
        cs.statement((cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log());
        cs.statement(__cs_count.set(__cs_count.get() + 1));
    }));
    return cs.const(<p>{cs.lift("mounted " + __cs_count.get())}</p>);
})()),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });

  it("runs at once when called from a handler", async () => {
    await render(
      cs.lift((() => {
    const __cs_said = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)("not yet"));
    return cs.const(<button onclick={cs.lift(() => (cs.splice((onMount)) satisfies typeof cs.ClientUnknown)(() => __cs_said.set("ran")))}>{cs.lift(__cs_said.get())}</button>);
})()),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
