import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, evaluate, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs.lift(cs.const((__cs_props: {
    count: number;
}) => <b>{cs.lift("count " + __cs_props.count)}</b>)),
);

const scriptBoundTag = cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    const __cs_Badge = cs.const((cs.splice((evaluate)) satisfies typeof cs.ClientUnknown)((cs.splice((badge)) satisfies typeof cs.ClientUnknown)));
    return cs.const(<div>{cs.lift(<__cs_Badge count={__cs_count.get()}/>)}{cs.lift(<button onclick={cs.lift(() => __cs_count.set(__cs_count.get() + 1))}>more</button>)}</div>);
})());

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
