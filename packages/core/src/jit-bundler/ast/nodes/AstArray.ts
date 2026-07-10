import type { AstRoot } from "./AstNode.js";

export interface AstArray {
  readonly kind: "AstArray";
  readonly elements: readonly AstRoot[];
}
