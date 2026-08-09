import {
  createFragment,
  type Children,
  type Fragment as FragmentTag,
  type JsxElement,
} from "@backtickjs/cs-runtime";

/**
 * Children with no element of their own.
 *
 * The web's fragment, declared here rather than shared: what it may hold is
 * what this target's elements are — tags and text — and another target's
 * fragment holds that target's. The brand is the part they agree on.
 */
export type FragmentProps = {
  children?: Children<JsxElement | string | number>;
};

export const Fragment: FragmentTag<FragmentProps> =
  createFragment<FragmentProps>();
