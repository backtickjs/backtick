import type { Client, ClientValue } from "@backtickjs/language-schema";

/**
 * What may stand in a children position: one child, a script standing in for
 * one, or a list of either. `T` is what a child may be, which the target says.
 *
 * A script stands in for one child and never for a list, because a client
 * handed a finished list cannot tell which member is which. Lists are written
 * with `<For />`.
 */
export type Children<T extends ClientValue> = T | Client<T> | Children<T>[];
