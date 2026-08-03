import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleElement,
  BundleExpr,
  BundleTree,
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
  // The root is evaluated in no instance: there is nothing above it to have
  // supplied slots, and nothing above it declares cells it could read.
  const outside: Instance = {
    bundle,
    host,
    slots: noSlots,
    cells: null,
    handles: null,
  };
  // The root is built once and never again — there is nothing above it to hand
  // it anything new — so its applications resolve where they stand, lists
  // included.
  return drawn(
    evaluateNode(bundle, bundle.root, scopeOf(null, outside)),
    outside,
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

// A tree instance: what persists on the client. `cells` is the storage the
// entry's `state` declares, allocated fresh per instance.
//
// There is no list of children here, and nothing recording what was drawn. An
// instance is built once and never again, so there is nothing to match a second
// building against: what a re-render used to recover, the graph now keeps.
export interface Instance {
  readonly bundle: Bundle;
  readonly host: Host;
  // What the parent handed over, read rather than held: for a row of a list it
  // is a computation over the last list evaluated, so handing a row new
  // arguments is a write and every prop that read one runs again. Equal
  // arguments are no write at all, which is the skip a row gets for being
  // handed nothing new.
  readonly slots: () => Value[];
  // A cell is a signal, so its storage and who hears about a write are the
  // graph's business rather than ours.
  cells: Map<string, [() => Value, (value: Value) => void]> | null;
  // The handle each cell is read through, made with the instance because the
  // cells a tree declares are known before it runs. One per cell for its life:
  // a handle is a view onto storage and holds nothing of its own, so a second
  // view of the same cell would only look like a different value to anything
  // comparing them.
  handles: Map<string, Value> | null;
}

const noSlots = (): Value[] => [];

/**
 * Builds an instance of a tree entry: its cells, then its content.
 *
 * Nothing owns this but whoever is building. An instance created for a row of a
 * list belongs to that row's owner, so dropping the row drops the instance and
 * everything it made, and an instance built in a fixed position lives as long
 * as the mount does. Neither is registered anywhere, because neither has to be
 * found again.
 */
export function instantiate(
  bundle: Bundle,
  tree: BundleTree,
  slots: () => Value[],
  host: Host,
): unknown {
  const instance: Instance = {
    bundle,
    host,
    slots,
    cells: null,
    handles: null,
  };
  for (const [name, initial] of Object.entries(tree[NodeField.state] ?? {})) {
    // A cell's initial is evaluated in no instance: it can't read a slot or
    // another cell, so nothing is in scope for it.
    (instance.cells ??= new Map()).set(
      name,
      createSignal<Value>(evaluateNode(bundle, initial, null)),
    );
    (instance.handles ??= new Map()).set(name, cellHandle(instance, name));
  }
  const content = tree[NodeField.content];
  // A null-content entry is still an instance — it holds the state its
  // component declared — so it is built as usual and draws nothing.
  if (content === null) {
    return null;
  }
  return build(
    evaluateNode(bundle, content, scopeOf(null, instance)),
    instance,
  );
}

// What an evaluated tree expression draws, in a position that draws exactly
// one thing: the entry's content, or a prop. An application becomes an
// instance here; everything else already is what it draws.
function build(value: Value, instance: Instance): unknown {
  if (!isApplied(value)) {
    return value;
  }
  // Fixed arguments: this position holds one application, evaluated when the
  // instance was built, so nothing will hand it different ones.
  const slots = value.slots;
  return instantiate(instance.bundle, value.tree, () => slots, instance.host);
}

// A cell's handle, as a script reads it: an ordinary object of functions, so it
// is a `Value` like anything else the interpreter hands a script. `read`
// observes the instance's current storage; `write` replaces it — and everything
// that read it runs again, which is the whole of what a write does. A handle a
// handler captured keeps working for the life of the instance because it
// resolves the cell by name at call time.
//
// The writers yield `null` rather than nothing. `void` is not a value this
// language has, and a function that returned one couldn't be passed where a
// value is expected — which a handle's members are.
function cellHandle(instance: Instance, name: string): Value {
  const cell = (): [() => Value, (value: Value) => void] => {
    const held = instance.cells?.get(name);
    if (held === undefined) {
      throw new Error(`unknown state cell ${name}`);
    }
    return held;
  };
  const read = () => cell()[0]() ?? null;
  const write = (value: Value): Value => {
    cell()[1](() => value);
    return null;
  };
  const update = (updater: (current: Value) => Value): Value => {
    return write(updater(cell()[0]() ?? null));
  };
  return { read, write, update: update as Value };
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
  const props = Object.entries(element[NodeField.props] ?? {}).filter(
    ([prop]) => prop !== "children",
  );
  // A prop the bundle spelled out is set once and never looked at again. It is
  // the one distinction left here, and it is a question about the node rather
  // than a walk of what is under it: a literal is the value it evaluates to,
  // and a computation watching a constant would be a computation per attribute
  // per element for nothing.
  const fixed = props
    .filter(([, expr]) => expr === null || typeof expr !== "object")
    .map(([prop, expr]) => [prop, expr as Value] as const);
  const computed = props
    .filter(([, expr]) => expr !== null && typeof expr === "object")
    .map(([prop, expr]) => [prop, compile(bundle, expr)] as const);
  const children = element[NodeField.props]?.["children"];
  const draw =
    children === undefined ? null : compileChildren(bundle, children);
  return (scope) => {
    const instance = instanceOf(scope);
    const host = instance.host;
    const node = host.createElement(id);
    for (const [prop, value] of fixed) {
      host.setProp(node, prop, value);
    }
    for (const [prop, read] of computed) {
      // One effect per prop, so a write moves that one prop of that one node.
      // It re-runs only when something the expression itself read has changed;
      // nothing tells it to look.
      host.effect((previous) =>
        host.setProp(node, prop, read(scope), previous),
      );
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
  expr: BundleExpr,
): (scope: Scope | null, instance: Instance) => unknown {
  if (Array.isArray(expr)) {
    const members = expr.map((member) => compileChildren(bundle, member));
    return (scope, instance) =>
      members.map((member) => member(scope, instance));
  }
  const read = compile(bundle, expr);
  // An element, or a value the bundle spelled out: what it draws is settled
  // when it is built, so `insert` is handed the thing rather than a way of
  // asking for it — and hands back without making a computation to watch it.
  // Whatever moves inside an element is the element's own business, bound when
  // it was built.
  if (isSettled(expr)) {
    return (scope, instance) => drawn(read(scope), instance);
  }
  return (scope, instance) => () => drawn(read(scope), instance);
}

function isSettled(expr: BundleExpr): boolean {
  if (expr === null || typeof expr !== "object") {
    return true;
  }
  return (
    !Array.isArray(expr) &&
    "#" in expr &&
    (expr as { "#": number })["#"] === NodeKind.Element
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
