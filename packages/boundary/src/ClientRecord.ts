import type { ClientValue } from "./ClientValue.js";

/**
 * A record on the client: string keys, and a client value under each.
 *
 * The mirror of `ServerRecord`. A member may be a function, which is what
 * separates the two: behaviour is the client's to have, and a server writes
 * a `Client<T>` where it wants some.
 */
export interface ClientRecord {
  readonly [key: string]: ClientValue;
}
