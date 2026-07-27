import { cs, type Client } from "@backtickjs/core";

// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function wrap(fragment: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_before = cs.const(1);
    const __cs_spliced = cs.const(cs.splice((fragment)));
    const __cs_after = cs.const(2);
    return cs.const(__cs_before + __cs_spliced + __cs_after);
})());
}

export default cs.lift(cs.const(cs.splice(wrap(cs.lift(cs.const(10)))) + cs.splice(wrap(cs.lift(cs.const(20))))));
