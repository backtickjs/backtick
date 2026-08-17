import type { TTag } from "./nodes/Tag.js";
import type { TNode } from "./TNode.js";

export interface Schema {
  /** Where this schema is published. */
  readonly package: string;

  /** The schemas this one builds on, whose names it reaches without writing. */
  readonly extends: readonly Schema[];

  /** Names this package publishes by hand. */
  readonly publishes: readonly string[];

  /** Reusable types that a `Type.Ref` can reach. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every tag an app may write, and what each accepts. */
  readonly tags: Readonly<Record<string, TTag>>;

  /** Builtin functions a script can call. */
  readonly builtins: Readonly<Record<string, TNode>>;
}
