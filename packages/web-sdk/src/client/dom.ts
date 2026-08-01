import { isElement } from "@backtickjs/js-interpreter";
import type { Element } from "@backtickjs/js-interpreter";
import { createRenderer } from "solid-js/universal";

// How an element becomes a node. This client renders the web's own vocabulary
// and nothing else: an element's id *is* its tag name, and its props are the
// attributes and events HTML already has — the elements declared in
// `../jsx-runtime/elements.ts`, which is what an app writing `<div>` names.
//
// There is no diffing here, and no table of components. A prop is read, and
// reading it subscribes to whatever the interpreter computed it from, so one
// effect per prop keeps one attribute right. Structure is `insert`, which is
// dom-expressions' own reconciler — the same `reconcileArrays` Solid uses, over
// the ten operations below.
//
// `Fragment` is the reserved id for a group: it renders its children with no
// node of its own, so it maps to no tag at all. Every target that has a
// fragment builds it from this same word.
const FRAGMENT_ID = "Fragment";

// Nine of these are the DOM's own words. The tenth, `setProperty`, is the only
// decision in the file, and the reason this is `createRenderer` rather than a
// renderer that already knows what HTML is: what a prop means is ours.
const { insert, effect, setProp, createElement } = createRenderer<Node>({
  createElement: (tag) => document.createElement(tagFor(tag)),
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
});

// The node an element was drawn as. An instance hands back the same `Element`
// object every time it draws — refreshed in place rather than replaced — so
// finding one here is what says this subtree already exists, and is what lets a
// row that moved keep the node it had.
const drawn = new WeakMap<Element, Node>();

// One registration per event, reading whatever the prop holds now. A handler is
// a new closure whenever what it captured changed, and adding a listener for
// each would run it once per render it survived.
const listening = new WeakMap<Node, Map<string, (event: Event) => void>>();

/**
 * Renders a bundle's evaluated tree into a DOM element, and keeps it there: a
 * write to a state cell re-runs the props and the structure that read it, and
 * the target follows. The returned function takes it all down again.
 */
export function renderInto(container: globalThis.Element, tree: unknown): void {
  insert(container, () => draw(tree));
}

// An element as whatever goes in a child position: its node, a fragment's
// children in its place, or the value itself where it is text or nothing —
// `insert` knows what to do with a string, a null, an array, or a node.
function draw(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(draw);
  }
  if (!isElement(value)) {
    return value;
  }
  if (value.id === FRAGMENT_ID) {
    return draw(value.props.children);
  }
  const already = drawn.get(value);
  if (already !== undefined) {
    return already;
  }
  const node = createElement(value.id);
  drawn.set(value, node);
  for (const prop of Object.keys(value.props)) {
    if (prop === "children") {
      continue;
    }
    // Reading the prop is what subscribes to it, so this effect re-runs when
    // that one prop changes and sets that one attribute. Nothing told it to.
    effect(() => setProp(node, prop, value.props[prop]));
  }
  insert(node, () => draw(value.props.children));
  return node;
}

// Writes one prop onto a node: a registration for a handler, an attribute for
// anything a tag can carry, and nothing for an object — a style is a value this
// target has no attribute for, and guessing would invent one.
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
  // A boolean attribute is there or it isn't — `disabled="false"` disables.
  // ARIA is the exception: its values are the words themselves.
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

// A tag is written as HTML writes it, which is how an element built by this
// target's `jsx` arrives here. Anything else is an element from another
// target's vocabulary, and rendering it as a tag would invent an element the
// app never asked for.
function tagFor(id: string): string {
  if (/^[a-z][a-z0-9-]*$/.test(id)) {
    return id;
  }
  throw new Error(
    `No web rendering for <${id} />. This client renders HTML tags and ` +
      `${FRAGMENT_ID}; <${id} /> belongs to another target's vocabulary.`,
  );
}
