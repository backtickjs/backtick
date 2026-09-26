import { createBuiltin } from "./Builtin.js";
import type { Client } from "./Client.js";
import type { Signal, SignalOptions, State } from "./declarations.js";

/**
 * Creates a `State`, a `Signal` a script can both `get` and `set`, and the
 * foundation of Backtick's reactivity. Whatever reads it with `get` follows it
 * — a prop, a child, a `computed` — and a `set` runs those readers again and
 * nothing else. Reading is cheap and setting does the work, so a state suits
 * values read often and set less often.
 *
 * Created while a script draws, it lasts as long as that drawing.
 *
 * @param initial The value it holds until the first `set`.
 */
export const state: Client<
  <T>(initial: T, options?: SignalOptions<T>) => State<T>
> = createBuiltin("state");

/**
 * Creates a read-only `Signal` that derives its value from other signals. The
 * calculated value is memoized: `fn` runs when the computed is created and
 * again only when a signal it read changes, and every `get` reuses the result.
 * If the new result equals the previous one (`===`, or `options.equals`), the
 * computed doesn't update whatever reads it.
 *
 * Created while a script draws, it lasts as long as that drawing.
 *
 * @param fn Calculates the value from the signals it reads.
 */
export const computed: Client<
  <T>(fn: () => T, options?: SignalOptions<T>) => Signal<T>
> = createBuiltin("computed");
