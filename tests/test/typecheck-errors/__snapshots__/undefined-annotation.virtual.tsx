import { cs } from "@backtickjs/core";

// A host alias smuggles `undefined` past the syntactic keyword ban; it is
// rejected only where a use meets a type without `undefined`.
//
// First use and not the signature: `ClientFunction` stands over `never`
// parameters so that every client function is one, which is what lets the
// schema declare it. So a parameter annotation is not checked where it is
// written, and one that is never used goes unnoticed — the diagnostics below
// are the uses, and there is deliberately none for the arrow itself.
type Maybe = string | undefined;

const stored = cs.lift((() => (__cs_x: Maybe) => {
  const __cs_y = __cs_x;
  return 1;
})());

const written = cs.lift((() => (__cs_x: Maybe) => {
  let __cs_y = "";
  // @ts-expect-error: Type 'Maybe' is not assignable to type 'string'.
  __cs_y = __cs_x;
  return 1;
})());
