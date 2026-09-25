import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, onCleanup, onMount, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";

// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
beforeEach(() => {
  runs = 0;
  globalThis.window.console.log = () => {
    runs = runs + 1;
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("onCleanup", () => {
  it("runs when the drawing is removed", async () => {
    const { unmount } = await render(
      cs.lift((() => {
    cs.splice((onCleanup) satisfies typeof cs.Spliceable)(() => cs.splice((window) satisfies typeof cs.Spliceable).console.log());
    return <p>drawn</p>;
})()),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });

  it("runs before a computed calculates again", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = cs.splice((state) satisfies typeof cs.Spliceable)(1);
    const __cs_doubled = cs.splice((computed) satisfies typeof cs.Spliceable)(() => {
        cs.splice((onCleanup) satisfies typeof cs.Spliceable)(() => cs.splice((window) satisfies typeof cs.Spliceable).console.log());
        return __cs_n.get() * 2;
    });
    return <button onclick={cs.lift(() => __cs_n.set(__cs_n.get() + 1))}>{cs.lift(__cs_doubled.get())}</button>;
})()),
    );
    assert.equal(runs, 0);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    assert.equal(screen.getByRole("button").textContent, "4");
  });

  it("stops what onMount started", async (t) => {
    // Every interval the script starts is cleared once the test ends, so a
    // cleanup that never ran fails the test rather than hanging the run.
    const started: number[] = [];
    const setInterval = globalThis.window.setInterval;
    t.mock.method(
      globalThis.window,
      "setInterval",
      (handler: () => void, timeout?: number) => {
        const id = setInterval(handler, timeout);
        started.push(id);
        return id;
      },
    );
    t.after(() => started.forEach((id) => globalThis.window.clearInterval(id)));

    const { unmount } = await render(
      cs.lift((() => {
    const __cs_timer = cs.splice((state) satisfies typeof cs.Spliceable)(0);
    cs.splice((onMount) satisfies typeof cs.Spliceable)(() => {
        __cs_timer.set(cs.splice((window) satisfies typeof cs.Spliceable).setInterval(() => cs.splice((window) satisfies typeof cs.Spliceable).console.log(), 5));
    });
    cs.splice((onCleanup) satisfies typeof cs.Spliceable)(() => cs.splice((window) satisfies typeof cs.Spliceable).clearInterval(__cs_timer.get()));
    return <p>ticking</p>;
})()),
    );
    await wait(40);
    assert.ok(runs > 0);

    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });

  it("never runs when called from a handler", async () => {
    const { unmount } = await render(
      cs.lift((() => {
    return <button onclick={cs.lift(() => cs.splice((onCleanup) satisfies typeof cs.Spliceable)(() => cs.splice((window) satisfies typeof cs.Spliceable).console.log()))}>
            press
          </button>;
})()),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
