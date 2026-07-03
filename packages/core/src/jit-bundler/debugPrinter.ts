import type { Client, Spliceable } from "../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import { buildAst } from "./buildAst.js";

// Anything the debug printer can render: a raw runtime splice value, an AST
// node, or arrays/objects of either.
export type Printable =
  | Spliceable
  | AstNode
  | readonly Printable[]
  | { readonly [key: string]: Printable };

function isAstNode(value: object): value is AstNode {
  return (
    "debugPrint" in value && typeof (value as AstNode).debugPrint === "function"
  );
}

// Renders a printable value to its debug string. AST nodes print themselves,
// nested client scripts are expanded through the AST, and plain values are
// rendered inline.
export function debugPrinter(value: Printable): string {
  if (value == null) {
    return "null";
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (isAstNode(value)) {
    return value.debugPrint();
  }
  if ("$$type" in value && "visit" in value) {
    return buildAst(value as Client<unknown>).debugPrint();
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => debugPrinter(item)).join(", ")}]`;
  }
  const body = Object.entries(value)
    .map(([key, item]) => `${key}: ${debugPrinter(item)}`)
    .join(", ");
  return `({${body}})`;
}
