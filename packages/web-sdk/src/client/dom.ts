import { isElement } from "@backtickjs/js-interpreter";
import type { Element } from "@backtickjs/js-interpreter";
import { FRAGMENT_ID } from "@backtickjs/cs-runtime";

// How an element becomes a node. This client renders the web's own vocabulary
// and nothing else: an element's id *is* its tag name, and its props are the
// attributes and events HTML already has — the elements declared in
// `../jsx-runtime/elements.ts`, which is what an app writing `<div>` names.
//
// There is no table of components here on purpose. A portable component like
// `View` is a different target's vocabulary, and a client that quietly turned
// one into a `div` would be answering for a target it isn't.
//
// `Fragment` is the reserved id for a group: it renders its children with no
// node of its own, so it maps to no tag at all. The word is `cs-runtime`'s —
// spelling it here would be a second place for it to change.

// Props that are wiring rather than attributes, handled on their own.
const handled = new Set(["children"]);

// Builds the DOM for an element tree. Rebuilt wholesale on a change rather than
// diffed: a preview shows a tree that is small and already fully evaluated, so
// the work is proportional to what is on screen and the fidelity of a real
// reconciler buys nothing here.
export function renderInto(container: globalThis.Element, tree: unknown): void {
  container.replaceChildren(...nodes(tree));
}

function nodes(value: unknown): Node[] {
  if (value === null || value === undefined || value === false) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(nodes);
  }
  if (isElement(value)) {
    return element(value);
  }
  return [document.createTextNode(String(value))];
}

function element(source: Element): Node[] {
  const children = nodes(source.props.children);
  if (source.id === FRAGMENT_ID) {
    return children;
  }
  const node = document.createElement(tagFor(source.id));

  for (const [prop, value] of Object.entries(source.props)) {
    if (handled.has(prop) || value === null || value === undefined) {
      continue;
    }
    // An element names its own events, and the prop is the listener's name:
    // `onclick` is a click.
    if (typeof value === "function") {
      if (prop.startsWith("on")) {
        const listener = value as () => void;
        node.addEventListener(prop.slice(2), () => listener());
      }
      continue;
    }
    if (typeof value === "object") {
      continue;
    }
    // A boolean attribute is there or it isn't — `disabled="false"` disables.
    // ARIA is the exception: its values are the words themselves.
    if (typeof value === "boolean" && !prop.startsWith("aria-")) {
      if (value) {
        node.setAttribute(prop.toLowerCase(), "");
      }
      continue;
    }
    node.setAttribute(prop.toLowerCase(), String(value));
  }

  node.append(...children);
  return [node];
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
