import type { TNode } from "./TNode.js";

export interface Schema {
  /** Where this schema is published. */
  readonly package: string;

  /** What this schema's own names are prefixed with. */
  readonly namespace: string;

  /** The schemas this one builds on, whose names it reaches without writing. */
  readonly extends: readonly Schema[];

  /** Reusable types that a `Type.Ref` can reach. */
  readonly types: Readonly<Record<string, TNode>>;

  /** Every element an app may draw, and what each accepts. */
  readonly elements: Readonly<Record<string, TNode>>;

  /** Builtin functions a script can call. */
  readonly builtins: Readonly<Record<string, TNode>>;
}
