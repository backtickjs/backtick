import type { Spliceable } from "@backtickjs/platform-sdk";

/**
 * What a prop admits: what the server wrote, or a script standing in for it.
 *
 * `SplicesTo<T>` drops away where a host has no way to write a `T` — a
 * function is the case, since client behaviour is `cs`...` — so a handler prop
 * is left with the script arm alone.
 */
export type Prop<T> = Spliceable<T>;
