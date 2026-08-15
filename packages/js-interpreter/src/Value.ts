/**
 * Everything evaluating a bundle can produce, and nothing else.
 *
 * The running end of the same domain a script is written against: what is a
 * `JsxElement` there is the application of one here, a `State<T>` is the
 * object of functions a client builds for it, and a spliced class is a plain
 * function. Two representations rather than one, because collapsing them would
 * make one side describe values it cannot hold.
 *
 * A host's own nodes are not in here. What a tree builds belongs to the host
 * that built it, and nothing a script can hold is one.
 *
 * Written by hand and not generated: a schema says what a script may reach,
 * and this is what a client holds while running one. Another client's domain
 * is its own to write — a native one holds nothing shaped like this.
 */
export type Value =
  | null
  | boolean
  | number
  | string
  | readonly Value[]
  | { readonly [key: string]: Value }
  | ((...args: Value[]) => Value);
