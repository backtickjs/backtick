import type { RendererOptions } from "@backtickjs/js-interpreter";

// The DOM, as the ten operations a host answers. Nine are the DOM's own words;
// `setProperty` is the only decision here, because what a prop means is ours.
export const dom: RendererOptions<Node> = {
  createElement: (tag) => document.createElement(tag),
  createTextNode: (value) => document.createTextNode(value),
  replaceText: (node, value) => {
    node.nodeValue = value;
  },
  isTextNode: (node) => node.nodeType === 3,
  setProperty: (node, name, value) =>
    attribute(node as HTMLElement, name, value),
  insertNode: (parent, node, anchor) => {
    parent.insertBefore(node, anchor ?? null);
  },
  removeNode: (parent, node) => {
    parent.removeChild(node);
  },
  getParentNode: (node) => node.parentNode ?? undefined,
  getFirstChild: (node) => node.firstChild ?? undefined,
  getNextSibling: (node) => node.nextSibling ?? undefined,
};

// One registration per event, reading whatever the prop holds now: a handler is
// a new closure whenever what it captured changed, and a listener each would run
// once per change it survived.
const listening = new WeakMap<Node, Map<string, (event: Event) => void>>();

// A registration for a handler, an attribute for anything a tag can carry, and
// nothing for an object — this target has no attribute for one.
function attribute(node: HTMLElement, prop: string, value: unknown): void {
  if (typeof value === "function") {
    if (!prop.startsWith("on")) {
      return;
    }
    const event = prop.slice(2).toLowerCase();
    let events = listening.get(node);
    if (events === undefined) {
      events = new Map();
      listening.set(node, events);
    }
    if (!events.has(event)) {
      const dispatch = events;
      node.addEventListener(event, (fired) => dispatch.get(event)?.(fired));
    }
    events.set(event, value as (event: Event) => void);
    return;
  }
  if (typeof value === "object" && value !== null) {
    return;
  }
  const name = prop.toLowerCase();
  if (value === null || value === undefined) {
    node.removeAttribute(name);
    return;
  }
  // Through the CSSOM, not the attribute: `style-src` blocks writing a `style`
  // attribute and says nothing about `cssText`. Same declaration, and the
  // difference between a page that works under a content policy and one that
  // doesn't.
  if (name === "style") {
    node.style.cssText = String(value);
    return;
  }
  // A boolean attribute is there or it isn't — `disabled="false"` disables. ARIA
  // is the exception: its values are the words themselves.
  if (typeof value === "boolean" && !prop.startsWith("aria-")) {
    if (value) {
      node.setAttribute(name, "");
    } else {
      node.removeAttribute(name);
    }
    return;
  }
  node.setAttribute(name, String(value));
}
