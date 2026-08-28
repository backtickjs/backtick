/**
 * An editor beside what it draws.
 *
 * Two halves that have to agree and so are kept together: a component a page
 * draws, and the script that fills it. What the page owes them is the third
 * thing — the assets `@backtickjs/playground/build` makes, which is where the
 * compiler and the already-compiled example are.
 */
export { Playground } from "./Playground.js";
export type { Compiled, Complaint } from "./compile/compile.js";
export type { Source } from "./Source.js";
export * as theme from "./theme.js";
