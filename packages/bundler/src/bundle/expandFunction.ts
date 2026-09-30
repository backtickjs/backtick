import type { Spliceable } from "@backtickjs/core";
import { createHole, type HostParam } from "./holes.js";

// A host function, run against a hole per parameter: its parameters, and what
// it answered with the holes wherever they surfaced.
export interface Expansion {
  readonly params: readonly HostParam[];
  readonly returned: Spliceable;
}

// One expansion per function per bundle: it only ever sees holes, so within a
// bundle what it answers with is a function of the function alone — however
// many calls name it, and whichever arguments each of them writes. Not across
// bundles: what its host code computes (a random number, the request's user)
// is the bundle's, and the next bundle computes its own.
export type FunctionExpansions = WeakMap<object, Promise<Expansion>>;

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
  value: (...args: never[]) => unknown,
  expansions: FunctionExpansions,
): Promise<Expansion> {
  const shared = expansions.get(value);
  if (shared) {
    return shared;
  }
  const expansion = buildExpansion(value);
  expansions.set(value, expansion);
  return expansion;
}

async function buildExpansion(
  value: (...args: never[]) => unknown,
): Promise<Expansion> {
  // Fresh objects, so a hole says which expansion it belongs to by identity:
  // nothing is counted, and nothing outlives the bundle.
  const params = Array.from(
    { length: value.length },
    (_, at): HostParam => ({ name: `$arg${at}` }),
  );
  const holes = params.map((param) => createHole(param));
  const returned = value(...(holes as never[])) as
    | Spliceable
    | Promise<Spliceable>;
  return { params, returned: await returned };
}
