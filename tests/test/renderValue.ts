import { renderMarkup } from "./renderMarkup.ts";
import { isTestNode } from "@backtickjs/test-vm";

// Renders a runtime value produced by the test VM into a stable textual
// snapshot: JSON-like, with the values JSON can't carry (functions,
// undefined, circular references) rendered as bracketed placeholders, and the
// nodes a tree built rendered as markup.
export function renderValue(value: unknown): string {
  return render(value, "", new Set());
}

function render(value: unknown, indent: string, seen: Set<object>): string {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "function") {
    return "[function]";
  }
  if (isTestNode(value)) {
    return renderMarkup(value, indent);
  }
  if (typeof value !== "object") {
    return String(value);
  }
  if (seen.has(value)) {
    return "[circular]";
  }
  seen.add(value);
  const rendered = Array.isArray(value)
    ? renderArray(value, indent, seen)
    : renderObject(value, indent, seen);
  seen.delete(value);
  return rendered;
}

function renderArray(
  value: unknown[],
  indent: string,
  seen: Set<object>,
): string {
  if (value.length === 0) {
    return "[]";
  }
  const inner = `${indent}  `;
  const items = value.map((item) => `${inner}${render(item, inner, seen)}`);
  return `[\n${items.join(",\n")}\n${indent}]`;
}

function renderObject(
  value: object,
  indent: string,
  seen: Set<object>,
): string {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return "{}";
  }
  const inner = `${indent}  `;
  const items = entries.map(
    ([key, item]) =>
      `${inner}${JSON.stringify(key)}: ${render(item, inner, seen)}`,
  );
  return `{\n${items.join(",\n")}\n${indent}}`;
}
