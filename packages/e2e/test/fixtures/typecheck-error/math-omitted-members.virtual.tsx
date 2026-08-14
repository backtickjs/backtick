import { cs } from "@backtickjs/core";

// `Math` is JavaScript's own, as the standard library declares it through
// ES2015 — so what is left out is what came after it. `f16round` is ES2025's.
//
// The one place the signatures depart is `min`/`max`, and that departure is
// not here: they take the library's rest parameter, and an empty call is
// refused by the client rather than by the typechecker. See `globals.test.ts`.
export const halved = cs.lift(cs.const(cs.receiver(Math).f16round(1)));
