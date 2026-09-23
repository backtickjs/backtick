import type { ClientValue } from "@backtickjs/core";
import { createMemo, getOwner, mapArray, untrack } from "solid-js";
import type { Renderer } from "solid-js/universal";

// Turning a drawing into the host's own nodes, once, and keeping them current
// through the reactive graph rather than by building them again.
//
// Nothing here is redrawn. An element becomes a node when its instance is
// created, and every part of it that can change is a computation of its own: a
// prop is an effect that sets that one prop, and a children position is an
// `insert` that reconciles what it evaluates to. So a write moves exactly the
// props and the lists that read what was written, and everything above and
// around them is untouched — there is no pass over the tree to find out what
// changed, because whatever changed said so.
//
// Shared by the interpreter and by printed bundles, which hand over the same
// reads as closures.

/** A position's value, read again whenever what it read changes. */
export type Read = () => ClientValue;

/** A prop: its name, its read, and whether its value can never change. */
export type DrawnProp = readonly [name: string, read: Read, fixed: boolean];

// The language an element is drawn in: HTML's unless it stands inside an `svg`,
// and HTML's again inside a `foreignObject`, as the DOM's parser decides. Read
// where the element is drawn rather than where it was written, so a component
// or a `<For>` row drawing `<circle>` inside an `svg` gets SVG.
//
// A key on the owner's context rather than `createContext`, which brings
// Solid's Provider and its `children` helper into the client for nothing.
const NAMESPACE = Symbol("namespace");
type Namespace = "html" | "svg";

// Draws with the namespace flipped, and flips it back after. What draws again
// later — a list's rows, a position's `insert` — keeps the flipped one: an
// owner copies the context it was made under.
function withNamespace(namespace: Namespace, draw: () => void): void {
  const owner = getOwner()!;
  const outer = owner.context;
  owner.context = { ...outer, [NAMESPACE]: namespace };
  try {
    draw();
  } finally {
    owner.context = outer;
  }
}

/** An element, built as a node of the renderer's, with its props and children. */
export function drawElement(
  renderer: Renderer<object>,
  id: string,
  props: readonly DrawnProp[],
  children: (() => unknown) | null,
): ClientValue {
  // Where it stands, what it is made in, and what its children are drawn in:
  // an `svg` enters SVG, and a `foreignObject`'s children are HTML again.
  const owner = getOwner()!;
  const outerNamespace: Namespace = owner.context?.[NAMESPACE] ?? "html";
  const namespace = id === "svg" ? "svg" : outerNamespace;
  const innerNamespace = id === "foreignObject" ? "html" : namespace;
  // The host hears SVG's as `svg:<tag>`; the wire carries no prefix.
  const node = renderer.createElement(namespace === "svg" ? `svg:${id}` : id);
  let ref: ClientValue = null;
  for (const [prop, read, fixed] of props) {
    // The language's, not an attribute: the element is handed to the
    // script once it is built.
    if (prop === "ref") {
      ref = read();
      continue;
    }
    // It cannot change, so set it and be done: no computation to make, and
    // none held for as long as the element is.
    if (fixed) {
      renderer.setProp(node, prop, read());
      continue;
    }
    // One effect per prop, so a write moves that one prop of that one node.
    // It re-runs only when something the expression itself read has changed;
    // nothing tells it to look.
    //
    // Re-running is not the same as changing: a state a whole list reads is
    // what decides one row's class, and every other row recomputes the class
    // it already has. The host hears about a prop when the prop moved, so
    // that is a comparison here rather than a write per row per selection.
    // A handler is a new closure whenever what it captured changed, so it
    // compares unequal and is registered again, as before.
    renderer.effect((previous) => {
      const value = read();
      return value === previous
        ? previous
        : renderer.setProp(node, prop, value, previous);
    });
  }
  if (children !== null) {
    if (innerNamespace === outerNamespace) {
      renderer.insert(node, children());
    } else {
      withNamespace(innerNamespace, () => renderer.insert(node, children()));
    }
  }
  // Untracked, so what the callback reads never calls it again.
  if (typeof ref === "function") {
    const handOver = ref as (element: ClientValue) => void;
    untrack(() => handOver(node as ClientValue));
  }
  return node as ClientValue;
}

/**
 * A list: one drawing per member of the array `each` reads.
 *
 * The client walks the array itself, so `mapArray` keeps the drawing of a
 * member that is still there, drops what a member that has gone drew, and draws
 * only what is new. Identity is the member's own — nothing here extracts a key.
 *
 * Nothing here reaches for the renderer: what a list contributes is what its
 * child drew per member, and the position it stands in inserts that as it
 * would any list.
 */
export function drawList(each: Read, one: ClientValue): ClientValue {
  const members = createMemo(() => {
    const value = each();
    return Array.isArray(value) ? value : [];
  });
  const draw = one as (...args: ClientValue[]) => ClientValue;
  // The index is `mapArray`'s own signal, handed over as storage rather than
  // as the number it holds: whoever reads it is reading where the member sits
  // now.
  return mapArray(members, (member, at) =>
    draw(member, { get: at } as unknown as ClientValue),
  ) as unknown as ClientValue;
}

/**
 * A call of a component a script holds: called once, untracked, with its
 * props as a record whose members are read again on every access — what keeps
 * a prop live for a function the bundler never saw.
 */
export function callComponent(
  callee: ClientValue,
  props: readonly (readonly [name: string, read: Read])[],
): ClientValue {
  const record: { [key: string]: ClientValue } = {};
  for (const [name, read] of props) {
    Object.defineProperty(record, name, { get: read, enumerable: true });
  }
  if (typeof callee !== "function") {
    throw new Error("a component call names a function, and this is not one");
  }
  return untrack(() => (callee as (props: ClientValue) => ClientValue)(record));
}

/** A member of an array of children, kept as the one drawing it answered. */
export function memo(read: Read): ClientValue {
  return createMemo(read) as unknown as ClientValue;
}
