import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";

// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.

// A component whose whole drawing is a conditional on a signal of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a signal that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
const Held = cs.lift((() => (__cs_props: {
    again: () => boolean;
}) => {
    const __cs_shown = cs.splice((createSignal))(false);
    const __cs_started = cs.globalThis.window.setTimeout(() => {
        if (__cs_props.again()) {
            __cs_shown[1](true);
        }
    }, 0);
    return <>{__cs_shown[0]() ? <em>shown</em> : <i>waiting</i>}</>;
})());

const conditionalDrawing = cs.lift(((__cs_Held = cs.splice(Held)) => {
    const __cs_builds = cs.splice((createSignal))(0);
    return <div>{<span>{"builds " + __cs_builds[0]()}</span>}{<section>{<__cs_Held again={() => {
        __cs_builds[1](__cs_builds[0]() + 1);
        return __cs_builds[0]() < 5;
    }}/>}</section>}</div>;
})());

describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    render(await evaluate(() => conditionalDrawing));

    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));

    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));

    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});

describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
