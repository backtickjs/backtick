/** What a client component returns: the element it names, and its props. */
export interface ElementDescriptor {
  readonly type: string;
  readonly props: object;
}

/**
 * A component that names an element the interpreter renders — the only kind
 * that reaches the client, as an element in the bundle.
 *
 * A plain function, so `jsx` calls it like anything else, and the call
 * signature is what makes it usable as a tag and gives its props their type.
 * `props` is unparameterized on the way out so that every `ClientComponent<P>`
 * is still a `ClientComponent<never>`, the form a JSX tag is checked against.
 */
export type ClientComponent<P extends object = object> = (
  props: P,
) => ElementDescriptor;
