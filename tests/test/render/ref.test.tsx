import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { draw } from "@backtickjs/solid-js/testing";

// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    render(
      await draw(
        cs`{
          const field = $createSignal<HTMLInputElement | null>(null);
          return (
            <div>
              <input aria-label="name" ref={(element) => field[1](element)} />
              <button onclick={() => field[0]()?.focus()}>edit</button>
            </div>
          );
        }`,
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("focuses once in place, through onMount", async () => {
    render(
      await draw(
        cs`{
          return (
            <input
              aria-label="name"
              ref={(element) => $onMount(() => element.focus())}
            />
          );
        }`,
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("is not written as an attribute", async () => {
    render(await draw(cs`<input aria-label="name" ref={() => {}} />`));
    assert.equal(screen.getByLabelText("name").hasAttribute("ref"), false);
  });

  describe("is called once", () => {
    let calls = 0;
    const log = globalThis.window.console.log;
    beforeEach(() => {
      calls = 0;
      globalThis.window.console.log = () => {
        calls = calls + 1;
      };
    });
    afterEach(() => {
      globalThis.window.console.log = log;
    });

    // Drawn by a conditional, whose computation re-runs whenever it reads
    // something that changes, so a tracked read in `ref` would draw the
    // element again.
    it("even when a signal it read changes", async () => {
      render(
        await draw(
          cs`{
            const shown = $createSignal(true);
            const n = $createSignal(0);
            return (
              <div>
                <button onclick={() => n[1](n[0]() + 1)}>
                  {"n " + n[0]()}
                </button>
                {shown[0]() ? (
                  <p ref={() => window.console.log(n[0]())}>shown</p>
                ) : null}
              </div>
            );
          }`,
        ),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
