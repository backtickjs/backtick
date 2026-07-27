import { Element } from "@backtickjs/js-interpreter";

export { Element, evaluate } from "@backtickjs/js-interpreter";

// The interpreter itself lives in `@backtickjs/js-interpreter` — one
// implementation, so what this suite exercises is what every host runs. What
// stays here is the test-only presentation: rendering an evaluated element as
// markup for the `*.value` snapshots.

// Renders an evaluated element as JSX-like markup: `children` renders as the
// element's body, the other props render as attributes. The element's client
// scripts were already evaluated when the tree was instantiated, so a script
// prop holds the script's value — a handler stays a function and renders as
// `[function]`; rendering never invokes it.
export function renderMarkup(element: Element, indent = ""): string {
  const attributes: string[] = [];
  if (element.key !== null) {
    attributes.push(` key=${renderAttribute(element.key, indent)}`);
  }
  let children: unknown[] = [];
  for (const [prop, value] of Object.entries(element.props)) {
    if (prop === "children") {
      children = Array.isArray(value) ? value.flat(Infinity) : [value];
      continue;
    }
    attributes.push(` ${prop}=${renderAttribute(value, indent)}`);
  }
  const opening = `<${element.id}${attributes.join("")}`;
  if (children.length === 0) {
    return `${opening} />`;
  }
  const inner = `${indent}  `;
  const body = children
    .map((child) => `${inner}${renderChild(child, inner)}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element.id}>`;
}

function renderAttribute(value: unknown, indent: string): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (value instanceof Element) {
    return `{${renderMarkup(value, indent)}}`;
  }
  return `{${renderInline(value)}}`;
}

function renderChild(child: unknown, indent: string): string {
  if (child instanceof Element) {
    return renderMarkup(child, indent);
  }
  return `{${renderInline(child)}}`;
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
  if (value instanceof Element) {
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
