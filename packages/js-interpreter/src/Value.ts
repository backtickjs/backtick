import type { BundleTree } from "@backtickjs/core";

// What a key can be. A tree applied without one is named by its position
// instead, which is a number too — but a number nobody wrote down.
export type Key = string | number;

/**
 * A tree entry with the arguments it was applied to, before anything has been
 * built from it.
 *
 * Applying is not instantiating. A script that maps a thousand rows applies a
 * thousand times, and the list it hands back is compared against the last one
 * before any of it is built: a row that was there before keeps the nodes it
 * had and is handed its new slots, and only a row that wasn't is instantiated.
 * Evaluating eagerly would build a thousand subtrees to throw all but a few of
 * them away.
 *
 * Recognized by the marker rather than by `instanceof`, like everything else
 * spliceable: class identity is per-copy of the package, and two copies
 * resolved into one install would make the check fail and the value draw as
 * text.
 */
export interface AppliedTree {
  readonly "@backtickjs": "AppliedTree";
  readonly tree: BundleTree;
  // Which of its siblings this one is, as the node that applied it said, or
  // null where it said nothing and position is the only identity it has.
  readonly key: Key | null;
  readonly slots: Value[];
}

export function isAppliedTree(value: unknown): value is AppliedTree {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "AppliedTree"
  );
}

/**
 * Everything evaluating a bundle can produce, and nothing else.
 *
 * The counterpart of `ClientValue`, which is the same domain seen from the
 * authoring end: a `JsxElement` there is an `AppliedTree` here, a `State<T>` is
 * the object of functions `cellHandle` builds, and a spliced class is a plain
 * function. They stay two types because they are two representations —
 * `Spliced<T>` is the mapping between them — and collapsing them would make one
 * side describe values it can't hold.
 *
 * A host's own nodes are not in here. What a tree builds belongs to the host
 * that built it, and nothing a script can hold is one: a script applies a tree
 * and hands back the application, and the view is what turns that into nodes.
 *
 * Every function here returns a `Value`, never `void`: an effect yields `null`,
 * the language's one absent value, so a cell's handle is an ordinary object of
 * functions rather than a shape this union has to name.
 */
export type Value =
  | null
  | boolean
  | number
  | string
  | readonly Value[]
  | { readonly [key: string]: Value }
  | AppliedTree
  | ((...args: Value[]) => Value);
