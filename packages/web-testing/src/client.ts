import type { Bundle, ClientUnknown } from "@backtickjs/core";

/** A bundle behind a function, run as a script runs one: with `eval`. */
export function runOf<T extends ClientUnknown>(code: Bundle<T>): () => T {
  return () => (0, eval)(code);
}
