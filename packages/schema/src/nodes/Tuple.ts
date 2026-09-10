import { isType } from "../helpers/isType.js";
import { TupleElement } from "./TupleElement.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";
import type { TTupleElement } from "./TupleElement.js";

/**
 * A fixed run of positions, each named.
 *
 * How a bundle says a call, a drawing, an `if`: the first position is a word
 * naming the kind and the rest are what that kind holds. Nothing else this
 * format has says "these, in this order, and this many".
 */
export interface TTuple<
  Items extends readonly TTupleElement[] = readonly TTupleElement[],
> extends TOptions {
  readonly type: "tuple";
  readonly items: Items;
}

/**
 * Written as a record and held as a list: the names are what a schema is saying
 * and the order is what a tuple is, so authoring reads like an object and the
 * document carries the order where nothing has to trust a key's position.
 */
export function Tuple(
  items: { readonly [name: string]: TNode },
  options: TOptions = {},
): TTuple {
  return {
    ...options,
    type: "tuple",
    items: Object.entries(items).map(([name, holds]) =>
      TupleElement(name, holds),
    ),
  };
}

export function IsTuple(value: unknown): value is TTuple {
  return isType(value, "tuple");
}
