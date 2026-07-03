import type { Client } from "../index.js";

/**
 * The standard-library surface of an array inside a `cs` client script.
 */
export declare class ClientArray<T> {
  concat(...items: Client<T>[]): Client<T[]>;
  includes(value: Client<T>): Client<boolean>;
  indexOf(value: Client<T>): Client<number>;
  join(separator?: Client<string>): Client<string>;
  slice(start?: Client<number>, end?: Client<number>): Client<T[]>;
}
