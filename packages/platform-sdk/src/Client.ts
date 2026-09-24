declare const ClientBrand: unique symbol;
// Unconstrained: a client value may be anything the client holds, a DOM node or
// a framework's accessor as readily as data. What crosses as data is
// `Spliceable`'s to bound.
export interface Client<T> {
  readonly [ClientBrand]: T;
}
