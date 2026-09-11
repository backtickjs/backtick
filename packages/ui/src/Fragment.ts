import { createJsxElement } from "./JsxElement.js";
import type { BacktickElement } from "./declarations.generated.js";
import type { Prop } from "./Prop.js";

/**
 * Children with no element of their own, as the element the language owns.
 *
 * `Fragment` is the name a script writes it under, and `<>` resolves to it, so
 * the element carries that name too. Capitalized, which is what keeps it out of
 * the elements a target declares.
 *
 * It draws no node — what it holds goes where it stands — and what it is for is
 * the position. A drawing that is not an element has nowhere to be watched, so
 * a conditional standing at a block's root is read inside whatever computation
 * asked for it, and the write that answers the conditional runs the block
 * again. Under a fragment the conditional is a child, and a child position owns
 * a computation of its own.
 *
 * Each target still makes its own, since what a fragment may hold is whatever
 * that target draws, and `Props` is where it says so.
 */
export type Fragment<Props extends object = object> = (
  props: Props,
) => Prop<BacktickElement | null>;

export function createFragment<Props extends object>(): Fragment<Props> {
  return ((props: { children?: unknown }) =>
    createJsxElement("Fragment", props)) as unknown as Fragment<Props>;
}
