import {
  type Children,
  createFragment,
  type Fragment as FragmentTag,
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
 * is the brand, which is what makes one recognizable while bundling — nothing
 * of it reaches a client, since its children go where it stood.
 */
export const Fragment: FragmentTag<FragmentProps> =
  createFragment<FragmentProps>();
