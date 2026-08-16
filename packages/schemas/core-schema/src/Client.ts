import type { ClientUnknown } from "./ClientUnknown.js";

declare const brand: unique symbol;
export interface Client<T extends ClientUnknown> {
  readonly [brand]: T;
}
