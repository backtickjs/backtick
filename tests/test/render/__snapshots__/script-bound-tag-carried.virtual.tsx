import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import type { JSXElement } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props: { body: Client<JSXElement> }) {
  return cs.lift((() => {
    const __cs_Badge = (__cs_p: { n: number }) => <i>{"panel " + __cs_p.n}</i>;
    return (
      <section>
        <__cs_Badge n={0} />
        {(cs.splice((props))).body}
      </section>
    );
  })());
}

// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.lift((() => {
  const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(0);
  const __cs_Badge = (__cs_p: { n: number; children: JSX.Element }) => (
    <b>
      {"outer " + __cs_p.n}
      {__cs_p.children}
    </b>
  );

  return (
    <div>
      {
        (cs.splice((
          <Panel
            body={cs.lift((() => (
              <__cs_Badge n={__cs_count()}>
                <u>{"kid " + __cs_count()}</u>
              </__cs_Badge>
            ))())}
          />
        )))
      }
      <button onclick={() => __cs_setCount(__cs_count() + 1)}>more</button>
    </div>
  );
})());

it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});

describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    render(await evaluate(() => scriptBoundTagCarried));
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
