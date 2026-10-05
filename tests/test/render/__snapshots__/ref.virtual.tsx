import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          const [__cs_field, __cs_setField] = (cs.splice((createSignal)))<HTMLInputElement | null>(
            null,
          );
          return (
            <div>
              <input aria-label="name" ref={(__cs_element) => __cs_setField(__cs_element)} />
              <button onclick={() => __cs_field()?.focus()}>edit</button>
            </div>
          );
        })()),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("focuses once in place, through onMount", async () => {
    render(
      await evaluate(
        cs.lift((() => () => {
          return (
            <input
              aria-label="name"
              ref={(__cs_element) => (cs.splice((onMount)))(() => __cs_element.focus())}
            />
          );
        })()),
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("is not written as an attribute", async () => {
    render(
      await evaluate(cs.lift((() => () => <input aria-label="name" ref={() => {}} />)())),
    );
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
        await evaluate(
          cs.lift((() => () => {
            const [__cs_shown, __cs_setShown] = (cs.splice((createSignal)))(true);
            const [__cs_n, __cs_setN] = (cs.splice((createSignal)))(0);
            return (
              <div>
                <button onclick={() => __cs_setN(__cs_n() + 1)}>{"n " + __cs_n()}</button>
                {__cs_shown() ? (
                  <p ref={() => cs.globalThis.window.console.log(__cs_n())}>shown</p>
                ) : null}
              </div>
            );
          })()),
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
