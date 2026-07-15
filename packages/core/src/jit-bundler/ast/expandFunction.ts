import type { Spliceable } from "../../cs-runtime/index.js";
import type { AstExpansion } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// `never[]` parameters accept any concrete signature (parameters check
// contravariantly); the invocation casts to the call side.
type Expandable = abstract new (...args: never[]) => unknown;

type Constructible = new (...args: unknown[]) => Spliceable;

// One expansion per function, ever: it only ever sees opaque holes, so its
// expansion is a function of the spliced value alone.
const expansionByFunction = new WeakMap<Expandable, AstExpansion>();

// Runs the function once with one opaque hole per declared parameter and
// lowers the spliceable it returns; the function itself never leaves the
// host, and call sites bind the client's argument values to the holes.
export function expandFunction(spliced: Expandable): AstExpansion {
  let expansion = expansionByFunction.get(spliced);
  if (expansion === undefined) {
    const constructible = spliced as Constructible;
    const params = Array.from(
      { length: constructible.length },
      (_, position) => `$${position}`,
    );
    expansion = {
      kind: "AstExpansion",
      params,
      body: lowerSpliceable(new constructible(...params.map(createHole))),
    };
    expansionByFunction.set(spliced, expansion);
  }
  return expansion;
}
