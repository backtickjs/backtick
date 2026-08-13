import type { TProperties } from "./Properties.js";
import type { TSchema } from "../TSchema.js";

export type TOptional<Node extends TSchema = TSchema> = Node & {
  readonly "~optional": true;
};

export function Optional<Node extends TSchema>(node: Node): TOptional<Node> {
  const marked = { ...node };
  Object.defineProperty(marked, "~optional", {
    value: true,
    enumerable: false,
    writable: true,
    configurable: true,
  });
  return marked as TOptional<Node>;
}

export function IsOptional(node: TSchema): boolean {
  return "~optional" in node;
}

export function requiredOf(properties: TProperties): string[] {
  return Object.entries(properties)
    .filter(([, node]) => !IsOptional(node))
    .map(([name]) => name);
}
