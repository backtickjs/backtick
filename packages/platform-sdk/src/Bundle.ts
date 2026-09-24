import type { ClientUnknown } from "./declarations.generated.js";

declare const BundleBrand: unique symbol;

/**
 * A bundle: one JavaScript expression that evaluates to a `T`, which a client
 * runs with `eval`. What `T` is, is what the host wrote down when it bundled
 * it; nothing in the string checks it.
 */
export type Bundle<T extends ClientUnknown> = string & {
  readonly [BundleBrand]: T;
};

declare global {
  /** Evaluates a bundle, and answers with what it evaluates to. */
  function eval<T extends ClientUnknown>(bundle: Bundle<T>): T;
}
