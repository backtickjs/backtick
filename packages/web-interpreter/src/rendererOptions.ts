// The ten operations a target answers, under the name Solid gives them: these
// are what `createRenderer` is handed, and what it answers with is a
// `Renderer`. Two things, two names, as there.
//
// Declared here rather than imported from Solid, though Solid is what consumes
// it: a target implements this package's contract and carries no dependency for
// it. The reactive graph behind these calls is an implementation detail of the
// interpreter, and the shape is checked structurally where the two meet.
export interface RendererOptions<NodeType> {
  // A tag drawn inside an `svg` arrives as `svg:<tag>`
  createElement(tag: string): NodeType;
  createTextNode(value: string): NodeType;
  replaceText(textNode: NodeType, value: string): void;
  isTextNode(node: NodeType): boolean;
  setProperty<T>(node: NodeType, name: string, value: T, prev?: T): void;
  insertNode(parent: NodeType, node: NodeType, anchor?: NodeType): void;
  removeNode(parent: NodeType, node: NodeType): void;
  getParentNode(node: NodeType): NodeType | undefined;
  getFirstChild(node: NodeType): NodeType | undefined;
  getNextSibling(node: NodeType): NodeType | undefined;
}

// SVG's namespace. `createElement` cannot reach it: an element made there
// draws, and one made with the same tag in HTML's namespace is an
// `HTMLUnknownElement` that parses, inserts, and shows nothing.
const SVG = "http://www.w3.org/2000/svg";

// The DOM, as the ten operations a host answers. Nine are the DOM's own words;
// `setProperty` is the only decision here, because what a prop means is ours.
// Built over the document it is handed, so what draws into a page can draw into
// any document.
export function rendererOptions(document: Document): RendererOptions<Node> {
  return {
    // The interpreter prefixes a tag drawn inside an `svg`: `svg:path` is a path
    // in SVG's namespace, and a tag with no prefix is HTML's.
    createElement: (tag) => {
      const isSvg = tag.startsWith("svg:");
      tag = isSvg ? tag.slice(4) : tag.toLowerCase();
      // The one tag a bundle may not draw
      if (tag === "script") {
        throw new Error(`backtick: a bundle may not draw a \`${tag}\``);
      }
      return isSvg
        ? document.createElementNS(SVG, tag)
        : document.createElement(tag);
    },
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
}

// One registration per event, reading whatever the prop holds now: a handler is
// a new closure whenever what it captured changed, and a listener each would run
// once per change it survived.
const listening = new WeakMap<Node, Map<string, (event: Event) => void>>();

// A registration for a handler, an attribute for anything a tag can carry, and
// nothing for an object — this target has no attribute for one.
//
// A function and an `on` name go together in both directions: neither is any use
// without the other, and either alone is a drawing asking for something this
// cannot do. Said rather than dropped, because a handler that was never
// registered looks exactly like one that never fired.
function attribute(node: Element, prop: string, value: unknown): void {
  if (typeof value === "function") {
    if (!prop.startsWith("on")) {
      throw new Error(`backtick: \`${prop}\` takes a value, not a function`);
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
  // A handler arrives as a function or not at all. Written as an attribute it
  // is source text the browser compiles, so a string here is an inline handler
  // — the second way a bundle could run what wrote it, and the reason the
  // function above is the only route to `on`.
  if (prop.toLowerCase().startsWith("on")) {
    throw new Error(`backtick: \`${prop}\` takes a function, not a value`);
  }
  // Through the CSSOM, not the attribute: `style-src` blocks writing a `style`
  // attribute and says nothing about `cssText`. Same declaration, and the
  // difference between a page that works under a content policy and one that
  // doesn't.
  if (name === "style") {
    (node as HTMLElement | SVGElement).style.cssText = String(value);
    return;
  }
  // Through the property: once a field is edited, its `value` and `checked`
  // attributes are only defaults and writing them changes nothing it shows.
  if (name === "value" && name in node) {
    (node as HTMLInputElement).value = String(value);
    return;
  }
  if (name === "checked" && name in node) {
    (node as HTMLInputElement).checked = value === true;
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
