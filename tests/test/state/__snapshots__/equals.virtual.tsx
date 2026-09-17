import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
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
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(1));
    const __cs_size = cs.const((cs.splice((computed)) satisfies typeof cs.ClientUnknown)(() => ({ isBig: cs.receiver(__cs_n).get() > 2, n: cs.receiver(__cs_n).get() }), { equals: (__cs_previous, __cs_next) => cs.receiver(__cs_previous).isBig === cs.receiver(__cs_next).isBig }));
    const __cs_label = cs.const(() => {
        cs.statement(cs.receiver(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).console).log());
        return cs.const((cs.condition(cs.receiver(cs.receiver(__cs_size).get()).isBig) && cs.receiver(cs.receiver(__cs_size).get()).isBig) ? "big" : "small");
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_n).set(cs.receiver(__cs_n).get() + 1))}>add</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>);
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
    const __cs_point = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)({ x: 1 }, { equals: (__cs_previous, __cs_next) => cs.receiver(__cs_previous).x === cs.receiver(__cs_next).x }));
    const __cs_label = cs.const(() => {
        cs.statement(cs.receiver(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).console).log());
        return cs.const("x " + cs.receiver(cs.receiver(__cs_point).get()).x);
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_point).set({ x: cs.receiver(cs.receiver(__cs_point).get()).x }))}>
              same
            </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>);
})()),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is handed the previous and the next value", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(1, { equals: (__cs_previous, __cs_next) => {
            cs.statement(cs.receiver(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).console).log(__cs_previous, __cs_next));
            return cs.const(__cs_previous === __cs_next);
        } }));
    return cs.const(<button onclick={cs.lift(() => cs.receiver(__cs_n).set(2))}>{cs.lift("n " + cs.receiver(__cs_n).get())}</button>);
})()),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });

  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(1));
    const __cs_label = cs.const(() => {
        cs.statement(cs.receiver(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).console).log());
        return cs.const("n " + cs.receiver(__cs_n).get());
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_n).set(1))}>same</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>);
})()),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.lift((() => {
    const __cs_point = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)({ x: 1 }));
    const __cs_label = cs.const(() => {
        cs.statement(cs.receiver(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).console).log());
        return cs.const("x " + cs.receiver(cs.receiver(__cs_point).get()).x);
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_point).set({ x: cs.receiver(cs.receiver(__cs_point).get()).x }))}>
              same
            </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>);
})()),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
