import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

const scriptBoundTagLoading = cs`{
  const count = $state(0);
  const drawn = $state<Bundle<
    (props: { count: number }) => BacktickElement
  > | null>(null);
  const Badge = (props: { count: number }) => {
    const held = drawn.get();
    return held === null ? null : $vm.eval(held)(props);
  };

  return (
    <div>
      {drawn.get() === null ? <i>loading</i> : <Badge count={count.get()} />}
      <button onclick={() => drawn.set($loadedBadge)}>load</button>
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>
  );
}`;

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
