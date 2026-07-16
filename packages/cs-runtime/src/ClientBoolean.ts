/**
 * The client boolean API: what a script may reach on an autoboxed boolean.
 */
export interface ClientBoolean {
  /** Returns the primitive value of the specified object. */
  valueOf(): boolean;
}
