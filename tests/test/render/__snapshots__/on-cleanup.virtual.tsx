import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, onCleanup, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
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
    cs.statement((cs.splice((onCleanup)) satisfies typeof cs.ClientUnknown)(() => cs.receiver(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).console).log()));
    return cs.const(<p>drawn</p>);
})()),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });

  it("runs before a computed calculates again", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(1));
    const __cs_doubled = cs.const((cs.splice((computed)) satisfies typeof cs.ClientUnknown)(() => {
        cs.statement((cs.splice((onCleanup)) satisfies typeof cs.ClientUnknown)(() => cs.receiver(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).console).log()));
        return cs.const(cs.receiver(__cs_n).get() * 2);
    }));
    return cs.const(<button onclick={cs.lift(() => cs.receiver(__cs_n).set(cs.receiver(__cs_n).get() + 1))}>{cs.lift(cs.receiver(__cs_doubled).get())}</button>);
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
    const __cs_timer = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    cs.statement((cs.splice((onMount)) satisfies typeof cs.ClientUnknown)(() => {
        cs.statement(cs.receiver(__cs_timer).set(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).setInterval(() => cs.receiver(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).console).log(), 5)));
    }));
    cs.statement((cs.splice((onCleanup)) satisfies typeof cs.ClientUnknown)(() => cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).clearInterval(cs.receiver(__cs_timer).get())));
    return cs.const(<p>ticking</p>);
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
    return cs.const(<button onclick={cs.lift(() => (cs.splice((onCleanup)) satisfies typeof cs.ClientUnknown)(() => cs.receiver(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).console).log()))}>
            press
          </button>);
})()),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
