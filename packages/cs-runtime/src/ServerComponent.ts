import type { JsxElement } from "./JsxElement.js";

/**
 * A component built from other components rather than naming one. It runs on
 * the server while bundling — free to await — and leaves no *named* trace: the
 * payload carries only the client components it resolves to, never this one.
 *
 * The trace it does leave is structural. Each invocation becomes a tree entry,
 * because that entry is the instance: it owns the state the component declares,
 * and it is what a re-render re-evaluates.
 */
export type ServerComponent<P extends object = object> = (
  props: P,
) => Promise<JsxElement>;
