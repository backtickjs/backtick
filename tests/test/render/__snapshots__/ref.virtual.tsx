import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { type HTMLInputElement, window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";

// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.lift((() => {
    const __cs_field = (cs.splice((state)) satisfies typeof cs.ClientUnknown)<HTMLInputElement | null>(null);
    return <div>{cs.lift(<input aria-label={cs.lift("name")} ref={cs.lift(__cs_element => __cs_field.set(__cs_element))}/>)}{cs.lift(<button onclick={cs.lift(() => __cs_field.get()?.focus())}>edit</button>)}</div>;
})()),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("focuses once in place, through onMount", async () => {
    await render(
      cs.lift((() => {
    return <input aria-label={cs.lift("name")} ref={cs.lift(__cs_element => (cs.splice((onMount)) satisfies typeof cs.ClientUnknown)(() => __cs_element.focus()))}/>;
})()),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });

  it("is not written as an attribute", async () => {
    await render(cs.lift(<input aria-label={cs.lift("name")} ref={cs.lift(() => {
})}/>));
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
        cs.lift((() => {
    const __cs_shown = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(true);
    const __cs_n = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(0);
    return <div>{cs.lift(<button onclick={cs.lift(() => __cs_n.set(__cs_n.get() + 1))}>{cs.lift("n " + __cs_n.get())}</button>)}{cs.lift(__cs_shown.get() ? <p ref={cs.lift(() => (cs.splice((window)) satisfies typeof cs.ClientUnknown).console.log(__cs_n.get()))}>shown</p> : null)}</div>;
})()),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
