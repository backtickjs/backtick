import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/solid-js/bundle";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Bundle } from "@backtickjs/core";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the signal: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = (await bundle(
    cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
  ),
).code;

const scriptBoundTagLoading = cs`{
  const count = $createSignal(0);
  const drawn = $createSignal<Bundle<
    (props: { count: number }) => JSX.Element
  > | null>(null);
  const Badge = (props: { count: number }) => {
    const held = drawn[0]();
    return held === null ? null : eval(held)(props);
  };

  return (
    <div>
      {drawn[0]() === null ? <i>loading</i> : <Badge count={count[0]()} />}
      <button onclick={() => drawn[1]($loadedBadge)}>load</button>
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
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
