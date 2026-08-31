import { cs, type Client } from "@backtickjs/core";

// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new script,
// written at its own location outside the enclosing one, so nothing about it
// looks lexical. `same` hands back the template it was given: the script that
// lands at the hole *is* written inside the enclosing script's span, and still
// can't be read off that span, because only running `same` says it goes there.
// Anything that resolves a hole by comparing spans gets this one wrong.
function wrap(start: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_outer = cs.const(cs.splice((start)) satisfies import("@backtickjs/core").ClientUnknown);
    return cs.const(cs.splice(foo(cs.lift((() => {
    const __cs_middle = cs.const(10);
    return cs.const(__cs_middle + (cs.splice(same(cs.lift(cs.const(__cs_outer)))) satisfies import("@backtickjs/core").ClientUnknown));
})()))) satisfies import("@backtickjs/core").ClientUnknown);
})());
}

function foo(start: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((start)) satisfies import("@backtickjs/core").ClientUnknown) + 1));
}

function same(script: Client<number>): Client<number> {
  return script;
}

export default cs.lift(cs.const((cs.splice(wrap(cs.lift(cs.const(1)))) satisfies import("@backtickjs/core").ClientUnknown) + (cs.splice(wrap(cs.lift(cs.const(2)))) satisfies import("@backtickjs/core").ClientUnknown)));
