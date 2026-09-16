import { isNode, isText, listenersOf } from "@backtickjs/test-vm";
import type { Node } from "@backtickjs/test-vm";

// Renders a drawn node as JSX-like markup: children render as the node's body,
// the attributes it carries render as attributes, and an event it was given a
// handler for renders as `on<event>={[function]}`.
//
// What is read is a real DOM — the drawing went through the same renderer a
// page uses — so a value the bundle computed is here as the document kept it: a
// number is the string it was written as, and a handler is a registration
// rather than a value. Rendering never fires one.
export function renderMarkup(node: Node, indent = ""): string {
  if (isText(node)) {
    return `{${JSON.stringify(node.nodeValue ?? "")}}`;
  }
  const element = node as unknown as Element;
  const written = [...element.attributes].map(
    (attribute) => ` ${attribute.name}=${JSON.stringify(attribute.value)}`,
  );
  const handlers = listenersOf(node).map((event) => ` on${event}={[function]}`);
  const tag = element.tagName.toLowerCase();
  const opening = `<${tag}${written.join("")}${handlers.join("")}`;
  const children = [...element.childNodes] as unknown as Node[];
  if (children.length === 0) {
    return `${opening} />`;
  }
  const inner = `${indent}  `;
  const body = children
    .map((child) => `${inner}${renderMarkup(child, inner)}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${tag}>`;
}

// A value a bundle answered with that was not drawn: what `evaluate` hands back
// where the root is data rather than an element.
export function renderInline(value: unknown): string {
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
  if (Array.isArray(value)) {
    return `[${value.map(renderInline).join(", ")}]`;
  }
  if (isNode(value)) {
    return renderMarkup(value);
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).map(
      ([key, item]) => `${JSON.stringify(key)}: ${renderInline(item)}`,
    );
    return `{ ${entries.join(", ")} }`;
  }
  return String(value);
}
