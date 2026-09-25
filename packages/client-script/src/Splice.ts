import type { BaseNode } from "estree";
import type {} from "estree-jsx";

/**
 * A splice, where a script wrote one: `$name` or `${expression}`. What it
 * holds is the host's, as the script's parameter `param` (see `Metadata`), so
 * the node says only where it stands.
 *
 * Backtick's one node beside ESTree's, added to it the way JSX adds its own:
 * a script's body is ESTree with JSX and splices in it.
 */
export interface Splice extends BaseNode {
  type: "Splice";
  param: number;
}

declare module "estree" {
  interface ExpressionMap {
    Splice: Splice;
  }
}
