import type { ClientUnknown } from "./ClientUnknown.js";

declare const client: unique symbol;
export interface Client<T extends ClientUnknown> {
  readonly [client]: T;
}
