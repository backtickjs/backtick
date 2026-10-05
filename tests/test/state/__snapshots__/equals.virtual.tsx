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

const press = () => userEvent.click(screen.getByRole("button"));

describe("equals", () => {
  beforeEach(() => {
    logged = [];
    globalThis.window.console.log = (...values: unknown[]) => {
      logged.push(values);
    };
  });
  afterEach(() => {
    globalThis.window.console.log = log;
  });

  it("keeps a memo's readers from updating for an equal value", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_n, __cs_setN] = (cs.splice((createSignal)))(1);
          const __cs_size = (cs.splice((createMemo)))(
            () => ({ isBig: __cs_n() > 2, n: __cs_n() }),
            undefined,
            { equals: (__cs_previous, __cs_next) => __cs_previous.isBig === __cs_next.isBig },
          );
          const __cs_label = () => {
            cs.globalThis.window.console.log();
            return __cs_size().isBig ? "big" : "small";
          };
          return (
            <div>
              <button onclick={() => __cs_setN(__cs_n() + 1)}>add</button>
              <p>{__cs_label()}</p>
            </div>
          );
        })()),
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
        cs.lift((() => () => {
          const [__cs_point, __cs_setPoint] = (cs.splice((createSignal)))(
            { x: 1 },
            { equals: (__cs_previous, __cs_next) => __cs_previous.x === __cs_next.x },
          );
          const __cs_label = () => {
            cs.globalThis.window.console.log();
            return "x " + __cs_point().x;
          };
          return (
            <div>
              <button onclick={() => __cs_setPoint({ x: __cs_point().x })}>same</button>
              <p>{__cs_label()}</p>
            </div>
          );
        })()),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is handed the previous and the next value", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_n, __cs_setN] = (cs.splice((createSignal)))(1, {
            equals: (__cs_previous, __cs_next) => {
              cs.globalThis.window.console.log(__cs_previous, __cs_next);
              return __cs_previous === __cs_next;
            },
          });
          return <button onclick={() => __cs_setN(2)}>{"n " + __cs_n()}</button>;
        })()),
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });

  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_n, __cs_setN] = (cs.splice((createSignal)))(1);
          const __cs_label = () => {
            cs.globalThis.window.console.log();
            return "n " + __cs_n();
          };
          return (
            <div>
              <button onclick={() => __cs_setN(1)}>same</button>
              <p>{__cs_label()}</p>
            </div>
          );
        })()),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_point, __cs_setPoint] = (cs.splice((createSignal)))({ x: 1 });
          const __cs_label = () => {
            cs.globalThis.window.console.log();
            return "x " + __cs_point().x;
          };
          return (
            <div>
              <button onclick={() => __cs_setPoint({ x: __cs_point().x })}>same</button>
              <p>{__cs_label()}</p>
            </div>
          );
        })()),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
