import { isElement } from "@backtickjs/js-interpreter";
import type { Change, Element } from "@backtickjs/js-interpreter";

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
// node of its own, so it maps to no tag at all. Every target that has a
// fragment builds it from this same word.
const FRAGMENT_ID = "Fragment";

// The id a text child is matched under, which no tag can collide with.
const TEXT_ID = "#text";

// Props that are wiring rather than attributes, handled on their own.
const handled = new Set(["children"]);

// What a node was last rendered from, so the next render can recognise it
// rather than replace it.
//
// Kept beside the node instead of on it: a `key` is the app's word for which
// row this is, and writing it into the document would put it where a stylesheet
// or a test could reach it. The props are the ones this rendered, which is what
// says whether an attribute has to be touched at all.
interface Rendered {
  // What this node was drawn from last time. An instance that had nothing new
  // to say hands back the element it handed back before, down to the objects —
  // so finding the same one here means this whole subtree is already right.
  source: Element | null;
  drew: { readonly [prop: string]: unknown } | null;
  readonly id: string;
  readonly key: string | number | null;
  props: { readonly [prop: string]: unknown };
  // One listener per event, added once. The handler an element carries is a new
  // closure on every render, so what is registered dispatches to whichever is
  // current — otherwise every render would add another listener to the same
  // node, and one click would run the handler as many times as it had rendered.
  listeners: Map<string, () => void> | null;
}

// Which node an element was drawn as, so a change naming the element can be
// answered without looking for it. Kept on the element for the same reason the
// record is kept on the node.
function drawnAs(element: Element): Node | undefined {
  return (element as unknown as { node?: Node }).node;
}

function drewAs(element: Element, node: Node): void {
  (element as unknown as { node?: Node }).node = node;
}

// Held on the node rather than in a table beside it. A thousand rows is eight
// thousand nodes, and a table of that many entries is a table the collector has
// to walk when they go — where a property is freed with the node that carried
// it. The name is the package's, so nothing else on a node can collide.
const RECORD = "@backtickjs";

function recordOf(node: Node): Rendered | undefined {
  return (node as unknown as { [RECORD]?: Rendered })[RECORD];
}

function remember(node: Node, record: Rendered): void {
  (node as unknown as { [RECORD]?: Rendered })[RECORD] = record;
}

// What a render asks for in one child position.
type Wanted =
  | { readonly kind: "element"; readonly source: Element }
  | { readonly kind: "text"; readonly value: string };

// Builds the DOM for an element tree, and keeps the nodes it already built.
//
// A re-render is a whole tree — the instance evaluates again and hands back
// everything it draws — so what stays on screen is decided here, by matching
// what is wanted against what is there. Keyed children match by key wherever
// they moved to; unkeyed ones match by position among their own tag, which is
// what a page's own structure is. Anything left over is removed.
export function renderInto(container: globalThis.Element, tree: unknown): void {
  patch(container, wanted(tree));
}

// One prop of one element is different, and nothing else is. Answered where it
// landed rather than by reading the tree again: the element says which node it
// was drawn as, and one attribute is set.
//
// A change naming an element this never drew is nothing to do — a tree the host
// has not rendered yet, or one it has already replaced.
export function applyChange(change: Change): void {
  if (change.kind !== "prop") {
    return;
  }
  const node = drawnAs(change.element);
  const was = node === undefined ? undefined : recordOf(node);
  if (node === undefined || was === undefined || handled.has(change.prop)) {
    return;
  }
  const { prop, value } = change;
  if (typeof value === "function") {
    if (prop.startsWith("on")) {
      was.listeners?.set(prop.slice(2), value as () => void);
    }
    return;
  }
  if (typeof value === "object" && value !== null) {
    return;
  }
  was.props = { ...was.props, [prop]: value };
  attribute(node as globalThis.Element, prop, value);
}

// The children a value asks for, with fragments flattened into their parent:
// a fragment has no node, so its children are the parent's children.
function wanted(value: unknown, into: Wanted[] = []): Wanted[] {
  if (value === null || value === undefined || value === false) {
    return into;
  }
  if (Array.isArray(value)) {
    for (const each of value) {
      wanted(each, into);
    }
    return into;
  }
  if (isElement(value)) {
    if (value.id === FRAGMENT_ID) {
      return wanted(value.props.children, into);
    }
    into.push({ kind: "element", source: value });
    return into;
  }
  into.push({ kind: "text", value: String(value) });
  return into;
}

