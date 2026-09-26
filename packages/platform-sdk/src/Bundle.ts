declare const BundleBrand: unique symbol;

/**
 * A bundle: a module whose default export draws a `T`, as a framework's
 * compiler made it of what the bundler answered, which a client imports and
 * runs.
 */
export type Bundle<T> = string & {
  readonly [BundleBrand]: T;
};

declare global {
  /** Evaluates a bundle, and answers with what it evaluates to. */
  function eval<T>(bundle: Bundle<T>): T;
}
