import type { ClientUnknown } from "./ClientValue.js";

declare const ClientBrand: unique symbol;
export interface Client<T extends ClientUnknown> {
  readonly [ClientBrand]: T;
}
