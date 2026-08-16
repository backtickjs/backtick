declare const ClientElementBrand: unique symbol;
export interface ClientElement {
  readonly [ClientElementBrand]: never;
}
