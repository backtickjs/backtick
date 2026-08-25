import { createBuiltin } from "./Builtin.js";
import type { Client } from "./Client.js";
import type { ClientFunction, State } from "./schema.generated.js";

/**
 * Storage a script declares, as the value it is imported and spliced as:
 * `$state(0)`, where a name written bare would be `state(0)`.
 *
 * What a cell holds is the initial widened, so `$state(0)` takes a `1` later.
 * The unbound arm is what widens it: inference through a constraint holding
 * primitives keeps the literal — `0` rather than `number` — where without one
 * TypeScript widens as it does for a `let`, an enum member to its enum
 * included. A function takes the bound arm instead, because there the
 * constraint is what widens: it contextually types the body, so `() => 0`
 * arrives as `() => number` rather than answering with a literal forever.
 */
export const state: Client<{
  <T extends ClientFunction>(initial: T): State<T>;
  <T>(initial: T): State<T>;
}> = createBuiltin("state");
