import { cs } from "@backtickjs/core";

// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
export default cs.lift(cs.const(cs.splice({ "#": "value" }) satisfies import("@backtickjs/core").ClientUnknown));
