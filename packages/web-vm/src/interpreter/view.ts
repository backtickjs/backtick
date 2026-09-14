import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  Bundle,
  BundleArrayElement,
  BundleElement,
  BundleComponentCall,
} from "@backtickjs/language";
import {
  createMemo,
  createRoot,
  createSignal,
  getOwner,
  mapArray,
  untrack,
} from "solid-js";
import { createRenderer, type Renderer } from "solid-js/universal";
import type { RendererOptions } from "./RendererOptions.js";
import type { ClientOptions } from "./ClientOptions.js";
import type { Instance } from "./Instance.js";
import { compile, evaluate as evaluateNode, scopeOf } from "./interpret.js";
import type { Scope } from "./interpret.js";

// The view half: turning a drawing function into the host's own nodes, once,
// and
// keeping them current through the reactive graph rather than by building them
// again.
//
// Nothing here is redrawn. An element becomes a node when its instance is
// created, and every part of it that can change is a computation of its own: a
// prop is an effect that sets that one prop, and a children position is an
// `insert` that reconciles what it evaluates to. So a write moves exactly the
// props and the lists that read what was written, and everything above and
// around them is untouched — there is no pass over the tree to find out what
// changed, because whatever changed said so.

/**
 * Renders a bundle into one of the host's nodes, and keeps it there: a write to
 * a state cell re-runs the props and the lists that read it, and the target
 * follows. The returned function takes it all down again.
 *
 * Drawn into the back of the target, and only what was drawn is ever moved: a
 * target the host is already holding something in keeps what it held, and this
 * goes after it. A target that holds nothing else needs nothing more than that.
 *
 * An anchor says where to end instead: one of the target's children, drawn in
 * front of and kept in front of, so what the host holds after it stays after
 * what is drawn. It has to stay where it is for as long as the drawing does —
 * it is what says where the drawing ends. Left out where the target holds only
 * this, which is every case with nothing to stay after.
 */
export function render<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
  parent: NodeType,
  anchor?: NodeType,
): () => void {
  const renderer = rendererOf(options.renderer);
  return createRoot((dispose) => {
    renderer.insert(parent, materialize(bundle, options, renderer), anchor);
    return dispose;
  });
}

/**
 * Evaluates a bundle's root and builds whatever it draws, without mounting it
 * anywhere: the host's nodes, or plain data where that is what the root is.
 *
 * An owner for whatever it builds, and nothing is handed back to drop it with:
 * a mount lasts as long as whoever asked for it, and there is no unmounting
 * this to be the other half of.
 */
export function evaluate<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
): unknown {
  return createRoot(() =>
    materialize(bundle, options, rendererOf(options.renderer)),
  );
}

function materialize<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
  renderer: Renderer<NodeType>,
): unknown {
  const { window, builtins } = options;
  return evaluated(bundle, { renderer, window, builtins });
}

/**
 * A bundle, drawn with a host's renderer, window and names.
 *
 * A `functions` table per bundle, because the labels are per bundle: two
 * bundles both holding a `0` mean two different functions.
 */
export function evaluated(
  bundle: Bundle<ClientUnknown>,
  { renderer, window, builtins }: Omit<Instance, "bundle" | "functions">,
): unknown {
  // Built once: nothing above the root can hand it anything new later.
  return evaluateNode(
    { bundle, renderer, window, builtins, functions: new Map() },
    bundle.root,
    scopeOf(null),
  );
}

// A renderer per set of target operations.
function rendererOf<NodeType extends object>(
  options: RendererOptions<NodeType>,
): Renderer<NodeType> {
  requireReactivity();
  return createRenderer(options);
}

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

// Whether the Solid in the graph is the reactive one.
//
// Node resolves `solid-js` to the server build, where a computation runs once
// and a write does nothing at all — reactivity that is inert without ever
// saying so, which is every one of these tests passing on values that never
// moved. Running under `--conditions=browser` is what picks the reactive build,
// and this is what says so when nothing did.
let checked = false;

function requireReactivity(): void {
  if (checked) {
    return;
  }
  checked = true;
  const live = createRoot((dispose) => {
    const [read, write] = createSignal(0);
    const doubled = createMemo(() => read() * 2);
    write(21);
    const moved = doubled() === 42;
    dispose();
    return moved;
  });
  if (!live) {
    throw new Error(
      "this Solid build is inert: a write moved nothing. Node resolves " +
        "`solid-js` to the server build — run with `--conditions=browser`.",
    );
  }
}

/**
 * An inline element, as the closure that builds one.
 *
 * Built once per instance, so the work here happens once per element that
 * exists rather than once per element per render. What a prop or a children
 * position is — a value the bundle carried or an expression somebody computes —
 * was decided when the bundle was written, so it is decided here too: a static
 * prop is set and forgotten, and only what can change costs a computation.
 */
