import type { AstRoot } from "./AstNode.js";

export interface AstElement {
  readonly kind: "AstElement";
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, AstRoot>>;
}
