import type { TElement } from "./nodes/Element.js";
import type { TNode } from "./TNode.js";

export interface ClientSchema {
  /** Reusable types that a `Ref` can name. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every element the client can render natively. */
  readonly elements: Readonly<Record<string, TElement>>;
}
