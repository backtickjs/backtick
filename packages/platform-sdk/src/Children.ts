import type { BacktickElement } from "./BacktickElement.js";
import type { Prop } from "./Prop.js";

/**
 * What may stand inside an element: one thing, or several.
 *
 * The name a host writes for a `children` prop. `BacktickNode` is the same
 * idea as the document says it — what a client meets — and this is that with
 * one arm added: a script may stand where a value is written.
 *
 * `Prop` over the arms that are one thing, and a plain array over the rest,
 * which is the distinction the position turns on. A written list has members a
 * compiler can see and give stable positions to. One value that happens to be a
 * list is opaque, and comes back a new list of new drawings on every read — so
 * `Client<BacktickElement[]>` is not an arm here, and `<For />` is how a list
 * that changes is drawn.
 * */
export type Children =
  | Prop<BacktickElement | string | number | null>
  | readonly Children[];
