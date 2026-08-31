import { cs } from "@backtickjs/core";

// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
export default cs.lift(cs.const({ "#": "value" }));
