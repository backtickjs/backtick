import { cs, type Client } from "@backtickjs/core";

// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs: Client<number>): Client<number> {
  return cs.liftValue(cs.spliceValue((lhs)) + 2);
}

export default cs.liftValue((() => {
    const __cs_foo$ = 1;
    return cs.spliceValue(add(cs.liftValue(__cs_foo$)));
})());
