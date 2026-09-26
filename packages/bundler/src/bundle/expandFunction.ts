import type { Client, Spliceable } from "@backtickjs/platform-sdk";
import { createHole } from "./holes.js";

// A host function, run against a hole per parameter: the parameter names, and
// what it answered with the holes wherever they surfaced.
export interface Expansion {
  readonly params: readonly string[];
  readonly returned: Spliceable;
}

// One expansion per function, ever: it only ever sees holes, so what it answers
// with is a function of the function alone — however many calls name it, and
// whichever arguments each of them writes.
const expansionByFunction = new WeakMap<object, Promise<Expansion>>();

/**
 * A spliced host function, expanded: run once against one opaque hole per
 * parameter, and what it answered rendered with a reference to that hole
 * wherever one surfaced.
 *
 * The function itself never leaves the host. What crosses is what it answered,
 * and the call site binds each hole to the expression written there when the
 * client evaluates the call.
 *
 * A component is this and nothing more: one parameter it reads fields off, so
 * the holes are `$arg0.title` and the like, and the tag is a call.
 */
export function expandFunction(
  value: (...args: Client<never>[]) => unknown,
): Promise<Expansion> {
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
): Promise<Expansion> {
  const params = Array.from({ length: value.length }, (_, at) => `$arg${at}`);
  const holes = params.map(createHole);
  const returned = value(...holes) as Spliceable | Promise<Spliceable>;
  return { params, returned: await returned };
}
