declare const JsxModuleBrand: unique symbol;

/**
 * What the bundler answers: a JSX module whose default export draws a `T`,
 * and its source map into the host files its scripts were written in. It runs
 * once a framework's compiler has made a bundle of it. What `T` is, is what
 * the host wrote down when it bundled it; nothing in the code checks it.
 */
export interface JsxModule<T> {
  readonly code: string;
  readonly map: string;
  readonly [JsxModuleBrand]?: T;
}
