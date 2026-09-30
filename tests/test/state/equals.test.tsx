import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { draw } from "@backtickjs/solid-js/testing";

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
      await draw(
        cs`() => {
          const n = $createSignal(1);
          const size = $createMemo(
            () => ({ isBig: n[0]() > 2, n: n[0]() }),
            undefined,
            { equals: (previous, next) => previous.isBig === next.isBig },
          );
          const label = () => {
            window.console.log();
            return size().isBig ? "big" : "small";
          };
          return (
            <div>
              <button onclick={() => n[1](n[0]() + 1)}>add</button>
              <p>{label()}</p>
            </div>
          );
        }`,
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
      await draw(
        cs`() => {
          const point = $createSignal(
            { x: 1 },
            { equals: (previous, next) => previous.x === next.x },
          );
          const label = () => {
            window.console.log();
            return "x " + point[0]().x;
          };
          return (
            <div>
              <button onclick={() => point[1]({ x: point[0]().x })}>
                same
              </button>
              <p>{label()}</p>
            </div>
          );
        }`,
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is handed the previous and the next value", async () => {
    render(
      await draw(
        cs`() => {
          const n = $createSignal(1, {
            equals: (previous, next) => {
              window.console.log(previous, next);
              return previous === next;
            },
          });
          return <button onclick={() => n[1](2)}>{"n " + n[0]()}</button>;
        }`,
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });

  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await draw(
        cs`() => {
          const n = $createSignal(1);
          const label = () => {
            window.console.log();
            return "n " + n[0]();
          };
          return (
            <div>
              <button onclick={() => n[1](1)}>same</button>
              <p>{label()}</p>
            </div>
          );
        }`,
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });

  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await draw(
        cs`() => {
          const point = $createSignal({ x: 1 });
          const label = () => {
            window.console.log();
            return "x " + point[0]().x;
          };
          return (
            <div>
              <button onclick={() => point[1]({ x: point[0]().x })}>
                same
              </button>
              <p>{label()}</p>
            </div>
          );
        }`,
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
