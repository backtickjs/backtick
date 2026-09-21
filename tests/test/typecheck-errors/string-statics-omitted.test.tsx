import { cs } from "@backtickjs/core";

// `String` is reachable only as the schema fixes it: `fromCharCode` and
// `fromCodePoint`, and nothing else. `raw` takes a template, which a client
// script can't hold.
// @ts-expect-error: Property 'raw' does not exist on type 'StringConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
export const written = cs`String.raw({ raw: ["a"] })`;
