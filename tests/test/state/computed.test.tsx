import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
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

describe("computed", () => {
  it("runs once per change, however many read it", async () => {
    await render(
      cs`{
        const n = $createSignal(1);
        const doubled = $createMemo(() => {
          window.console.log();
          return n[0]() * 2;
        });
        return (
          <div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{"a " + doubled()}</p>
            <p>{"b " + doubled()}</p>
            <p>{"c " + doubled()}</p>
          </div>
        );
      }`,
    );
    assert.equal(runs, 1);

    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });

  it("passes a change on only when its value changes", async () => {
    await render(
      cs`{
        const n = $createSignal(1);
        const isBig = $createMemo(() => n[0]() > 2);
        const label = () => {
          window.console.log();
          return isBig() ? "big" : "small";
        };
        return (
          <div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{label()}</p>
          </div>
        );
      }`,
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
