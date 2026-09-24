import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import type { HTMLInputElement } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";

// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs`{
        const field = $state<HTMLInputElement | null>(null);
        return (
          <div>
            <input aria-label="name" ref={(element) => field.set(element)} />
            <button onclick={() => field.get()?.focus()}>edit</button>
          </div>
        );
      }`,
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("focuses once in place, through onMount", async () => {
    await render(
      cs`{
        return (
          <input
            aria-label="name"
            ref={(element) => $onMount(() => element.focus())}
          />
        );
      }`,
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("is not written as an attribute", async () => {
    await render(cs`<input aria-label="name" ref={() => {}} />`);
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
      await render(
        cs`{
          const shown = $state(true);
          const n = $state(0);
          return (
            <div>
              <button onclick={() => n.set(n.get() + 1)}>
                {"n " + n.get()}
              </button>
              {shown.get() ? (
                <p ref={() => $window.console.log(n.get())}>shown</p>
              ) : null}
            </div>
          );
        }`,
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
