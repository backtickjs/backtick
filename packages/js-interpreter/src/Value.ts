import type { BundleTree } from "@backtickjs/core";

/**
 * A tree entry with the arguments it was applied to, before anything has been
 * built from it.
 *
 * The entry is resolved rather than named: a label is what the *format* carries,
 * because a bundle is data and a label is how data points at a table. By the
 * time this exists the table has been read, so carrying the label again would
 * only mean looking it up a second time — and would leave two places to say
 * what an unknown one is.
 *
 * Kept apart from `BundleApplyTree`, which it otherwise resembles, because the
 * two are not the same thing: a node's arguments are expressions waiting for a
 * scope, and these are the values those expressions became. Nothing tells the
 * two apart by shape, so a node reaching a position that expects one of these
 * would draw an entry with expressions as its slots — wrong, and quietly. One
 * describes a program; the other is what running it produced.
 *
 * Recognized by the marker rather than by `instanceof`, like everything else
 * spliceable: class identity is per-copy of the package, and two copies
 * resolved into one install would make the check fail and the value draw as
 * text.
 */
export interface Applied {
  readonly "@backtickjs": "Applied";
  readonly tree: BundleTree;
  readonly slots: Value[];
}

export function isApplied(value: unknown): value is Applied {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "Applied"
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
