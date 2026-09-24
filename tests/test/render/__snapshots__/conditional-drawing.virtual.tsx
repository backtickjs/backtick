import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import type { Prop } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";

// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.

// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
async function Held({ again }: { again: Prop<() => boolean> }) {
  return cs.lift((() => {
    const __cs_shown = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(false);
    const __cs_started = (cs.splice((window)) satisfies typeof cs.ClientUnknown).setTimeout(() => {
        if ((cs.splice((again)) satisfies typeof cs.ClientUnknown)()) {
            __cs_shown.set(true);
        }
    }, 0);
    return <>{cs.lift(__cs_shown.get() ? <em>shown</em> : <i>waiting</i>)}</>;
})());
}

const conditionalDrawing = cs.lift((() => {
    const __cs_builds = (cs.splice((state)) satisfies typeof cs.ClientUnknown)(0);
    return <div>{cs.lift(<span>{cs.lift("builds " + __cs_builds.get())}</span>)}{cs.lift(<section>{cs.lift(<Held again={cs.lift(() => {
        __cs_builds.set(__cs_builds.get() + 1);
        return __cs_builds.get() < 5;
    })}/>)}</section>)}</div>;
})());

describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(conditionalDrawing);

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
