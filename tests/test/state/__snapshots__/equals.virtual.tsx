import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";

// Each reader logs when it runs, so a test counts the runs by counting the
// logs, and reads what was logged.
let logged: unknown[][] = [];
const log = globalThis.window.console.log;
beforeEach(() => {
  logged = [];
  globalThis.window.console.log = (...values: unknown[]) => {
    logged.push(values);
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});

const press = () => userEvent.click(screen.getByRole("button"));

describe("equals", () => {
  it("keeps a computed's readers from updating for an equal value", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(1);
    const __cs_size = (cs.splice((computed)) satisfies typeof cs.ClientUnknown)(() => ({ isBig: __cs_n.get() > 2, n: __cs_n.get() }), { equals: (__cs_previous, __cs_next) => __cs_previous.isBig === __cs_next.isBig });
    const __cs_label = () => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return __cs_size.get().isBig ? "big" : "small";
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n.set(__cs_n.get() + 1))}>add</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
})()),
    );
    assert.equal(logged.length, 1);

    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);

    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });

  it("keeps a state's readers from updating for an equal value", async () => {
    await render(
      cs.lift((() => {
    const __cs_point = (cs.splice((state)) satisfies typeof cs.ClientUnknown)({ x: 1 }, { equals: (__cs_previous, __cs_next) => __cs_previous.x === __cs_next.x });
    const __cs_label = () => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return "x " + __cs_point.get().x;
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_point.set({ x: __cs_point.get().x }))}>
              same
            </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
})()),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is handed the previous and the next value", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(1, { equals: (__cs_previous, __cs_next) => {
            (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log(__cs_previous, __cs_next);
            return __cs_previous === __cs_next;
        } });
    return <button onclick={cs.lift(() => __cs_n.set(2))}>{cs.lift("n " + __cs_n.get())}</button>;
})()),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });

  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(1);
    const __cs_label = () => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return "n " + __cs_n.get();
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n.set(1))}>same</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
})()),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.lift((() => {
    const __cs_point = (cs.splice((state)) satisfies typeof cs.ClientUnknown)({ x: 1 });
    const __cs_label = () => {
        (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log();
        return "x " + __cs_point.get().x;
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_point.set({ x: __cs_point.get().x }))}>
              same
            </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
})()),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
