import type { ClientValue } from "./ClientValue.js";

/**
 * A cell as a script reads it.
 *
 * Declaring one is not here: `state()` lives in `@backtickjs/jit-bundler`,
 * because declaring happens while a component is being expanded and has to know
 * which instance is running. This is the half that reaches the client.
 */
export interface State<T extends ClientValue> {
  read(): T;
  write(value: T): void;
  update(updater: (value: T) => T): void;
}
