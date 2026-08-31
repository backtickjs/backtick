import type { RendererOptions } from "@backtickjs/js-interpreter";

// SVG's namespace. `createElement` cannot reach it: an element made there
// draws, and one made with the same tag in HTML's namespace is an
// `HTMLUnknownElement` that parses, inserts, and shows nothing.
const SVG = "http://www.w3.org/2000/svg";

// The DOM, as the ten operations a host answers. Nine are the DOM's own words;
// `setProperty` is the only decision here, because what a prop means is ours.
export const dom: RendererOptions<Node> = {
  // An id carrying a namespace is this target's own vocabulary, which the
  // format leaves to it: `svg:path` is a path in SVG's namespace, and an id
  // with no prefix is HTML's. Nothing else in a bundle says which language a
  // tag is from.
  createElement: (tag) =>
    tag.startsWith("svg:")
      ? document.createElementNS(SVG, tag.slice(4))
      : document.createElement(tag),
  createTextNode: (value) => document.createTextNode(value),
  replaceText: (node, value) => {
    node.nodeValue = value;
  },
  isTextNode: (node) => node.nodeType === 3,
  setProperty: (node, name, value) => attribute(node as Element, name, value),
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
function attribute(node: Element, prop: string, value: unknown): void {
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
  // HTML attribute names are case-insensitive, so lowercasing is what makes a
  // prop and an attribute the same name. SVG's are case-sensitive — `viewBox`
  // is not `viewbox`, and `gradientTransform` is not `gradienttransform` — so
  // in that namespace the same line is what breaks them.
  const name = node.namespaceURI === SVG ? prop : prop.toLowerCase();
  if (value === null || value === undefined) {
    node.removeAttribute(name);
    return;
  }
  // Through the CSSOM, not the attribute: `style-src` blocks writing a `style`
  // attribute and says nothing about `cssText`. Same declaration, and the
  // difference between a page that works under a content policy and one that
  // doesn't.
  if (name === "style") {
    (node as HTMLElement | SVGElement).style.cssText = String(value);
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
