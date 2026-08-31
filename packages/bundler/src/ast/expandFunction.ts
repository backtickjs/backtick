import type { Client, Spliceable } from "@backtickjs/boundary";
import type { Ast, AstExpansion } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One expansion per function, ever: it only ever sees holes, so what it answers
// with is a function of the function alone — however many calls name it, and
// whichever arguments each of them writes.
const expansionByFunction = new WeakMap<object, Promise<AstExpansion>>();

/**
 * A spliced host function, expanded: run once against one opaque hole per
 * parameter, and what it answered lowered with a reference to that hole
 * wherever one surfaced.
 *
 * The function itself never leaves the host. What crosses is what it answered,
 * and the call site binds each hole to the expression written there when the
 * client evaluates the call.
 *
 * A component is this and nothing more: one parameter it reads fields off, so
 * the holes are `$0.title` and the like, and the tag is a call.
 */
export function expandFunction(
  value: (...args: Client<never>[]) => unknown,
): Promise<AstExpansion> {
  const shared = expansionByFunction.get(value);
  if (shared) {
    return shared;
  }
  const expansion = buildExpansion(value);
  expansionByFunction.set(value, expansion);
  return expansion;
}

async function buildExpansion(
  value: (...args: Client<never>[]) => unknown,
): Promise<AstExpansion> {
  const params = Array.from({ length: value.length }, (_, at) => `$${at}`);
  const holes = params.map(createHole);
  const returned = value(...holes) as Spliceable | Promise<Spliceable>;
  const answered = returned instanceof Promise ? await returned : returned;
  const body: Ast = await lowerSpliceable(answered, "ClientValue");
  return { kind: "AstExpansion", params, body };
}
