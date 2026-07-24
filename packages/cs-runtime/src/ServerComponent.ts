import type { JsxElement } from "./JsxElement.js";

/**
 * A component built from other components rather than naming one. It runs on
 * the server while bundling — free to await — and leaves no trace: the payload
 * carries only the client components it resolves to.
 */
export type ServerComponent<P extends object = object> = (
  props: P,
) => Promise<JsxElement>;
