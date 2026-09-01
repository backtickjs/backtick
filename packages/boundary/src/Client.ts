import type { ClientUnknown } from "./ClientUnknown.js";

declare const ClientBrand: unique symbol;
export interface Client<T extends ClientUnknown> {
  readonly [ClientBrand]: T;
}
