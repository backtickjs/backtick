import {
  type Children,
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";

/**
 * Children with no element of their own.
 */
export type FragmentProps = {
  children?: Children<JSX.Element>;
};

/**
 * This vocabulary's fragment. Every target declares its own, because what a
 * fragment may hold is whatever that target's elements are. What they agree on
 * is the id: a client answers to `"Fragment"` whichever target sent it, so the
 * word is the same in every target that has one.
 */
export const Fragment: ClientElement<FragmentProps> =
  createClientElement("Fragment");
