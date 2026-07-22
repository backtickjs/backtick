import { cs, type Client } from "@backtickjs/core";

// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs: Client<number>): Client<number> {
  return cs.lift(cs.value(cs.splice((lhs)) + 2));
}

export default cs.lift(cs.value((() => {
    const __cs_foo$ = cs.value(1);
    return cs.splice(add(cs.lift(cs.value(__cs_foo$))));
})()));
