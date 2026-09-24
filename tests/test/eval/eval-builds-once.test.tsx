import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way: a bundle drawn where it stands, which is this
// file, and a list, which `render/for-builds-once.test.tsx` covers. The list is
// the one that says where the fault was — a drawn bundle is not special, so
// neither is the fix.
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
    const started = $window.setTimeout(() => drawn.set($ask()), 0);
    return (
      <>
        {drawn.get() === null
          ? null
          : eval(drawn.get() as Bundle<BacktickElement>)}
      </>
    );
  }`;
}

const evalBuildsOnce = cs`{
  const asked = $state(0);

  return (
    <div>
      <span>{"asked " + asked.get()}</span>
      <Waiting
        ask={() => {
          asked.set(asked.get() + 1);
          return asked.get() > 4 ? null : $answer;
        }}
      />
    </div>
  );
}`;

it("evalBuildsOnce", async (t) => {
  await snapshotCase(t, "evalBuildsOnce", evalBuildsOnce);
});

describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(evalBuildsOnce);

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
