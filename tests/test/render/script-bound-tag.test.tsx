import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/solid-js/bundle";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the signal without the badge being drawn again.
const badge = (await bundle(
    cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
  ),
).code;

const scriptBoundTag = cs`{
  const count = $createSignal(0);
  const Badge = eval($badge);

  return (
    <div>
      <Badge count={count[0]()} />
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>
  );
}`;

it("scriptBoundTag", async (t) => {
  await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
});

describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);

    const badge = screen.getByText("count 0");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });
});
