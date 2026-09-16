import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "./snapshotCase.ts";

// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way, and both are here: a bundle drawn where it
// stands, and a list. The list is the one that says where the fault was — a
// drawn bundle is not special, so neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.

// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs`<em>{"answered"}</em>`;
}

const answer = await bundler.run(<Answer />);

async function Waiting({
  ask,
}: {
  ask: Prop<() => Bundle<BacktickElement> | null>;
}) {
  return cs`{
    const drawn = $state<Bundle<BacktickElement> | null>(null);
    const started = $window.setTimeout(() => drawn.write($ask()), 0);
    return (
      <>
        {drawn.read() === null
          ? null
          : $vm.eval(drawn.read() as Bundle<BacktickElement>)}
      </>
    );
  }`;
}

const vmEvalBuildsOnce = cs`{
  const asked = $state(0);

  return (
    <div>
      <span>{"asked " + asked.read()}</span>
      <Waiting
        ask={() => {
          asked.write(asked.read() + 1);
          return asked.read() > 4 ? null : $answer;
        }}
      />
    </div>
  );
}`;

// The same claim as `vmEvalBuildsOnce`, with no bundle in it.
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
    const items = $state<string[]>([]);

    const started = $window.setTimeout(() => {
      if ($more()) {
        items.write($answerItems);
      }
    }, 0);

    return <For each={items.read()}>{(item: string) => <em>{item}</em>}</For>;
  }`;
}

const forBuildsOnce = cs`{
  const asked = $state(0);

  return (
    <div>
      <span>{"asked " + asked.read()}</span>
      <WaitingList
        more={() => {
          asked.write(asked.read() + 1);
          return asked.read() < 5;
        }}
      />
    </div>
  );
}`;

// Long enough for the timer the component set, and for a component built
// again to have set another.
const settled = () => new Promise((settle) => setTimeout(settle, 100));

describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(vmEvalBuildsOnce);

    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);

    await settled();

    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
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

describe("what each case compiles and bundles to", () => {
  it("vmEvalBuildsOnce", async (t) => {
    await snapshotCase(t, "vmEvalBuildsOnce", vmEvalBuildsOnce);
  });

  it("forBuildsOnce", async (t) => {
    await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
  });
});
