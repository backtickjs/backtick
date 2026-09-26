import { createBuiltin, type Client } from "@backtickjs/platform-sdk";

/**
 * Registers a cleanup function on the current scope: the drawing the calling
 * script belongs to, or the `computed` it is called in. The cleanup runs when
 * that scope is disposed, as when the drawing is removed, or refreshed, as
 * when the computed calculates again.
 *
 * Called from a handler, there is no current scope, and the cleanup never
 * runs.
 *
 * @param fn The cleanup to run.
 */
export const onCleanup: Client<(fn: () => void) => void> =
  createBuiltin("onCleanup");

/**
 * Runs something once, after the drawing the calling script belongs to is in
 * place — the moment to start a timer or listen on the window.
 *
 * Called from a script that draws, as a statement before its `return`. Called
 * from a handler, the drawing is already in place and it runs straight away.
 *
 * @param fn What to run once the drawing is in place.
 */
export const onMount: Client<(fn: () => void) => void> =
  createBuiltin("onMount");
