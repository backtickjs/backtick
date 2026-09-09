import { cs, type Client } from "@backtickjs/core";

// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
export default cs.lift((() => {
    const __cs_base = cs.const(10);
    return cs.const(cs.splice(outer(cs.lift(cs.const(__cs_base)))) satisfies typeof cs.ClientUnknown);
})());

function outer(inner: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_base = cs.const(1);
    return cs.const(__cs_base + (cs.splice(middle(inner)) satisfies typeof cs.ClientUnknown));
})());
}

function middle(inner: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_base = cs.const(2);
    return cs.const(__cs_base * (cs.splice((inner)) satisfies typeof cs.ClientUnknown));
})());
}
