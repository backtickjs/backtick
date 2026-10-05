import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A server component's script, run where its splice stands, as Solid runs a
// component: untracked. It reads a signal of its own while it sets up, which a
// timer it starts then writes: read where the splice stands, the write would
// build it again, with a signal never written and a timer never fired.
async function Held({ again }: { again: Client<() => boolean> }) {
  return cs.lift((() => {
    const [__cs_shown, __cs_setShown] = (cs.splice((createSignal)))(false);

    const __cs_started = cs.globalThis.window.setTimeout(() => {
      if ((cs.splice((again)))()) {
        __cs_setShown(true);
      }
    }, 0);

    const __cs_read = __cs_shown();
    return <em>{"read " + __cs_read}</em>;
  })());
}

const held = cs.lift((() => {
  const [__cs_builds, __cs_setBuilds] = (cs.splice((createSignal)))(0);
  return (
    <div>
      <span>{"builds " + __cs_builds()}</span>
      <section>{
        (cs.splice((
          <Held
            again={cs.lift((() => () => {
              __cs_setBuilds(__cs_builds() + 1);
              return __cs_builds() < 5;
            })())}
          />
        )))
      }</section>
    </div>
  );
})());

describe("a server component that reads a signal as it sets up", () => {
  it("is built once", async () => {
    render(await evaluate(() => held));
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(screen.getByText("builds 1"));
  });
});
