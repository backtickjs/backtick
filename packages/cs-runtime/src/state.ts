import type { ClientValue } from "./ClientValue.js";

/**
 * Storage a script may read but not replace.
 *
 * What a position is in a list is one of these, and so is a cell handed to a
 * component that only displays it: the signature says which way the value
 * travels, and a `State` goes wherever one of these is wanted.
 */
export interface ReadonlyState<T extends ClientValue> {
  read(): T;
}

/**
 * A cell as a script reads it.
 *
 * Declaring one is not here: `state()` lives in `@backtickjs/jit-bundler`,
 * because declaring happens while a component is being expanded and has to know
 * which instance is running. This is the half that reaches the client.
 */
export interface State<T extends ClientValue> extends ReadonlyState<T> {
  write(value: T): void;
  update(updater: (value: T) => T): void;
}
