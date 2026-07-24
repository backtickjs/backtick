import type { ClientConstructor } from "@backtickjs/cs-runtime";
import type { AstExpansion } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One expansion per class, ever: a constructor only ever sees opaque
// holes, so its expansion is a function of the class alone.
const expansionByConstructor = new WeakMap<
  ClientConstructor,
  Promise<AstExpansion>
>();

// Runs the constructor once with one opaque hole per declared parameter
// and lowers the instance it returns; the class itself never leaves the
// host, and call sites bind the client's argument values to the holes.
export function expandClientConstructor(
  value: ClientConstructor,
): Promise<AstExpansion> {
  const shared = expansionByConstructor.get(value);
  if (shared) {
    return shared;
  }
  // memoized before the first await, so one class expands once even if two
  // constructions reach it concurrently
  const expansion = buildExpansion(value);
  expansionByConstructor.set(value, expansion);
  return expansion;
}

async function buildExpansion(value: ClientConstructor): Promise<AstExpansion> {
  const params = Array.from(
    { length: value.length },
    (_, position) => `$${position}`,
  );
  return {
    kind: "AstExpansion",
    params,
    body: await lowerSpliceable(
      new value(...params.map(createHole)),
      "ClientValue",
    ),
  };
}
