import type { Client, ClientValue } from "@backtickjs/core-schema";

/**
 * What goes in a children position, one arm per way of writing it: one child,
 * a script standing in for one, or several. What a child may be is `T`, which
 * the target decides.
 *
 * A script stands in for one child and never for a list — a client handed a
 * finished list cannot tell which member is which, so `<For />` is how a list
 * is written.
 */
export type Children<T extends ClientValue> = T | Client<T> | Children<T>[];
