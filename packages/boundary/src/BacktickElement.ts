declare const BacktickElementBrand: unique symbol;

/**
 * A drawing, as either side names one.
 *
 * Opaque, and that is the whole of it: what a drawing is made of belongs to
 * whichever side made it. The server builds one from a tag and props, and a
 * script evaluates to one — neither reads into the other's.
 */
export interface BacktickElement {
  readonly [BacktickElementBrand]: never;
}
