import { createJsxElement, type ClientValue } from "@backtickjs/boundary";
import type { BacktickElement } from "@backtickjs/boundary";
import type { ForProps } from "./declarations.generated.js";

/**
 * The only way a list is written: a script stands in for one child and never a
 * list (see `BacktickNode`), so a list is declared rather than computed. A
 * member is named by its own identity — there is no key, and a value replaced
 * is a member replaced.
 */
export async function For<T extends ClientValue>(
  props: ForProps<T>,
): Promise<BacktickElement> {
  return createJsxElement("for", {
    each: props.each,
    children: props.children,
  });
}
