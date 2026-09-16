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
const svgNamespaceLater = cs.lift((() => {
    const __cs_xs = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)([10]));
    const __cs_shown = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(false));
    return cs.const(<div>{cs.lift(<svg viewBox={cs.lift("0 0 30 10")}>{cs.lift(<For each={cs.lift(cs.receiver(__cs_xs).read())}>{cs.lift((__cs_x: number) => <title>{cs.lift("dot " + __cs_x)}</title>)}</For>)}{cs.lift((cs.condition(cs.receiver(__cs_shown).read()) && cs.receiver(__cs_shown).read()) ? <title>{cs.lift("shown")}</title> : null)}</svg>)}{cs.lift(<title>{cs.lift("after")}</title>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_xs).write([10, 20]))}>add</button>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_shown).write(true))}>show</button>)}</div>);
})());

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
