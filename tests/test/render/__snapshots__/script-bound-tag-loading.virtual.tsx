import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { BacktickElement, Bundle } from "@backtickjs/core";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the signal: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.lift((__cs_props: {
    count: number;
}) => <b>{cs.lift("count " + __cs_props.count)}</b>),
  { transform },
);

const scriptBoundTagLoading = cs.lift((() => {
    const __cs_count = cs.splice((createSignal) satisfies typeof cs.Spliceable)(0);
    const __cs_drawn = cs.splice((createSignal) satisfies typeof cs.Spliceable)<Bundle<(props: {
        count: number;
    }) => BacktickElement> | null>(null);
    const __cs_Badge = (__cs_props: {
        count: number;
    }) => {
        const __cs_held = __cs_drawn[0]();
        return __cs_held === null ? null : eval(__cs_held)(__cs_props);
    };
    return <div>{cs.lift(__cs_drawn[0]() === null ? <i>loading</i> : <__cs_Badge count={__cs_count[0]()}/>)}{cs.lift(<button onclick={cs.lift(() => __cs_drawn[1](cs.splice((loadedBadge) satisfies typeof cs.Spliceable)))}>load</button>)}{cs.lift(<button onclick={cs.lift(() => __cs_count[1](__cs_count[0]() + 1))}>more</button>)}</div>;
})());

it("scriptBoundTagLoading", async (t) => {
  await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
});

describe("a tag naming a function the script holds", () => {
  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");

    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);

    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });
});
