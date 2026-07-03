import type { Client } from "../index.js";

/**
 * The standard-library surface of a `number` inside a `cs` client script.
 */
export declare class ClientNumber {
  toFixed(digits?: Client<number>): Client<string>;
  toPrecision(precision?: Client<number>): Client<string>;
  toString(radix?: Client<number>): Client<string>;
}
