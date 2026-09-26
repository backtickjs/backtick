import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { compile } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { render } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs`<For each={[1, 2, 3]}>
    {(n: number) => <span>{"item " + n}</span>}
  </For>`;
}

const items = compile(await bundler.run(<Items />)).code;
const total = compile(await bundler.run(41)).code;

const evaluated = cs`<div>
  {eval($items)}
  <b>{eval($total) + 1}</b>
</div>`;

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
