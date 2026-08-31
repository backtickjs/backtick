import { cs } from "@backtickjs/core";

// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.lift(cs.const(7));

export default cs.lift(cs.const({ a: cs.splice((leaf)) satisfies import("@backtickjs/core").ClientUnknown, b: cs.splice((leaf)) satisfies import("@backtickjs/core").ClientUnknown }));
