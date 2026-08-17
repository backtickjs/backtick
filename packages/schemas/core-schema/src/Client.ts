import type { ClientUnknown } from "./schema.generated.js";

declare const ClientBrand: unique symbol;
export interface Client<T extends ClientUnknown> {
  readonly [ClientBrand]: T;
}
