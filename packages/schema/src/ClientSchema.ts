import type { TElement } from "./nodes/Element.js";
import type { TFunction } from "./nodes/Function.js";
import type { TGeneric } from "./nodes/Generic.js";
import type { TNode } from "./TNode.js";

export interface ClientSchema {
  /** The schemas this one is written on top of. */
  readonly extends: readonly ClientSchema[];

  /** Reusable types that a `Ref` can name. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every element the client can render natively. */
  readonly elements: Readonly<Record<string, TElement>>;

  /** Every native function the client can run. */
  readonly functions: Readonly<Record<string, TFunction | TGeneric>>;
}
