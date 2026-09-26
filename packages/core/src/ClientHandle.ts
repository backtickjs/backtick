declare const ClientHandleBrand: unique symbol;

/**
 * Something the client owns, and that nothing here reads into.
 *
 * A script may hold one and hand it back and nothing else: what it is made of
 * is the client's, and two clients need not agree on that to agree on this.
 * An adapter's drawing is one, and so is a platform global like `window`.
 */
export interface ClientHandle {
  readonly [ClientHandleBrand]: never;
}