function patch(parent: globalThis.Element, children: Wanted[]): void {
  // Only what this renderer put here. A page's own markup inside the mount
  // point is neither matched nor moved nor removed — it isn't ours.
  const existing = Array.from(parent.childNodes).filter((node) =>
    recordOf(node) !== undefined,
  );

  // Nothing to match against: everything is built, and built into a fragment so
  // a thousand rows are one insertion rather than a thousand.
  if (existing.length === 0) {
    if (children.length === 0) {
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const want of children) {
      fragment.appendChild(build(want));
    }
    parent.appendChild(fragment);
    return;
  }

  // Nothing wanted: what is here goes, in one call where all of it is ours.
  if (children.length === 0) {
    if (existing.length === parent.childNodes.length) {
      parent.replaceChildren();
    } else {
      for (const node of existing) {
        parent.removeChild(node);
      }
    }
    return;
  }

  // What is there now, indexed the two ways a match can be made: a keyed node
  // is found wherever it moved to, an unkeyed one by being the next of its kind.
  const keyed = new Map<string, number>();
  const spare: number[] = [];
  existing.forEach((node, at) => {
    const was = recordOf(node);
    if (was === undefined) {
      return;
    }
    if (was.key === null) {
      spare.push(at);
    } else {
      keyed.set(identity(was.id, was.key), at);
    }
  });

  // Where each wanted child comes from, as an index into what is there — `-1`
  // for one that has to be built. This is the whole of the matching; the moving
  // below reads nothing else.
  const from: number[] = [];
  const taken = new Set<number>();
  let next = 0;
  for (const want of children) {
    const id = want.kind === "text" ? TEXT_ID : want.source.id;
    let found = -1;
    if (want.kind === "element" && want.source.key !== null) {
      const at = keyed.get(identity(id, want.source.key));
      found = at !== undefined && !taken.has(at) ? at : -1;
    } else {
      for (let at = next; at < spare.length; at++) {
        const candidate = spare[at] as number;
        if (
          !taken.has(candidate) &&
          recordOf(existing[candidate] as Node)?.id === id
        ) {
          found = candidate;
          next = at + 1;
          break;
        }
      }
    }
    from.push(found);
    if (found !== -1) {
      taken.add(found);
    }
  }

  for (const [at, node] of existing.entries()) {
    if (!taken.has(at)) {
      parent.removeChild(node);
    }
  }

  const nodes = children.map((want, at) => {
    const reuse = from[at];
    if (reuse === undefined || reuse === -1) {
      return build(want);
    }
    const node = existing[reuse] as Node;
    update(node, want);
    return node;
  });

  // Moved only where the order actually changed. The longest run of children
  // whose old positions are already increasing stays exactly where it is;
  // everything else is placed before the child that follows it, which is
  // already in place because this walks backwards. Swapping two rows of a
  // thousand moves two nodes, not the nine hundred between them.
  const stable = new Set(keepable(from));
  for (let at = children.length - 1; at >= 0; at--) {
    const node = nodes[at] as Node;
    if (stable.has(at)) {
      continue;
    }
    const anchor = nodes[at + 1] ?? null;
    if (node.nextSibling !== anchor || node.parentNode !== parent) {
      parent.insertBefore(node, anchor);
    }
  }
}

// The positions worth leaving alone: the longest subsequence of children whose
// sources are already in increasing order. A child built fresh is never one —
// it has nowhere to have stayed.
function keepable(from: number[]): number[] {
  const ends: number[] = [];
  const previous = new Array<number>(from.length).fill(-1);
  for (const [at, source] of from.entries()) {
    if (source === -1) {
      continue;
    }
    let low = 0;
    let high = ends.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      if ((from[ends[middle] as number] as number) < source) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    previous[at] = low > 0 ? (ends[low - 1] as number) : -1;
    ends[low] = at;
  }
  const kept: number[] = [];
  let at = ends.length === 0 ? -1 : (ends[ends.length - 1] as number);
  while (at !== -1) {
    kept.push(at);
    at = previous[at] as number;
  }
  return kept;
}

// A key is only ever compared within a tag, so the two are matched together.
const identity = (id: string, key: string | number): string =>
  `${id}:${JSON.stringify(key)}`;

function build(want: Wanted): Node {
  if (want.kind === "text") {
    const node = document.createTextNode(want.value);
    remember(node, {
      source: null,
      drew: null,
      id: TEXT_ID,
      key: null,
      props: {},
      listeners: null,
    });
    return node;
  }
  const node = document.createElement(tagFor(want.source.id));
  remember(node, {
    source: null,
    drew: null,
    id: want.source.id,
    key: want.source.key,
    props: {},
    listeners: null,
  });
  update(node, want);
  return node;
}

function update(node: Node, want: Wanted): void {
  const was = recordOf(node);
  if (was === undefined) {
    return;
  }
  if (want.kind === "text") {
    if (node.nodeValue !== want.value) {
      node.nodeValue = want.value;
    }
    return;
  }
  // Same element, same props: this node and everything under it is already
  // what it should be, and walking it would only confirm that.
  if (was.source === want.source && was.drew === want.source.props) {
    return;
  }
  const element = node as globalThis.Element;
  const props = want.source.props;

  for (const prop in props) {
    if (handled.has(prop)) {
      continue;
    }
    const value = props[prop];
    // An element names its own events, and the prop is the listener's name:
    // `onclick` is a click. The registration is made once and reads the current
    // handler when it fires, so a re-render replaces what runs rather than
    // adding another listener beside it.
    if (typeof value === "function") {
      if (prop.startsWith("on")) {
        const event = prop.slice(2);
        const listeners = (was.listeners ??= new Map());
        if (!listeners.has(event)) {
          element.addEventListener(event, () => listeners.get(event)?.());
        }
        listeners.set(event, value as () => void);
      }
      continue;
    }
    if (typeof value === "object" && value !== null) {
      continue;
    }
    if (value === was.props[prop]) {
      continue;
    }
    attribute(element, prop, value);
  }

  // A prop that was set and is now gone. Handlers stay registered — the
  // dispatch reads what is current, and nothing current is what nothing does.
  for (const prop of Object.keys(was.props)) {
    if (!(prop in props) && !handled.has(prop)) {
      element.removeAttribute(prop.toLowerCase());
    }
    if (!(prop in props)) {
      was.listeners?.delete(prop.slice(2));
    }
  }

  drewAs(want.source, node);
  const children = was.props["children"];
  was.props = props;
  was.source = want.source;
  was.drew = props;
  // Children the instance handed back unchanged are the same value, and the
  // nodes drawn from them are already there.
  if (children !== props["children"]) {
    patch(element, wanted(props.children));
  }
}

function attribute(
  node: globalThis.Element,
  prop: string,
  value: unknown,
): void {
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
