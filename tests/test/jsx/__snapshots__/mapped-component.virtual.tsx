import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// One element template, expanded once per row on the client: the splice hole
// sits inside a `.map` callback, so it is reached once per iteration and each
// expansion must see its own `row`.
//
// The template is written inside the script because that is what lets `row`
// resolve to the callback's binding — hoisting it out would make `row` a free
// host reference instead of a capture.
//
// Inlining is what keeps the expansions apart today: the splice lands in body
// position, where a tree reference is a plain call and instantiates afresh. If
// it ever arrives as a thunk instead, the reference becomes an `apply` in tree
// position, and those memoize one instance per node — one instance shared by
// every row, each overwriting the last. The three values below are what tells
// the two apart.
const rows = [1, 2, 3];

it("mappedComponent", async (t) => {
  await snapshotCase(
    t,
    "mappedComponent",
    cs.lift((() => (
      <div>
        {(void (For), (($For) => <$For each={(cs.splice((rows)))}>
          {(__cs_row: number) => (cs.splice(cs.lift((() => <span>{"row " + __cs_row}</span>)())))}
        </$For>)(cs.splice((For))))}
      </div>
    ))()),
  );
});
