declare const ClientBrand: unique symbol;

/**
 * A client script, as the host holds it: a value the client computes as a
 * `T`. The host can't read the `T`, which doesn't exist until the client runs
 * the script; it can splice the script into another, pass it around, and
 * return it from a server component.
 */
export interface Client<T> {
  readonly [ClientBrand]: T;
}
