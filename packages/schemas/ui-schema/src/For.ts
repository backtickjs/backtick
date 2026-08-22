import type { ClientValue } from "@backtickjs/language-schema";
import { createElementAlias, type ElementAlias } from "./ElementAlias.js";
import type { ForProps } from "./schema.generated.js";

/**
 * The only way a list is written: a script stands in for one child and never a
 * list (see `Children`), so a list is declared rather than computed. A member
 * is named by its own identity — there is no key, and a value replaced is a
 * member replaced.
 *
 * An alias for `<for />`, because this is where `T` binds: `each` decides it
 * and the child script is checked against it, where the tag it stands for takes
 * the whole value domain instead. Nothing of this reaches the client and
 * nothing of it costs anything — the tag is what lowers.
 */
export interface For extends ElementAlias {
  <T extends ClientValue>(props: ForProps<T>): never;
  readonly id: "for";
}

export const For: For = createElementAlias<For>("for");
