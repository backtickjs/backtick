/**
 * What the bundler answers: a JSX module whose default export draws what the
 * value drew, and its source map into the host files its scripts were written
 * in. It runs once a framework's compiler has made a bundle of it.
 */
export interface JsxModule {
  readonly code: string;
  readonly map: string;
}
