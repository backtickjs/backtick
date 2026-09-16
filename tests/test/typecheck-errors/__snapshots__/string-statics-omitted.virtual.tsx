import { cs } from "@backtickjs/core";

// `String` is reachable only as the schema fixes it: `fromCodePoint`, and
// nothing else. `fromCharCode` predates it and `raw` takes a template.
// @ts-expect-error: Property 'fromCharCode' does not exist on type 'StringConstructor'.
export const written = cs.lift(cs.const(cs.receiver(String).fromCharCode(72)));
