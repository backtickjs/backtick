import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.lift((() => {
    const __cs_count = cs.splice((createSignal) satisfies typeof cs.Spliceable)(0);
    const __cs_Badge = (__cs_props: {
        n: number;
    }) => <b>{cs.lift("n " + __cs_props.n)}</b>;
    return <div>{cs.lift(cs.splice(cs.lift(<__cs_Badge n={__cs_count[0]()}/>) satisfies typeof cs.Spliceable))}{cs.lift(cs.splice(cs.lift((() => {
    const __cs_skipped = 10;
    return cs.splice(cs.lift(<__cs_Badge n={__cs_count[0]() + 100}/>) satisfies typeof cs.Spliceable);
})()) satisfies typeof cs.Spliceable))}{cs.lift(cs.splice((<section>{cs.lift(<__cs_Badge n={__cs_count[0]() + 1000}/>)}</section>) satisfies typeof cs.Spliceable))}{cs.lift(cs.splice(cs.lift(<For each={cs.lift([1, 2])}>{cs.lift((__cs_m: number) => <__cs_Badge n={__cs_m * __cs_count[0]()}/>)}</For>) satisfies typeof cs.Spliceable))}{cs.lift(<button onclick={cs.lift(() => __cs_count[1](__cs_count[0]() + 1))}>more</button>)}</div>;
})());

it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});

describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
