import { cs, type Client } from "@backtickjs/core";

// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((lhs)) satisfies import("@backtickjs/core").ClientUnknown) + 2));
}

export default cs.lift((() => {
    const __cs_foo$ = cs.const(1);
    return cs.const(cs.splice(add(cs.lift(cs.const(__cs_foo$)))) satisfies import("@backtickjs/core").ClientUnknown);
})());
