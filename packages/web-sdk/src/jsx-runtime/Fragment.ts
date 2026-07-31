import {
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { Content } from "./elements.js";

/**
 * Children with no element of their own.
 *
 * The web's fragment, declared here rather than shared: what it may hold is
 * what this target's elements are — tags and text — and another target's
 * fragment holds that target's. The id is the part they agree on.
 */
export type FragmentProps = {
  children?: Content;
};

export const Fragment: ClientElement<FragmentProps> =
  createClientElement("Fragment");
