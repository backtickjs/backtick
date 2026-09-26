import type { ClientHandle } from "./declarations.js";

declare const BacktickElementBrand: unique symbol;

/**
 * A drawing, as either side names one.
 *
 * Opaque, and that is the whole of it: what a drawing is made of belongs to
 * whichever side made it. A server builds one from a tag and props, and a
 * script evaluates to one — neither reads into the other's.
 */
export interface BacktickElement extends ClientHandle {
  readonly [BacktickElementBrand]: never;
}

/**
 * What may stand where a drawing does: one drawing, several, or nothing.
 *
 * Text and numbers stand for themselves and `null` for nothing, so a client
 * draws these in order and skips the nothings. Nested because a drawing's
 * children may be gathered before they are handed over.
 */
export type BacktickNode =
  | BacktickElement
  | string
  | number
  | null
  | readonly BacktickNode[];
