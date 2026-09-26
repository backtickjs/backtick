import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal, onCleanup, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
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
      cs`{
        $onCleanup(() => window.console.log());
        return <p>drawn</p>;
      }`,
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });

  it("runs before a memo calculates again", async () => {
    await render(
      cs`{
        const n = $createSignal(1);
        const doubled = $createMemo(() => {
          $onCleanup(() => window.console.log());
          return n[0]() * 2;
        });
        return (
          <button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>
        );
      }`,
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
      cs`{
        const timer = $createSignal(0);
        $onMount(() => {
          timer[1](window.setInterval(() => window.console.log(), 5));
        });
        $onCleanup(() => window.clearInterval(timer[0]()));
        return <p>ticking</p>;
      }`,
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
      cs`{
        return (
          <button onclick={() => $onCleanup(() => window.console.log())}>
            press
          </button>
        );
      }`,
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
