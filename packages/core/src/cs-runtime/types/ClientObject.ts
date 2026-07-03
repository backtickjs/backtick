import type { Client } from "../index.js";

/**
 * The standard-library surface of an object inside a `cs` client script.
 */
export declare class ClientObject<T extends object> {
  hasOwnProperty(key: Client<keyof T>): Client<boolean>;
  toString(): Client<string>;
}
