import type { JsxElementType } from "@backtickjs/ui";
import { createFragment, createJsxElement } from "@backtickjs/ui";
import type { Elements as Ui, FragmentProps } from "@backtickjs/ui";
import type { BacktickElement } from "@backtickjs/ui";

// What the JSX transform reaches for, for the language's own elements and no
// target's.
//
// The same shape a target's runtime has, one schema down: `IntrinsicElements`
// is this schema's `Elements`, which here is `for`, `Fragment` and `backtick` —
// what every client answers for, whatever it draws with. So a component that
// reaches for none of a target's tags can be written where no target has been
// chosen, which is what a component built out of `<backtick />` needs and what
// a target's runtime cannot give it without choosing one.
//
// A target's runtime is not this one with more in it. `Elements` extends every
// base's in turn, so a target that wants these already has them through its
// own, and nothing here is what a target reaches for.
export const Fragment = createFragment<FragmentProps>();

export declare namespace JSX {
  export interface Element extends BacktickElement {}
  export interface IntrinsicElements extends Ui {}
  export type ElementType = JsxElementType;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
): JSX.Element {
  return createJsxElement(type, props);
}

export const jsxs = jsx;
