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

export const Fragment: ClientElement<FragmentProps> =
  createClientElement("Fragment");
