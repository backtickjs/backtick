import type { AstRoot } from "./AstNode.js";

export interface AstObject {
  readonly kind: "AstObject";
  readonly entries: Readonly<Record<string, AstRoot>>;
}
