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
  createElement: (tag) => {
    if (!DRAWABLE.has(tag)) {
      throw new Error(`backtick: a bundle may not draw a \`${tag}\``);
    }
    return tag.startsWith("svg:")
      ? document.createElementNS(SVG, tag.slice(4))
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

// The tags a bundle may draw, spelled the way a bundle spells them — the web
// schema's own vocabulary, less the two that execute.
//
// An allowlist rather than a list of what to refuse: a name nobody has thought
// about yet is a name that does nothing, and the list of tags that run something
// is the browser's to grow. `script` is gone from both languages, and both had
// it — an inert document is no help for either, because a script made in one
// still runs when it is adopted into a live one.
//
// A target's own tags never reach this: `defineClient` asks its `elements` table
// first, so what a schema adds is answered before this is consulted.
//
// `iframe`, `object` and `embed` are here. They load rather than execute, and
// none of them run in this origin. That is a separate decision, and not this one.
export const DRAWABLE = new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",

  "svg:a",
  "svg:animate",
  "svg:animateMotion",
  "svg:animateTransform",
  "svg:circle",
  "svg:clipPath",
  "svg:defs",
  "svg:desc",
  "svg:ellipse",
  "svg:feBlend",
  "svg:feColorMatrix",
  "svg:feComponentTransfer",
  "svg:feComposite",
  "svg:feConvolveMatrix",
  "svg:feDiffuseLighting",
  "svg:feDisplacementMap",
  "svg:feDistantLight",
  "svg:feDropShadow",
  "svg:feFlood",
  "svg:feFuncA",
  "svg:feFuncB",
  "svg:feFuncG",
  "svg:feFuncR",
  "svg:feGaussianBlur",
  "svg:feImage",
  "svg:feMerge",
  "svg:feMergeNode",
  "svg:feMorphology",
  "svg:feOffset",
  "svg:fePointLight",
  "svg:feSpecularLighting",
  "svg:feSpotLight",
  "svg:feTile",
  "svg:feTurbulence",
  "svg:filter",
  "svg:foreignObject",
  "svg:g",
  "svg:image",
  "svg:line",
  "svg:linearGradient",
  "svg:marker",
  "svg:mask",
  "svg:metadata",
  "svg:mpath",
  "svg:path",
  "svg:pattern",
  "svg:polygon",
  "svg:polyline",
  "svg:radialGradient",
  "svg:rect",
  "svg:set",
  "svg:stop",
  "svg:style",
  "svg:svg",
  "svg:switch",
  "svg:symbol",
  "svg:text",
  "svg:textPath",
  "svg:title",
  "svg:tspan",
  "svg:use",
  "svg:view",
]);

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
