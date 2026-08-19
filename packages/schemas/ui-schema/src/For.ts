import type { ClientValue } from "@backtickjs/language-schema";
import { createJsxElement } from "./JsxElement.js";
import type { ClientElement, ForProps } from "./schema.generated.js";

/**
 * The only way a list is written: a script stands in for one child and never a
 * list (see `Children`), so a list is declared rather than computed. A member
 * is named by its own identity — there is no key, and a value replaced is a
 * member replaced.
 *
 * A component, because a component is where `T` binds: `each` decides it and
 * the child script is checked against it, where the `for` tag this answers with
 * takes the whole value domain instead. Nothing else here is special — it runs
 * while bundling like any other component, and the tag is what reaches the
 * client.
 */
export async function For<T extends ClientValue>(
  props: ForProps<T>,
): Promise<ClientElement> {
  // `T` was for the call site: the tag's props are written over the whole value
  // domain, and a drawing holds them as the plain record every element's are.
  return createJsxElement("for", { ...props });
}
