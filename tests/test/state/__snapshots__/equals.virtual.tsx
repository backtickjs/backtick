import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

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
  it("keeps a memo's readers from updating for an equal value", async () => {
    render(
      await evaluate(
        cs.lift(() => {
    const __cs_n = cs.splice((createSignal))(1);
    const __cs_size = cs.splice((createMemo))(() => ({ isBig: __cs_n[0]() > 2, n: __cs_n[0]() }), undefined, { equals: (__cs_previous, __cs_next) => __cs_previous.isBig === __cs_next.isBig });
    const __cs_label = () => {
        cs.globalThis.window.console.log();
        return __cs_size().isBig ? "big" : "small";
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n[1](__cs_n[0]() + 1))}>add</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
}),
      ),
    );
    assert.equal(logged.length, 1);

    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);

    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });

  it("keeps a signal's readers from updating for an equal value", async () => {
    render(
      await evaluate(
        cs.lift(() => {
    const __cs_point = cs.splice((createSignal))({ x: 1 }, { equals: (__cs_previous, __cs_next) => __cs_previous.x === __cs_next.x });
    const __cs_label = () => {
        cs.globalThis.window.console.log();
        return "x " + __cs_point[0]().x;
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_point[1]({ x: __cs_point[0]().x }))}>
                same
              </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
}),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is handed the previous and the next value", async () => {
    render(
      await evaluate(
        cs.lift(() => {
    const __cs_n = cs.splice((createSignal))(1, { equals: (__cs_previous, __cs_next) => {
            cs.globalThis.window.console.log(__cs_previous, __cs_next);
            return __cs_previous === __cs_next;
        } });
    return <button onclick={cs.lift(() => __cs_n[1](2))}>{cs.lift("n " + __cs_n[0]())}</button>;
}),
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });

  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await evaluate(
        cs.lift(() => {
    const __cs_n = cs.splice((createSignal))(1);
    const __cs_label = () => {
        cs.globalThis.window.console.log();
        return "n " + __cs_n[0]();
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n[1](1))}>same</button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
}),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await evaluate(
        cs.lift(() => {
    const __cs_point = cs.splice((createSignal))({ x: 1 });
    const __cs_label = () => {
        cs.globalThis.window.console.log();
        return "x " + __cs_point[0]().x;
    };
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_point[1]({ x: __cs_point[0]().x }))}>
                same
              </button>)}{cs.lift(<p>{cs.lift(__cs_label())}</p>)}</div>;
}),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
