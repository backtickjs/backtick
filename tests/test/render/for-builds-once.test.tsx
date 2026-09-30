import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";
import { draw } from "@backtickjs/solid-js/testing";

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
  return cs`{
    const items = $createSignal<string[]>([]);

    const started = window.setTimeout(() => {
      if ($more()) {
        items[1]($answerItems);
      }
    }, 0);

    return <For each={items[0]()}>{(item: string) => <em>{item}</em>}</For>;
  }`;
}

const forBuildsOnce = cs`{
  const asked = $createSignal(0);

  return (
    <div>
      <span>{"asked " + asked[0]()}</span>
      <WaitingList
        more={() => {
          asked[1](asked[0]() + 1);
          return asked[0]() < 5;
        }}
      />
    </div>
  );
}`;

it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});

describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = render(await draw(() => forBuildsOnce));

    assert.ok(screen.getByText("asked 0"));

    await settled();

    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
