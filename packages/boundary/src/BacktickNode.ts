import type { BacktickElement } from "./BacktickElement.js";
import type { Prop } from "./Prop.js";

/**
 * What may stand where a drawing does: one node, several, or nothing.
 */
export type BacktickNode =
  | Prop<BacktickElement | string | number | null>
  | readonly BacktickNode[];
