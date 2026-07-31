import type { Bundle } from "@backtickjs/core";

/**
 * What a path says to draw: each target, and the bundle to draw there.
 *
 * The one shape both halves of this package agree on — `createHandler` answers
 * with a list of these, and `draw` takes one — so it sits between them rather
 * than in either.
 *
 * A list rather than a map, because the order a page was written in is the
 * order its targets were meant to be drawn.
 */
export interface Drawn {
  // The element to fill, as a selector: the name the page already has for it.
  readonly target: string;
  readonly bundle: Bundle;
}
