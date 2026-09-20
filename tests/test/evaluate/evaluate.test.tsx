import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, evaluate, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs`<For each={[1, 2, 3]}>
    {(n: number) => <span>{"item " + n}</span>}
  </For>`;
}

const items = await bundler.run(<Items />);
const total = await bundler.run(41);

const evaluated = cs`<div>
  {$evaluate($items)}
  <b>{$evaluate($total) + 1}</b>
</div>`;

it("evaluate", async (t) => {
  await snapshotCase(t, "evaluate", evaluated);
});

describe("a bundle a script runs with evaluate", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(evaluated);

    const div = container.firstElementChild!;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
