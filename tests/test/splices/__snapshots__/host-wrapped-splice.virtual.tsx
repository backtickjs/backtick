import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new
// script, written at its own location outside the enclosing one, so nothing
// about it looks lexical. `same` hands back the template it was given: the
// script that lands at the hole *is* written inside the enclosing script's
// span, and still can't be read off that span, because only running `same` says
// it goes there. Anything that resolves a hole by comparing spans gets this one
// wrong.
function wrap(start: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_outer = (cs.splice((start)) satisfies typeof cs.ClientUnknown);
    return (cs.splice(foo(cs.lift((() => {
    const __cs_middle = 10;
    return __cs_middle + (cs.splice(same(cs.lift(__cs_outer))) satisfies typeof cs.ClientUnknown);
})()))) satisfies typeof cs.ClientUnknown);
})());
}

function foo(start: Client<number>): Client<number> {
  return cs.lift((cs.splice((start)) satisfies typeof cs.ClientUnknown) + 1);
}

function same(script: Client<number>): Client<number> {
  return script;
}

it("hostWrappedSplice", async (t) => {
  await snapshotCase(
    t,
    "hostWrappedSplice",
    cs.lift((cs.splice(wrap(cs.lift(1))) satisfies typeof cs.ClientUnknown) + (cs.splice(wrap(cs.lift(2))) satisfies typeof cs.ClientUnknown)),
  );
});
