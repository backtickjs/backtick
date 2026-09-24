/**
 * What a `cs` template compiles to: its syntax and where it was written.
 *
 * The compiler writes one of these and the bundler reads it, so the shape is
 * neither end's. A script's body is ESTree as the source wrote it, with JSX
 * and splices in it, and the rules both ends read it by are here.
 *
 * `cs` is here too: what a template is written as, and what it compiles to,
 * are one thing said at two moments.
 *
 * What a script may *hold* is not here. `ClientValue` and the rest are
 * `@backtickjs/platform-sdk`, which is generated from a schema; this names one of
 * them, `Spliceable`, to say what a host may put in a hole.
 */
export {
  create,
  type ClientScript,
  isClientScript,
  type Metadata,
  type MetadataSplice,
} from "./ClientScript.js";
export type { Splice } from "./Splice.js";
export { isComponentTag } from "./isComponentTag.js";
export { FRAGMENT_TAG, isFragmentTag } from "./isFragmentTag.js";
export { jsxText } from "./jsxText.js";

// The tag itself, and how a script reads what it is handed.
export { cs } from "./cs.js";
