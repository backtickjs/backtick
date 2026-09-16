import { cs } from "@backtickjs/core";

// `Math` is JavaScript's own, as the standard library declares it through
// ES2015 — so what is left out is what came after it. `f16round` is ES2025's.
//
// The one place the signatures depart is `min`/`max`, and that departure is
// not here: they take the library's rest parameter, and an empty call is
// refused by the client rather than by the typechecker. See `globals.test.ts`.
// @ts-expect-error: Property 'f16round' does not exist on type 'Math'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2025' or later.
export const halved = cs`Math.f16round(1)`;
