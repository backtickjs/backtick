/**
 * Backtick: the `cs` tag, what a host may hand a client, and what a template
 * compiles to.
 */

// The tag, and how a host language spells a script standing in for a value.
export { cs } from "./cs.js";
export type { Client } from "./Client.js";

// What a host may hand a client: data, a script, a handle to something the
// client owns, or an export of a module the client provides.
export type { ClientHandle } from "./ClientHandle.js";
export type { ClientUnknown } from "./ClientUnknown.js";
export type { ClientValue } from "./ClientValue.js";
export type { ClientFunction, Spliceable, Spliced } from "./Spliceable.js";
export {
  createImport,
  isClientImport,
  type ClientImport,
} from "./ClientImport.js";

// What a template compiles to: the compiler writes one and the bundler reads
// it, so the shape is neither end's.
export {
  create,
  type ClientScript,
  isClientScript,
  type Metadata,
  type Param,
} from "./ClientScript.js";
