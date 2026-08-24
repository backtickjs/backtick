import { createBuiltin } from "./Builtin.js";
import type { Client } from "./Client.js";
import type { ClientValue, State } from "./schema.generated.js";
import type { Widen } from "./Widen.js";

/**
 * Storage a script declares, as the value it is imported and spliced as:
 * `$state(0)`, where a name written bare would be `state(0)`.
 *
 * `const T` and `Widen` are what make the initial widen — `$state(0)` is a
 * `State<number>`, so writing `1` to it is allowed — and they are written here
 * rather than in the schema because the schema declares what the client answers
 * for, and a client answers the same way whichever type the host inferred.
 */
export const state: Client<
  <const T extends ClientValue>(initial: T) => State<Widen<T>>
> = createBuiltin("state");
