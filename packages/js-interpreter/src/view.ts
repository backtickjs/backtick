import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleArrayElement,
  BundleElement,
  BundleFunction,
} from "@backtickjs/core";
import { createMemo, createRoot, createSignal, mapArray } from "solid-js";
import { createRenderer } from "solid-js/universal";
import type { Renderer, RendererOptions } from "solid-js/universal";
import { compile, evaluate as evaluateNode, scopeOf } from "./interpret.js";
import type { Compiled, Scope } from "./interpret.js";
import { isApplied } from "./Value.js";
import type { Value } from "./Value.js";

// The view half: turning a tree entry into the host's own nodes, once, and
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

// A host as this file uses one: the renderer Solid builds from the ten
// operations a host implements. Typed over `object` because the interpreter
// never looks inside a node — it holds them, hands them back, and lets the
// host say what they mean.
export type Host = Renderer<object>;

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
  const host = hostOf(options);
  return createRoot((dispose) => {
    host.insert(target, materialize(bundle, host));
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
  return createRoot(() => materialize(bundle, hostOf(options)));
}

function materialize(bundle: Bundle, host: Host): unknown {
  // The root is evaluated in no instance: nothing above it to have supplied
  // arguments, and nothing above it to have bound anything.
  const instance: Instance = { bundle, host, entries: new Map() };
  // The root is built once and never again — there is nothing above it to hand
  // it anything new — so its applications resolve where they stand, lists
  // included.
  return drawn(
    evaluateNode(bundle, bundle.root, scopeOf(null, instance)),
    instance,
  );
}

// A renderer per set of host operations. The cast is the one place the
// interpreter's `object` meets the host's own node type: every node this holds
// came from the host and goes back to it untouched, so what it is, is the
// host's business throughout.
function hostOf<N extends object>(options: RendererOptions<N>): Host {
  requireReactivity();
  return createRenderer(options as RendererOptions<object>) as Host;
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

// What an instance carries: the bundle being drawn and the host drawing it.
// One per mount rather than one per instantiation — an entry's cells are
// bindings in its call, so nothing here differs between two of them.
export interface Instance {
  readonly bundle: Bundle;
  readonly host: Host;
  // Each drawing entry as the function it evaluates to, so a row's entry is
  // evaluated once however many rows there are.
  readonly entries: Map<BundleFunction, (...args: Value[]) => Value>;
}

/**
 * Builds an instance of an entry by calling it.
 *
 * Nothing owns this but whoever is building. An instance created for a row of a
 * list belongs to that row's owner, so dropping the row drops the instance and
 * everything it made, and an instance built in a fixed position lives as long
 * as the mount does. Neither is registered anywhere, because neither has to be
 * found again.
 */
export function instantiate(
  instance: Instance,
  entry: BundleFunction,
  args: Value[],
): unknown {
  let drawing = instance.entries.get(entry);
  if (drawing === undefined) {
    drawing = evaluateNode(
      instance.bundle,
      entry[NodeField.content],
      scopeOf(null, instance),
    ) as (...args: Value[]) => Value;
    instance.entries.set(entry, drawing);
  }
  // Instantiating is calling: the cells the entry declares are bound in this
  // call, and what it yields is what to draw.
  return build(drawing(...args), instance);
}

// What an evaluated tree expression draws, in a position that draws exactly
// one thing: the entry's content, or a prop. An application becomes an
// instance here; everything else already is what it draws.
function build(value: Value, instance: Instance): unknown {
  if (!isApplied(value)) {
    return value;
  }
  return instantiate(instance, value.entry, value.args);
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
  bundle: Bundle,
  element: BundleElement,
): Compiled {
  const id = element[NodeField.id];
  // The two elements every target has, recognized by the id they agree on.
  // Neither draws a node: one puts its children where it stands, the other
  // draws one thing per member of an array.
  if (id === "Fragment") {
    return compileFragment(bundle, element);
  }
  if (id === "For") {
    return compileFor(bundle, element);
  }
  // Every prop, with how to read it and whether reading it again could say
  // anything different — in the order the element wrote them, because a host
  // may care: an `<input>` wants its `type` before its `value`.
  //
  // A value the bundle spelled out needs no case of its own. Compiling one
  // yields a reader that hands it back, and nothing the bundler could mark
  // would make it move, so it takes the same path a handler does: set once, and
  // never looked at again. A computation watching a constant would be a
  // computation per attribute per element for nothing.
  const props = Object.entries(element[NodeField.props] ?? {})
    .filter(([prop]) => prop !== "children")
    .map(([prop, expr]) => {
      const fixed = isFixed(bundle, expr);
      return [prop, compile(bundle, expr), fixed] as const;
    });
  const children = element[NodeField.props]?.["children"];
  const draw =
    children === undefined ? null : compileChildren(bundle, children);
  return (scope) => {
    const instance = instanceOf(scope);
    const host = instance.host;
    const node = host.createElement(id);
    for (const [prop, read, fixed] of props) {
      if (fixed) {
        host.setProp(node, prop, read(scope));
        continue;
      }
      // One effect per prop, so a write moves that one prop of that one node.
      // It re-runs only when something the expression itself read has changed;
      // nothing tells it to look.
      //
      // Re-running is not the same as changing: a cell a whole list reads is
      // what decides one row's class, and every other row recomputes the class
      // it already has. The host hears about a prop when the prop moved, so
      // that is a comparison here rather than a write per row per selection.
      // A handler is a new closure whenever what it captured changed, so it
      // compares unequal and is registered again, as before.
      host.effect((previous) => {
        const value = read(scope);
        return value === previous
          ? previous
          : host.setProp(node, prop, value, previous);
      });
    }
    if (draw !== null) {
      host.insert(node, draw(scope, instance));
    }
    return node as Value;
  };
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
  bundle: Bundle,
  expr: BundleArrayElement,
): (scope: Scope | null, instance: Instance) => unknown {
  if (Array.isArray(expr)) {
    const members = expr.map((member) => compileChildren(bundle, member));
    return (scope, instance) =>
      members.map((member) => member(scope, instance));
  }
  const read = compile(bundle, expr);
  // Nothing that moves, so `insert` is handed what this draws rather than a way
  // of asking for it, and makes no computation to watch it. That covers a value
  // the bundle spelled out, an element — whatever moves inside one is the
  // element's own business, bound when it was built — and an entry the bundler
  // vouched for, a row's own label say.
  if (isFixed(bundle, expr)) {
    return mayApply(expr)
      ? (scope, instance) => drawn(read(scope), instance)
      : (scope) => read(scope);
  }
  return (scope, instance) => () => drawn(read(scope), instance);
}

// Whether what this expression evaluates to has to be built.
//
// Only an application does, and only some expressions can produce one. A value
// the bundle carried is already what it draws, and an element is the node it
// made — what a fragment holds was built as the fragment was, and a list draws
// its own members. Asking costs nothing here and saves a walk per position per
// instance, which is a walk per element of every row of a list.
function mayApply(expr: BundleArrayElement): boolean {
  if (expr === null || typeof expr !== "object") {
    return false;
  }
  if (Array.isArray(expr)) {
    return expr.some(mayApply);
  }
  return (expr as Record<string, unknown>)["#"] !== NodeKind.Element;
}

// Whether what this expression evaluates to can change once it has been built.
//
// For an entry applied the bundler answered it, so nothing here walks a body to
// find out: an entry it could not vouch for carries no mark, and a mark is the
// only yes. The rest this reads itself, because they are shapes rather than
// scripts — and what it does not recognize it assumes moves.
function isFixed(bundle: Bundle, expr: BundleArrayElement): boolean {
  if (expr === null || typeof expr !== "object") {
    return true;
  }
  // A list can move if anything in it can.
  if (Array.isArray(expr)) {
    return expr.every((member) => isFixed(bundle, member));
  }
  const node = expr as Record<string, unknown>;
  // An element is built once and is thereafter its own: every part of it that
  // can change was bound to a computation of its own when it was built, so the
  // position holding it never has to look again.
  if (node["#"] === NodeKind.Element) {
    return true;
  }
  if (node["#"] !== NodeKind.ApplyFunction) {
    return false;
  }
  const label = node[NodeField.label];
  return (
    typeof label === "string" &&
    bundle.functions[label]?.[NodeField.fixed] === true
  );
}

/**
 * A fragment: its children where it stands, and no node of its own.
 */
function compileFragment(bundle: Bundle, element: BundleElement): Compiled {
  const children = element[NodeField.props]?.["children"];
  if (children === undefined) {
    return () => null;
  }
  const draw = compileChildren(bundle, children);
  return (scope) => draw(scope, instanceOf(scope)) as Value;
}

/**
 * A list: one drawing per member of an array.
 *
 * The client walks the array itself, so `mapArray` keeps the drawing of a
 * member that is still there, drops what a member that has gone drew, and draws
 * only what is new. Identity is the member's own — nothing here extracts a key.
 */
function compileFor(bundle: Bundle, element: BundleElement): Compiled {
  const props = element[NodeField.props] ?? {};
  const each = props["each"];
  const body = props["children"];
  if (each === undefined || body === undefined) {
    throw new Error("a `For` needs an `each` array and a child to draw");
  }
  const source = compile(bundle, each);
  const draw = compile(bundle, body);
  return (scope) => {
    const instance = instanceOf(scope);
    const members = createMemo(() => {
      const value = source(scope);
      return Array.isArray(value) ? (value as Value[]) : [];
    });
    // Made once: it closes over this instance, and the member arrives as an
    // argument.
    const one = draw(scope) as (...args: Value[]) => Value;
    // The index is `mapArray`'s own signal, handed over as storage rather than
    // as the number it holds: whoever reads it is reading where the member sits
    // now.
    return mapArray(members, (member, at) =>
      drawn(one(member, { read: at } as Value), instance),
    ) as unknown as Value;
  };
}

// What a settled children position holds, with its applications built: the same
// walk `build` does, through the arrays a children position can be.
function drawn(value: Value, instance: Instance): unknown {
  if (Array.isArray(value)) {
    return value.map((member) => drawn(member, instance));
  }
  return build(value, instance);
}

// The instance a tree expression is being evaluated in. A tree expression is
// only ever evaluated while an instance is being built, so there is always one;
// a scope without one is a body's, and no tree node reaches a body.
export function instanceOf(scope: Scope | null): Instance {
  if (scope === null || scope.instance === null) {
    throw new Error("no instance to draw in");
  }
  return scope.instance;
}
