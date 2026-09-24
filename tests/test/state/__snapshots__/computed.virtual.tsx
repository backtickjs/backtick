import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
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

describe("computed", () => {
  it("runs once per change, however many read it", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(1);
    const __cs_doubled = (cs.splice((computed)) satisfies typeof cs.ClientUnknown)(() => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return __cs_n.get() * 2;
    });
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n.set(__cs_n.get() + 1))}>add</button>)}{cs.lift(<p>{cs.lift("a " + __cs_doubled.get())}</p>)}{cs.lift(<p>{cs.lift("b " + __cs_doubled.get())}</p>)}{cs.lift(<p>{cs.lift("c " + __cs_doubled.get())}</p>)}</div>;
})()),
    );
    assert.equal(runs, 1);

    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });

  it("passes a change on only when its value changes", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(1);
    const __cs_isBig = (cs.splice((computed)) satisfies typeof cs.ClientUnknown)(() => __cs_n.get() > 2);
    const __cs_label = () => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return __cs_isBig.get() ? "big" : "small";
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n.set(__cs_n.get() + 1))}>add</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
})()),
    );
    assert.equal(runs, 1);

    // 1 to 2: still small, so the reader doesn't run.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);

    // 2 to 3: big now.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("big"));
  });
});
