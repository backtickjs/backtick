import type { AstRoot } from "./AstNode.js";

export class RuntimeJSXElement {
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, AstRoot>>;

  constructor(
    type: string,
    key: string | number | null,
    props: Record<string, AstRoot>,
  ) {
    this.type = type;
    this.key = key;
    this.props = props;
  }
}
