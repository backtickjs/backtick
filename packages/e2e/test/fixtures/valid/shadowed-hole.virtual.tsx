import { cs, type Client } from "@backtickjs/core";

// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. Only a
// binding an entry *captures* ever needed a distinct name, and those now live in
// `$env` where they cannot collide with a local at all.
function wrap(fragment: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_total = cs.const(1);
    {
        const __cs_total = cs.const(2);
        return cs.const(__cs_total + cs.splice((fragment)));
    }
})());
}

export default cs.lift(cs.const(cs.splice(wrap(cs.lift(cs.const(10)))) + cs.splice(wrap(cs.lift(cs.const(20))))));
