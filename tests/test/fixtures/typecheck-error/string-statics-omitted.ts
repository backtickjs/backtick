import { cs } from "@backtickjs/core";

// `String` is reachable only as the schema fixes it: `fromCodePoint`, and
// nothing else. `fromCharCode` predates it and `raw` takes a template.
export const written = cs`String.fromCharCode(72)`;
