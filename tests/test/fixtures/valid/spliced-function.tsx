import { cs } from "@backtickjs/core";
import type { Spliceable } from "@backtickjs/core";

// A host function has no data form — client code is written in `cs`...` — so
// the bundler expands it rather than carrying it: run once against one opaque
// hole per parameter, and what it answered is what crosses.
//
// Nothing here is about components. A component is a function of one argument
// it reads fields off, which is why a tag written inside a script works at all.
//
// The cast is because `Spliceable` does not admit a function yet: the rule is
// the bundler's, and the type has still to catch up — until it does, a script
// cannot call one by name either.
export default cs`() => ${((n: never) => n) as unknown as Spliceable}`;
