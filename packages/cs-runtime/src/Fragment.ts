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
 * The id a client answers to by drawing children and no node of its own.
 *
 * Exported because a client has to recognise it, and a client that spelled it
 * out would be a second place for it to be spelled differently.
 */
export const FRAGMENT_ID = "Fragment";

/**
 * The reserved element, and the one element that is nobody's vocabulary: every
 * client answers to this id by drawing its children and no node of its own,
 * and every target's `jsx-runtime` re-exports it under this name, because that
 * is what the JSX transform imports for `<>…</>`.
 */
export const Fragment: ClientElement<FragmentProps> =
  createClientElement(FRAGMENT_ID);
