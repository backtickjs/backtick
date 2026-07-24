import type { ClientElement } from "./ClientElement.js";
import type { SpliceableValue } from "./Spliceable.js";

// A component's props: an object whose every value the bundler can lower.
type Props = { [key: string]: SpliceableValue };

/**
 * A component that names an element the interpreter renders — the only kind
 * that reaches the client, as an element in the bundle.
 *
 * A plain function, so `jsx` calls it like anything else, and the call
 * signature is what makes it usable as a tag and gives its props their type.
 * `P` is constrained so a component's props are only ever things the bundler
 * can lower.
 */
export type ClientComponent<P extends Props = Props> = (
  props: P,
) => ClientElement;
