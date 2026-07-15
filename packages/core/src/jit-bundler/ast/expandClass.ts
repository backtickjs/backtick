import type {
  Client,
  ClientObject,
  ClientObjectConstructor,
  ClientUnknown,
} from "../../cs-runtime/index.js";
import type { AstExpansion } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The call side of `ClientObjectConstructor`: that type's `never[]`
// parameters accept any concrete class but let nothing be passed, so the
// expansion casts to this hole-taking form to invoke the constructor.
type ConstructibleClass = new (
  ...args: Client<ClientUnknown>[]
) => ClientObject;

// One expansion per class, ever: a constructor sees only opaque holes —
// never the client's live argument values — so its expansion is a function
// of the class alone. (This bakes in the constructor purity the holes
// already enforce: one reading *mutable host* state at expansion time would
// get its first expansion replayed.) Sharing the node also dedups
// downstream: the IR interns one entry per expansion node however many
// instances construct the class.
const expansionByClass = new WeakMap<ClientObjectConstructor, AstExpansion>();

// A spliced class expands to a function with holes: the constructor runs
// once with one opaque hole per declared parameter (`length`), and the
// spliceable it returns lowers into the expansion's body — the class itself
// never leaves the host. A construction compiles as a plain call of the
// slot, binding the client's argument values to the holes when it runs.
export function expandClass(
  splicedClass: ClientObjectConstructor,
): AstExpansion {
  let expansion = expansionByClass.get(splicedClass);
  if (expansion === undefined) {
    // A spliced class is always client-constructible, so past
    // `ClientObjectConstructor`'s acceptance form the value speaks the
    // call side.
    const constructible = splicedClass as ConstructibleClass;
    const params = Array.from(
      { length: constructible.length },
      (_, position) => `$${position}`,
    );
    expansion = {
      kind: "AstExpansion",
      params,
      body: lowerSpliceable(new constructible(...params.map(createHole))),
    };
    expansionByClass.set(splicedClass, expansion);
  }
  return expansion;
}
