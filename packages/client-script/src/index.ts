/**
 * What a `cs` template compiles to: its code as a module, what it is handed,
 * and where it was written.
 *
 * The compiler writes one of these and the bundler reads it, so the shape is
 * neither end's.
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
  type Param,
  type ScriptModule,
} from "./ClientScript.js";
export { isComponentTag } from "./isComponentTag.js";
export { FRAGMENT_TAG, isFragmentTag } from "./isFragmentTag.js";
export { jsxText } from "./jsxText.js";

// The tag itself, and how a script reads what it is handed.
export { cs } from "./cs.js";
