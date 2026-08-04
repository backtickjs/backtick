import type { BundleFunction } from "@backtickjs/core";

/**
 * A tree entry with the arguments it was applied to, before anything has been
 * built from it. The entry is resolved rather than named, so the table is read
 * once and an unknown label is caught in one place.
 *
 * Kept apart from `BundleApplyTree`, which it resembles: a node's arguments are
 * expressions waiting for a scope, and these are what those expressions became.
 * Nothing tells the two apart by shape, so a node reaching here would draw an
 * entry with expressions as its slots — wrong, and quietly.
 *
 * Recognized by the marker rather than by `instanceof`: class identity is
 * per-copy of the package, and two copies in one install would fail the check.
 */
export interface Applied {
  readonly "@backtickjs": "Applied";
  readonly tree: BundleFunction;
  readonly slots: Value[];
}

export function isApplied(value: unknown): value is Applied {
  // A read rather than `in` and a read: both walk the prototype chain, and on a
  // host node that chain is long and the answer is always no. This runs once
  // per drawn position, so the second walk is one too many.
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { "@backtickjs"?: unknown })["@backtickjs"] === "Applied"
  );
}

/**
 * Everything evaluating a bundle can produce, and nothing else.
 *
 * The counterpart of `ClientValue`, which is the same domain seen from the
 * authoring end: a `JsxElement` there is an `Applied` here, a `State<T>` is the
 * object of functions `cellHandle` builds, and a spliced class is a plain
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
  | Applied
  | ((...args: Value[]) => Value);
