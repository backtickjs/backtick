import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, type Client } from "@backtickjs/core";

// A fragment written under the outer `total`, carried by host code into a hole
// inside a block that shadows it.
//
// Refused. The binding is still in scope there, and the bundler could reach it
// by renaming the inner one — which is what it used to do, quietly returning 5
// where the fragment meant 4. But no JavaScript can name a shadowed binding
// from inside the scope that shadows it, and a bundle should not be able to say
// what its source cannot. The behaviour itself is ordinary — a closure written
// in the outer scope and called in the inner does exactly this — so the fix is
// to splice the fragment where its binding is not shadowed.
let carried: Client<number> | undefined;

const keep = (fragment: Client<number>): Client<number> => {
  carried = fragment;
  return fragment;
};

const again = (): Client<number> => {
  if (carried === undefined) {
    throw new Error("the first hole runs first");
  }
  return carried;
};

it("refuses a capture spliced where it is shadowed", async () => {
  await assert.rejects(
    bundler.run(cs.lift((() => {
    const __cs_total = cs.const(1);
    const __cs_first = cs.const(cs.splice(keep(cs.lift(cs.const(__cs_total)))) satisfies typeof cs.ClientUnknown);
    {
        const __cs_total = cs.const(2);
        return cs.const(__cs_first + __cs_total + (cs.splice(again()) satisfies typeof cs.ClientUnknown));
    }
})())),
    {
      message:
        "Can't thread the capture `total`: nothing encloses this reference to supply it. A fragment carries the bindings it was written under, so this is also what happens when one is spliced somewhere another `total` shadows it: the binding is still there, but no longer reachable by name, and naming it anyway would mean emitting what the source couldn't say.",
    },
  );
});
