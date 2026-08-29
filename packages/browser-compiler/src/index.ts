/**
 * Backtick's compiler, whole, in a browser.
 *
 * The parser is a dependency of this package rather than a file somebody
 * publishes beside it: what `build.mjs` emits is one script holding TypeScript,
 * the transform and the pipeline, so a page that wants a compiler copies a
 * directory and points a frame at it.
 *
 * It has to be a frame, or something else with a policy of its own. Running a
 * compiled module is `new Function`, which a page saying `default-src 'self'`
 * may not do — and a content policy is per-document, so a document is the unit
 * that can be allowed to evaluate while the page around it is not.
 */
export { compile } from "./compile.js";
export { host } from "./host.js";
export type { Compiled, Complaint, Host, Source } from "./compile.js";
export type { Answered, Asked, Ready } from "./entry.js";
