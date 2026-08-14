import type { TElement } from "./nodes/Element.js";
import type { TNode } from "./TNode.js";

export interface ClientSchema {
  readonly extends: readonly ClientSchema[];

  /** Reusable types that a `Type.Ref` can reach. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every element the client can render. */
  readonly elements: Readonly<Record<string, TElement>>;

  /** JavaScript APIs the host already has. */
  readonly globals: Readonly<Record<string, TNode>>;

  /** What the framework or a target provides */
  readonly builtins: Readonly<Record<string, TNode>>;
}
