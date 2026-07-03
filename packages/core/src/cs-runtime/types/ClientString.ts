import type { Client } from "../index.js";

/**
 * The standard-library surface of a `string` inside a `cs` client script.
 */
export declare class ClientString {
  concat(...strings: Client<string>[]): Client<string>;
  toUpperCase(): Client<string>;
  toLowerCase(): Client<string>;
}
