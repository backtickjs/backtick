import { cs } from "@backtickjs/core";

// `#` is the bundle's one reserved key — the discriminant of every node — so a
// plain data object can't carry it.
const reservedKey = cs.lift(cs.const(() => cs.splice({ "#": "value" }) satisfies typeof cs.ClientUnknown));