export function compileElement(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const id = element[1];
  // The two ids whose meaning is the language's rather than this client's: they
  // draw no node, so neither reaches the renderer. Answered here, where an id
  // is read, so a client implements them exactly where it implements its own
  // tags.
  if (id === "for") {
    return compileFor(instance, element);
  }
  if (id === "Fragment") {
    return compileFragment(instance, element);
  }
  // Every prop, in the order the element wrote them, because a host may care:
  // an `<input>` wants its `type` before its `value`.
  const props = Object.entries(element[2]).map(([prop, expr]) => {
    const fixed = isFixed(expr);
    return [prop, compile(instance, expr), fixed] as const;
  });
  const children = element[3];
  const draw = children === null ? null : compileChildren(instance, children);
  return (scope) => {
    const renderer = instance.renderer;
    // Where it stands, what it is made in, and what its children are drawn in:
    // an `svg` enters SVG, and a `foreignObject`'s children are HTML again.
    const owner = getOwner()!;
    const outerNamespace: Namespace = owner.context?.[NAMESPACE] ?? "html";
    const namespace = id === "svg" ? "svg" : outerNamespace;
    const innerNamespace = id === "foreignObject" ? "html" : namespace;
    // The host hears SVG's as `svg:<tag>`; the wire carries no prefix.
    const node = renderer.createElement(namespace === "svg" ? `svg:${id}` : id);
    for (const [prop, read, fixed] of props) {
      // It cannot change, so set it and be done: no computation to make, and
      // none held for as long as the element is.
      if (fixed) {
        renderer.setProp(node, prop, read(scope));
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
        const value = read(scope);
        return value === previous
          ? previous
          : renderer.setProp(node, prop, value, previous);
      });
    }
    if (draw !== null) {
      if (innerNamespace === outerNamespace) {
        renderer.insert(node, draw(scope));
      } else {
        withNamespace(innerNamespace, () => renderer.insert(node, draw(scope)));
      }
    }
    return node as ClientValue;
  };
}

// Whether what a position holds can change after it has first been read.
//
// True where the node's own shape proves it cannot: a literal is its own value,
// an arrow is a closure — making one reads nothing, whatever calling it later
// would read — and an element is built once, what moves inside it having its
// own computations. False where this cannot tell, which is not the same as
// saying it moves: `row.id` reads a binding and never changes, and this says
// false about it.
function isFixed(expr: BundleArrayElement): boolean {
  if (!Array.isArray(expr)) {
    if (expr === null || typeof expr !== "object") {
      return true;
    }
    return Object.values(expr).every((member) => isFixed(member));
  }
  if (expr[0] === "arr") {
    return expr[1].every((member) => isFixed(member));
  }
  return expr[0] === "=>" || expr[0] === "el";
}

// A children position, member by member: what cannot change is a node handed
// over once, and only the rest costs a computation.
//
// What comes back is what `insert` takes: a node, a value, an accessor, or an
// array of those.
function compileChildren(
  instance: Instance,
  expr: BundleArrayElement,
  inArray = false,
): (scope: Scope | null) => unknown {
  // A list of children travels as data, which is a node like any other.
  if (Array.isArray(expr) && expr[0] === "arr") {
    const members = expr[1].map((member) =>
      compileChildren(instance, member, true),
    );
    return (scope) => members.map((member) => member(scope));
  }
  const read = compile(instance, expr);
  // Nothing that can change, so nothing to watch.
  if (isFixed(expr)) {
    return (scope) => read(scope);
  }
  // An accessor, so `insert` watches it. Alone in the position, `insert` reads
  // what it answered with in a second computation, so a `<for />` or a drawn
  // bundle changing re-runs that one and not this.
  if (!inArray) {
    return (scope) => () => read(scope);
  }
  // In an array, `insert` reads the member and what it answered with in the one
  // computation, so that change would run this again — and where this is a
  // component, that is a second component with fresh state. The memo answers
  // with the same drawing rather than building another.
  return (scope) => createMemo(() => read(scope));
}

// Children with no element of their own.
//
// The position a drawing needs where what it draws is not an element: its
// members are compiled as an array's are, so each owns a computation. What
// stands here is watched, and the block that answered with it is not run again
// when it changes.
function compileFragment(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const children = element[3];
  if (children === null) {
    return () => null;
  }
  const draw = compileChildren(instance, children, true);
  return (scope) => draw(scope) as ClientValue;
}

/**
 * A call of a component a script holds: called once, untracked, with its
 * props as a record whose members are read again on every access — what keeps
 * a prop live for a function the bundler never saw.
 */
export function compileComponentCall(
  instance: Instance,
  node: BundleComponentCall,
): (scope: Scope | null) => ClientValue {
  const callee = compile(instance, node[1]);
  const props = Object.entries(node[2]).map(
    ([name, expression]) => [name, compile(instance, expression)] as const,
  );
  if (node[3] !== null) {
    props.push(["children", compile(instance, node[3])]);
  }
  return (scope) => {
    const record: { [key: string]: ClientValue } = {};
    for (const [name, read] of props) {
      Object.defineProperty(record, name, {
        get: () => read(scope),
        enumerable: true,
      });
    }
    const called = callee(scope);
    if (typeof called !== "function") {
      throw new Error("a component call names a function, and this is not one");
    }
    return untrack(() =>
      (called as (props: ClientValue) => ClientValue)(record),
    );
  };
}

/**
 * A list: one drawing per member of the array its `each` prop holds.
 *
 * The client walks the array itself, so `mapArray` keeps the drawing of a
 * member that is still there, drops what a member that has gone drew, and draws
 * only what is new. Identity is the member's own — nothing here extracts a key.
 *
 * An element whose children are applied rather than drawn, so nothing here
 * reaches for the renderer: what a list contributes is what its child drew per
 * member, and the position it stands in inserts that as it would any list.
 */
function compileFor(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const each = compile(instance, element[2]["each"] ?? null);
  const children = compile(instance, element[3]);
  return (scope) => {
    const members = createMemo(() => {
      const value = each(scope);
      return Array.isArray(value) ? value : [];
    });
    // Made once: the member arrives as an argument.
    const one = children(scope) as (...args: ClientValue[]) => ClientValue;
    // The index is `mapArray`'s own signal, handed over as storage rather than
    // as the number it holds: whoever reads it is reading where the member sits
    // now.
    return mapArray(members, (member, at) => one(member, { read: at }));
  };
}
