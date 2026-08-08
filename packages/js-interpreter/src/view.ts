import type {
  Bundle,
  BundleArrayElement,
  BundleElement,
  BundleFor,
} from "@backtickjs/core";
import { createMemo, createRoot, createSignal, mapArray } from "solid-js";
import { createRenderer, type Renderer } from "solid-js/universal";
import type { RendererOptions } from "./RendererOptions.js";
import type { Instance } from "./Instance.js";
import { compile, evaluate as evaluateNode, scopeOf } from "./interpret.js";
import type { Scope } from "./interpret.js";
import type { Value } from "./Value.js";

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
 */
export function render<N extends object>(
  bundle: Bundle,
  options: RendererOptions<N>,
  target: N,
): () => void {
  const renderer = rendererOf(options);
  return createRoot((dispose) => {
    renderer.insert(target, materialize(bundle, renderer));
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
export function evaluate<N extends object>(
  bundle: Bundle,
  options: RendererOptions<N>,
): unknown {
  return createRoot(() => materialize(bundle, rendererOf(options)));
}

function materialize(bundle: Bundle, renderer: Renderer<object>): unknown {
  const instance: Instance = { bundle, renderer, functions: new Map() };
  // The root is built once and never again — there is nothing above it to hand
  // it anything new — so its applications resolve where they stand, lists
  // included.
  return evaluateNode(instance, bundle.root, scopeOf(null));
}

// A renderer per set of target operations. The cast is the one place the
// interpreter's `object` meets the target's own node type: every node this
// holds came from the target and goes back to it untouched, so what it is, is
// the target's business throughout.
function rendererOf<N extends object>(
  options: RendererOptions<N>,
): Renderer<object> {
  requireReactivity();
  return createRenderer(options as RendererOptions<object>);
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
): (scope: Scope | null) => Value {
  const id = element[1];
  // The one element every target has and no target draws: its children go
  // where it stands. Recognized by the id they agree on, where a list — the
  // other thing that draws no node — has a kind of its own.
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
    const node = renderer.createElement(id);
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
      renderer.insert(node, draw(scope));
    }
    return node as Value;
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
  if (expr[0] === 4 /* DataArray */) {
    return expr[1].every((member) => isFixed(member));
  }
  return expr[0] === 1005 /* ArrowFunction */ || expr[0] === 0 /* Element */;
}

// A children position, compiled member by member.
//
// One member being computed says nothing about the others: a card whose middle
// child is a list still has a picture and three labels that the bundle spelled
// out, and those are built once and never looked at again. So an array is
// compiled as an array — what `insert` reconciles is the members that can
// change, in place, and the rest are nodes sitting between them.
//
// What comes back is what `insert` takes: a node, a value, an accessor for a
// member that moves, or an array of those.
function compileChildren(
  instance: Instance,
  expr: BundleArrayElement,
): (scope: Scope | null) => unknown {
  // A list of children travels as data, which is a node like any other.
  if (Array.isArray(expr) && expr[0] === 4 /* DataArray */) {
    const members = (expr[1] as BundleArrayElement[]).map((member) =>
      compileChildren(instance, member),
    );
    return (scope) => members.map((member) => member(scope));
  }
  const read = compile(instance, expr);
  // A value where it cannot change, so `insert` makes no computation to watch
  // it; a way of asking, where it might.
  if (isFixed(expr)) {
    return (scope) => read(scope);
  }
  return (scope) => () => read(scope);
}

/**
 * A fragment: its children where it stands, and no node of its own.
 */
function compileFragment(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => Value {
  const children = element[3];
  if (children === null) {
    return () => null;
  }
  const draw = compileChildren(instance, children);
  return (scope) => draw(scope) as Value;
}

/**
 * A list: one drawing per member of an array.
 *
 * The client walks the array itself, so `mapArray` keeps the drawing of a
 * member that is still there, drops what a member that has gone drew, and draws
 * only what is new. Identity is the member's own — nothing here extracts a key.
 */
export function compileFor(
  instance: Instance,
  node: BundleFor,
): (scope: Scope | null) => Value {
  const each = compile(instance, node[1]);
  const children = compile(instance, node[2]);
  return (scope) => {
    const members = createMemo(() => {
      const value = each(scope);
      return Array.isArray(value) ? (value as Value[]) : [];
    });
    // Made once: the member arrives as an argument.
    const one = children(scope) as (...args: Value[]) => Value;
    // The index is `mapArray`'s own signal, handed over as storage rather than
    // as the number it holds: whoever reads it is reading where the member sits
    // now.
    return mapArray(members, (member, at) =>
      one(member, { read: at } as Value),
    ) as unknown as Value;
  };
}
