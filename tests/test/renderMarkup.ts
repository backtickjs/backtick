import { isTestNode, isText } from "@backtickjs/test-vm";
import type { TestNode } from "@backtickjs/test-vm";

// Renders a built node as JSX-like markup: children render as the node's body,
// the props render as attributes. The client scripts were already evaluated
// when the node was built, so a script prop holds the script's value — a
// handler stays a function and renders as `[function]`; rendering never invokes
// it.
export function renderMarkup(node: TestNode, indent = ""): string {
  if (isText(node)) {
    return `{${JSON.stringify(node.text)}}`;
  }
  const attributes = Object.entries(node.props).map(
    ([prop, value]) => ` ${prop}=${renderAttribute(value, indent)}`,
  );
  const opening = `<${node.id}${attributes.join("")}`;
  if (node.children.length === 0) {
    return `${opening} />`;
  }
  const inner = `${indent}  `;
  const body = node.children
    .map((child) => `${inner}${renderMarkup(child, inner)}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${node.id}>`;
}

function renderAttribute(value: unknown, indent: string): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (isTestNode(value)) {
    return `{${renderMarkup(value, indent)}}`;
  }
  return `{${renderInline(value)}}`;
}

function renderInline(value: unknown): string {
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
  if (isTestNode(value)) {
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
