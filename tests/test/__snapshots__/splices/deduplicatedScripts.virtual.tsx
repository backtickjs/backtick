import { cs } from "@backtickjs/core";

// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.lift(cs.const(7));

const deduplicatedScripts = cs.lift(cs.const({ a: cs.splice((leaf)) satisfies typeof cs.ClientUnknown, b: cs.splice((leaf)) satisfies typeof cs.ClientUnknown }));
