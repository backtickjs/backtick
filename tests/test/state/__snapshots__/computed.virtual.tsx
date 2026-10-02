import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

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
    render(
      await evaluate(
        cs.lift((() => () => {
    const __cs_n = cs.splice((createSignal))(1);
    const __cs_doubled = cs.splice((createMemo))(() => {
        cs.globalThis.window.console.log();
        return __cs_n[0]() * 2;
    });
    return <div>{<button onclick={() => __cs_n[1](__cs_n[0]() + 1)}>add</button>}{<p>{"a " + __cs_doubled()}</p>}{<p>{"b " + __cs_doubled()}</p>}{<p>{"c " + __cs_doubled()}</p>}</div>;
})()),
      ),
    );
    assert.equal(runs, 1);

    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });

  it("passes a change on only when its value changes", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
    const __cs_n = cs.splice((createSignal))(1);
    const __cs_isBig = cs.splice((createMemo))(() => __cs_n[0]() > 2);
    const __cs_label = () => {
        cs.globalThis.window.console.log();
        return __cs_isBig() ? "big" : "small";
    };
    return <div>{<button onclick={() => __cs_n[1](__cs_n[0]() + 1)}>add</button>}{<p>{__cs_label()}</p>}</div>;
})()),
      ),
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
