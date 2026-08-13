import type { SchemaNode, TProperties } from "../Schema.js";

export type TOptional<Node extends SchemaNode = SchemaNode> = Node & {
  readonly "~optional": true;
};

export function Optional<Node extends SchemaNode>(node: Node): TOptional<Node> {
  const marked = { ...node };
  Object.defineProperty(marked, "~optional", {
    value: true,
    enumerable: false,
    writable: true,
    configurable: true,
  });
  return marked as TOptional<Node>;
}

export function IsOptional(node: SchemaNode): boolean {
  return "~optional" in node;
}

export function requiredOf(properties: TProperties): string[] {
  return Object.entries(properties)
    .filter(([, node]) => !IsOptional(node))
    .map(([name]) => name);
}
