import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

/**
 * One position in a tuple, under the name the schema gives it.
 *
 * The name is the whole reason this is a node rather than a bare type. A reader
 * of the document meets `["el", "d3", {}, []]` and has nothing but these to say
 * which position is which — so what is sugar in TypeScript is the only thing
 * carrying the meaning anywhere else.
 */
export interface TTupleElement<
  Name extends string = string,
  Holds extends TNode = TNode,
> extends TOptions {
  readonly type: "tupleElement";
  readonly name: Name;
  readonly holds: Holds;
}

export function TupleElement<Name extends string, Holds extends TNode>(
  name: Name,
  holds: Holds,
  options: TOptions = {},
): TTupleElement<Name, Holds> {
  return { ...options, type: "tupleElement", name, holds };
}

export function IsTupleElement(value: unknown): value is TTupleElement {
  return isType(value, "tupleElement");
}
