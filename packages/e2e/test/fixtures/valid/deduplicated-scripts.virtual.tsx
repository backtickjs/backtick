import { cs } from "@backtickjs/core";

// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.lift(cs.value(7));

export default cs.lift(cs.value({ a: cs.splice((leaf)), b: cs.splice((leaf)) }));
