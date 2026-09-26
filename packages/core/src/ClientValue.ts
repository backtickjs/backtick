import type { ClientHandle } from "./ClientHandle.js";
import type { ClientFunction } from "./Spliceable.js";

/**
 * What may cross between a host and a client: data, a function, or a handle to
 * something the client owns.
 */
export type ClientValue =
  | null
  | undefined
  | number
  | boolean
  | string
  | { readonly [key: string]: ClientValue }
  | readonly ClientValue[]
  | ClientFunction
  | ClientHandle;
