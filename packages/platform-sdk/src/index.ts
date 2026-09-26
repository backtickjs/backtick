/**
 * What a host hands a client, and how a host language spells a script standing
 * in for a value (`Client`).
 */
export type { Client } from "./Client.js";
export type { ClientHandle } from "./ClientHandle.js";
export type { ClientUnknown } from "./ClientUnknown.js";
export type { ClientValue } from "./ClientValue.js";
export type { ClientFunction, Spliceable, Spliced } from "./Spliceable.js";
export {
  createImport,
  isClientImport,
  type ClientImport,
} from "./ClientImport.js";
