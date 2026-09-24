import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.lift(<For each={cs.lift([1, 2, 3])}>{cs.lift((__cs_n: number) => <span>{cs.lift("item " + __cs_n)}</span>)}</For>);
}

const items = await bundler.run(<Items />);
const total = await bundler.run(41);

const evaluated = cs.lift(<div>{cs.lift(eval((cs.splice((items)) satisfies typeof cs.ClientUnknown)))}{cs.lift(<b>{cs.lift(eval((cs.splice((total)) satisfies typeof cs.ClientUnknown)) + 1)}</b>)}</div>);

it("eval", async (t) => {
  await snapshotCase(t, "eval", evaluated);
});

describe("a bundle a script runs with eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(evaluated);

    const div = container.firstElementChild!;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
