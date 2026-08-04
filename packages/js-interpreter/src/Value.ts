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
  | ((...args: Value[]) => Value);
