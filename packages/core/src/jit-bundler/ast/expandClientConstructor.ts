import type {
  ClientConstructor,
  ClientObject,
} from "../../cs-runtime/index.js";
import type { AstExpansion } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One expansion per class, ever: a constructor only ever sees opaque
// holes, so its expansion is a function of the class alone.
const expansionByConstructor = new WeakMap<
  ClientConstructor<ClientObject>,
  AstExpansion
>();

// Runs the constructor once with one opaque hole per declared parameter
// and lowers the instance it returns; the class itself never leaves the
// host, and call sites bind the client's argument values to the holes.
export function expandClientConstructor(
  value: ClientConstructor<ClientObject>,
): AstExpansion {
  let expansion = expansionByConstructor.get(value);
  if (expansion === undefined) {
    const params = Array.from(
      { length: value.length },
      (_, position) => `$${position}`,
    );
    expansion = {
      kind: "AstExpansion",
      params,
      body: lowerSpliceable(new value(...params.map(createHole))),
    };
    expansionByConstructor.set(value, expansion);
  }
  return expansion;
}
