/**
 * A module as the build passes it along: its code, and its source map into
 * the host files its scripts were written in. What the bundler prints is JSX;
 * a framework's compile step, as a plugin, answers the framework's own code.
 */
export interface JsxModule {
  readonly code: string;
  readonly map: string;
}
