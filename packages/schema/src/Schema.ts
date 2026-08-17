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

  /** Every element an app may draw, and what each accepts. */
  readonly elements: Readonly<Record<string, TNode>>;

  /** Builtin functions a script can call. */
  readonly builtins: Readonly<Record<string, TNode>>;
}
