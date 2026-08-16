declare const brand: unique symbol;
export interface ClientElement {
  readonly [brand]: never;
}
