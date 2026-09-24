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

type Props = { readonly [name: string]: ClientValue };

/**
 * The web client's `jsx`: a function is a component, `for` is a list, and any
 * other tag an element of the renderer's.
 */
export function createJsx(
  renderer: Renderer<object>,
): (type: ClientValue, props: Props) => ClientValue {
  return (type, props) =>
    typeof type === "function"
      ? callComponent(type, props)
      : type === "for"
        ? drawList(props)
        : drawElement(renderer, type as string, props);
}

// Whether a prop can change: a bundle writes one that can as a getter.
function isGetter(props: Props, name: string): boolean {
  return Object.getOwnPropertyDescriptor(props, name)?.get !== undefined;
}

// What `insert` takes for children that arrived as a value: a child that can
// change arrives as a function of nothing, and is kept as the one drawing it
// answered, so a component among them is built once rather than again each
// time `insert` reads the array.
function childrenOf(value: ClientValue): unknown {
  if (Array.isArray(value)) {
    return value.map(childrenOf);
  }
  return typeof value === "function" && value.length === 0
    ? createMemo(() => childrenOf((value as () => ClientValue)()))
    : value;
}

/** An element, built as a node of the renderer's, with its props and children. */
function drawElement(
  renderer: Renderer<object>,
  id: string,
  props: Props,
): ClientValue {
  // Where it stands, what it is made in, and what its children are drawn in:
  // an `svg` enters SVG, and a `foreignObject`'s children are HTML again.
  const owner = getOwner()!;
  const outerNamespace: Namespace = owner.context?.[NAMESPACE] ?? "html";
  const namespace = id === "svg" ? "svg" : outerNamespace;
  const innerNamespace = id === "foreignObject" ? "html" : namespace;
  // The host hears SVG's as `svg:<tag>`; the wire carries no prefix.
  const node = renderer.createElement(namespace === "svg" ? `svg:${id}` : id);
  for (const prop of Object.keys(props)) {
    // The language's, not an attribute: the element is handed to the script
    // once it is built. Children are inserted below.
    if (prop === "ref" || prop === "children") {
      continue;
    }
    // It cannot change, so set it and be done: no computation to make, and
    // none held for as long as the element is.
    if (!isGetter(props, prop)) {
      renderer.setProp(node, prop, props[prop]);
      continue;
    }
    // One effect per prop, so a write moves that one prop of that one node.
    // It re-runs only when something the getter read has changed.
    //
    // Re-running is not the same as changing: a state a whole list reads is
    // what decides one row's class, and every other row recomputes the class
    // it already has. The host hears about a prop when the prop moved, so
    // that is a comparison here rather than a write per row per selection.
    renderer.effect((previous) => {
      const value = props[prop];
      return value === previous
        ? previous
        : renderer.setProp(node, prop, value, previous);
    });
  }
  // Read here, inside the namespace they are drawn in. A child that can
  // change runs this memo again; what can change in an array of them is a
  // function, memoized on its own, so its siblings are not built again.
  if ("children" in props) {
    const insert = () =>
      renderer.insert(
        node,
        createMemo(() => childrenOf(props["children"])),
      );
    if (innerNamespace === outerNamespace) {
      insert();
    } else {
      withNamespace(innerNamespace, insert);
    }
  }
  // Untracked, so what the callback reads never calls it again.
  const ref = props["ref"];
  if (typeof ref === "function") {
    const handOver = ref as (element: ClientValue) => void;
    untrack(() => handOver(node as ClientValue));
  }
  return node as ClientValue;
}

/**
 * A list: one drawing per member of the array `each` holds, drawn by
 * `children`.
 *
 * The client walks the array itself, so `mapArray` keeps the drawing of a
 * member that is still there, drops what a member that has gone drew, and draws
 * only what is new. Identity is the member's own — nothing here extracts a key.
 */
function drawList(props: Props): ClientValue {
  const members = createMemo(() => {
    const value = props["each"];
    return Array.isArray(value) ? value : [];
  });
  const draw = props["children"] as (...args: ClientValue[]) => ClientValue;
  // The index is `mapArray`'s own signal, handed over as storage rather than
  // as the number it holds: whoever reads it is reading where the member sits
  // now.
  return mapArray(members, (member, at) =>
    draw(member, { get: at } as unknown as ClientValue),
  ) as unknown as ClientValue;
}

/**
 * A component: called once, untracked, with its props, whose getters are read
 * again on every access — what keeps a prop live for a function the bundler
 * never saw.
 */
function callComponent(callee: ClientValue, props: Props): ClientValue {
  return untrack(() => (callee as (props: Props) => ClientValue)(props));
}

/** What `render` inserts for a bundle's root: see `childrenOf`. */
export function rootOf(value: ClientValue): unknown {
  return childrenOf(value);
}
