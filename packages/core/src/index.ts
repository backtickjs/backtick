/**
 * Backtick: the `cs` tag, what a host may hand a client, and what a template
 * compiles to.
 */

// The tag, and how a host language spells a script standing in for a value;
// a script as one value for the bundle.
export { cs } from "./cs.js";
export type { Client } from "./Client.js";
export { once } from "./once.js";

// What a host may hand a client: data, a script, or an export of a module the
// client provides.
export type { Spliceable, SplicesAs, Spliced } from "./Spliceable.js";
export {
  createImport,
  isClientImport,
  type ClientImport,
} from "./ClientImport.js";
// A bundle's code, typed by what it runs to, and running one on the client
// as this one was.
export type { Bundle } from "./Bundle.js";
export { isClientRun, run, type ClientRun } from "./run.js";

// A drawing as a host builds one: what an adapter's JSX runtime makes, and
// what the bundler expands.
export {
  createJsxElement,
  isJsxElement,
  type JsxElement,
  type JsxElementOf,
  type JsxElementTypeOf,
} from "./JsxElement.js";

// What a template compiles to: the compiler writes one and the bundler reads
// it, so the shape is neither end's.
export {
  create,
  type ClientModule,
  type ClientScript,
  isClientScript,
  type Param,
} from "./ClientScript.js";
