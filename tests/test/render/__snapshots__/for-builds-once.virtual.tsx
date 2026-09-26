import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];

async function WaitingList({ more }: { more: Prop<() => boolean> }) {
  return cs.lift((() => {
    const __cs_items = cs.splice((createSignal) satisfies typeof cs.Spliceable)<string[]>([]);
    const __cs_started = cs.splice((window) satisfies typeof cs.Spliceable).setTimeout(() => {
        if (cs.splice((more) satisfies typeof cs.Spliceable)()) {
            __cs_items[1](cs.splice((answerItems) satisfies typeof cs.Spliceable));
        }
    }, 0);
    return <For each={cs.lift(__cs_items[0]())}>{cs.lift((__cs_item: string) => <em>{cs.lift(__cs_item)}</em>)}</For>;
})());
}

const forBuildsOnce = cs.lift((() => {
    const __cs_asked = cs.splice((createSignal) satisfies typeof cs.Spliceable)(0);
    return <div>{cs.lift(<span>{cs.lift("asked " + __cs_asked[0]())}</span>)}{cs.lift(<WaitingList more={cs.lift(() => {
        __cs_asked[1](__cs_asked[0]() + 1);
        return __cs_asked[0]() < 5;
    })}/>)}</div>;
})());

it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});

describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(forBuildsOnce);

    assert.ok(screen.getByText("asked 0"));

    await settled();

    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
