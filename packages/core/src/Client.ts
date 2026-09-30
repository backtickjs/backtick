declare const ClientBrand: unique symbol;
export interface Client<T> {
  readonly [ClientBrand]: T;
}
