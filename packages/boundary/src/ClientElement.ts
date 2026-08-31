import type { ClientHandle } from "./ClientValue.js";

declare const ClientElementBrand: unique symbol;

/**
 * A drawing, as a script holds one.
 *
 * A handle and nothing more: what it is made of is the client's, and a script
 * that has one can pass it and nothing else. Here rather than in the layer that
 * declares elements, because every layer above that one names it and none of
 * them draws anything by knowing what is inside.
 *
 * Branded, and that is load-bearing: without it this is `ClientHandle` written
 * twice, and every handle — a cell of storage included — reads as a drawing.
 */
export interface ClientElement extends ClientHandle {
  readonly [ClientElementBrand]: never;
}
