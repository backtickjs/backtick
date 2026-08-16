import type { TTag } from "./nodes/Tag.js";
import type { TNode } from "./TNode.js";

export interface Schema {
  readonly extends: readonly Schema[];

  /** Reusable types that a `Type.Ref` can reach. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every tag an app may write, and what each accepts. */
  readonly tags: Readonly<Record<string, TTag>>;

  /** Builtin functions a script can call. */
  readonly builtins: Readonly<Record<string, TNode>>;
}
