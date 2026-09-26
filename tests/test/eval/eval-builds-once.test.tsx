import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { compile } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Bundle } from "@backtickjs/core";
import { render, screen } from "@backtickjs/solid-js/testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";
import type { JSX, Prop } from "@backtickjs/solid-js/jsx-runtime";

// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new signals, and whatever it did on the way in done over.
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
// expression that made it, which was this component again — new signals, and the
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

const answer = compile(await bundler.run(<Answer />)).code;

async function Waiting({
  ask,
}: {
  ask: Prop<() => Bundle<JSX.Element> | null>;
}) {
  return cs`{
    const drawn = $createSignal<Bundle<JSX.Element> | null>(null);
    const started = window.setTimeout(() => drawn[1]($ask()), 0);
    return (
      <>
        {drawn[0]() === null ? null : eval(drawn[0]() as Bundle<JSX.Element>)}
      </>
    );
  }`;
}

const evalBuildsOnce = cs`{
  const asked = $createSignal(0);

  return (
    <div>
      <span>{"asked " + asked[0]()}</span>
      <Waiting
        ask={() => {
          asked[1](asked[0]() + 1);
          return asked[0]() > 4 ? null : $answer;
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
