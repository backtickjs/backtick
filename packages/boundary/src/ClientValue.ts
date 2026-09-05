import type { BacktickElement } from "./BacktickElement.js";
import type { ClientUnknown } from "./ClientUnknown.js";

/**
 * What may cross the host/client boundary, and nothing about what a script
 * may say.
 *
 * Written by hand here rather than declared in a schema and generated into one:
 * this is the format's, not any one layer's. Every schema references it, every
 * client answers in it, and the runtime holds it — so a layer that happened to
 * declare it would be a layer everything else had to reach through.
 */

declare const ClientHandleBrand: unique symbol;

/**
 * Represents a handle to an object owned and managed by the client. The handle
 * can be referenced and passed in client script.
 */
export interface ClientHandle {
  readonly [ClientHandleBrand]: never;
}

export type ClientFunction = (...args: never[]) => ClientUnknown;

/**
 * What a value is on the client: data, a function, or a handle to an object
 * owned and managed by the client.
 */
export type ClientValue =
  | null
  | undefined
  | number
  | boolean
  | string
  | { readonly [key: string]: ClientValue }
  | readonly ClientValue[]
  | BacktickElement
  | ClientFunction
  | ClientHandle;
