import { cs } from "@backtickjs/core";

// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.lift(7);

export default cs.lift({ a: cs.lower(leaf), b: cs.lower(leaf) });
