import type { Children } from "./Children.js";
import { type ClientElement, createClientElement } from "./ClientElement.js";
import type { JsxElement } from "./JsxElement.js";

/**
 * Children with no element of their own.
 */
export type FragmentProps = {
  children?: Children<JsxElement>;
};

/**
 * The reserved element, and the one element that is nobody's vocabulary: every
 * client answers to this id by drawing its children and no node of its own,
 * and every target's `jsx-runtime` re-exports it under this name, because that
 * is what the JSX transform imports for `<>…</>`.
 */
export const Fragment: ClientElement<FragmentProps> =
  createClientElement("Fragment");
