import type { ClientValue, Spliceable } from "@backtickjs/language";

/**
 * What a prop admits: what the server wrote, or a script standing in for it.
 *
 * `Spliceable<T>` said at the narrower bound, because a prop is not an action:
 * `SplicesTo<T>` drops away where a host has no way to write a `T` — a
 * function is the case, since client behaviour is `cs`...` — so a handler prop
 * is left with the script arm alone.
 */
export type Prop<T extends ClientValue> = Spliceable<T>;
