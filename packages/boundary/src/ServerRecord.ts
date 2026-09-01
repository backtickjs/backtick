import type { ServerValue } from "./ServerValue.js";

/**
 * A record on the server: string keys, and a server value under each.
 *
 * Written out rather than left inline in `ServerValue`, so what a server may
 * hand over has a name a reader and a refusal can both use.
 */
export interface ServerRecord {
  readonly [key: string]: ServerValue;
}
