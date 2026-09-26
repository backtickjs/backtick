import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/solid-js/bundle";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
import { draw } from "@backtickjs/solid-js/testing";
import { render } from "@solidjs/testing-library";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs`<For each={[1, 2, 3]}>
    {(n: number) => <span>{"item " + n}</span>}
  </For>`;
}

const items = (await bundle(<Items />)).code;
const total = (await bundle(41)).code;

const evaluated = cs`<div>
  {eval($items)}
  <b>{eval($total) + 1}</b>
</div>`;

it("eval", async (t) => {
  await snapshotCase(t, "eval", evaluated);
});

describe("a bundle a script runs with eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = render(await draw(evaluated));

    const div = container.firstElementChild!;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
