import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";

// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
const svgNamespaceLater = cs`{
  const xs = $state([10]);
  const shown = $state(false);

  return (
    <div>
      <svg viewBox="0 0 30 10">
        <For each={xs.get()}>{(x: number) => <title>{"dot " + x}</title>}</For>
        {shown.get() ? <title>{"shown"}</title> : null}
      </svg>
      <title>{"after"}</title>
      <button onclick={() => xs.set([10, 20])}>add</button>
      <button onclick={() => shown.set(true)}>show</button>
    </div>
  );
}`;

it("svgNamespaceLater", async (t) => {
  await snapshotCase(t, "svgNamespaceLater", svgNamespaceLater);
});

describe("an element's namespace", () => {
  // Nothing walks down from the top when a list or a condition draws again, so
  // what it draws has to have kept the namespace from the first pass.
  it("is kept by what draws again later", async () => {
    const { container } = await render(svgNamespaceLater);
    assert.deepEqual(namespaced(container).sort(), [
      "button",
      "button",
      "div",
      "svg:svg",
      "svg:title",
      "title",
    ]);

    // What the two writes added, which is the claim: a title drawn later is
    // still SVG's, and the one beside it is still HTML's.
    const before = namespaced(container).sort();
    await userEvent.click(screen.getByRole("button", { name: "add" }));
    await userEvent.click(screen.getByRole("button", { name: "show" }));
    assert.deepEqual(added(before, namespaced(container).sort()), [
      "svg:title",
      "svg:title",
    ]);
  });

  // What the second list holds that the first did not, counting duplicates.
  function added(before: string[], after: string[]): string[] {
    const held = [...before];
    return after.filter((tag) => {
      const at = held.indexOf(tag);
      if (at === -1) {
        return true;
      }
      held.splice(at, 1);
      return false;
    });
  }
});
