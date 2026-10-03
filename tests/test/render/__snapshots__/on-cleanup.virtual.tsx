import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("onCleanup", () => {
  beforeEach(() => {
    runs = 0;
    globalThis.window.console.log = () => {
      runs = runs + 1;
    };
  });
  afterEach(() => {
    globalThis.window.console.log = log;
  });

  it("runs when the drawing is removed", async () => {
    const { unmount } = render(
      await evaluate(
        cs.lift((() => () => {
          cs.splice((onCleanup))(() => cs.globalThis.window.console.log());
          return <p>drawn</p>;
        })()),
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });

  it("runs before a memo calculates again", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_n, __cs_setN] = cs.splice((createSignal))(1);
          const __cs_doubled = cs.splice((createMemo))(() => {
            cs.splice((onCleanup))(() => cs.globalThis.window.console.log());
            return __cs_n() * 2;
          });
          return <button onclick={() => __cs_setN(__cs_n() + 1)}>{__cs_doubled()}</button>;
        })()),
      ),
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

    const { unmount } = render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_timer, __cs_setTimer] = cs.splice((createSignal))(0);
          cs.splice((onMount))(() => {
            __cs_setTimer(cs.globalThis.window.setInterval(() => cs.globalThis.window.console.log(), 5));
          });
          cs.splice((onCleanup))(() => cs.globalThis.window.clearInterval(__cs_timer()));
          return <p>ticking</p>;
        })()),
      ),
    );
    await wait(40);
    assert.ok(runs > 0);

    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });

  it("never runs when called from a handler", async () => {
    const { unmount } = render(
      await evaluate(
        cs.lift((() => () => {
          return (
            <button onclick={() => cs.splice((onCleanup))(() => cs.globalThis.window.console.log())}>
              press
            </button>
          );
        })()),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
