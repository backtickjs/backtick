import type { TElement } from "./nodes/Element.js";
import type { TNode } from "./TNode.js";

export interface ClientSchema {
  readonly extends: readonly ClientSchema[];

  /** Reusable types that a `Ref` can name. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every element the client can render natively. */
  readonly elements: Readonly<Record<string, TElement>>;

  /** Every name a script may reach */
  readonly builtins: Readonly<Record<string, TNode>>;
}
