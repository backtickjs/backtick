// The wire tags only. `@backtickjs/core` re-exports these, but reaching them
// that way pulls the bundler and `node:async_hooks` into the graph, which a
// browser cannot load. This subpath is the format module alone, and it
// imports nothing.
import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleApply,
  BundleArrayElement,
  BundleSpreadElementNode,
  BundleGetFunction,
  BundleApplyTree,
  BundleBinaryOperator,
  BundleBinaryExpressionNode,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleStatementNode,
  BundleThunk,
  BundleTree,
  BundleGetState,
  BundleGetSlot,
  FunctionLabel,
  TreeLabel,
} from "@backtickjs/core";
import { createMemo, createRoot, createSignal } from "solid-js/dist/solid.js";
import { Element } from "./Element.js";
import type { Value } from "./Value.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's
// `root` against its `functions` and `trees` tables and returns the resulting
// JavaScript value — an `Element` tree for a JSX client — so a host can render
// it, and tests can observe runtime behavior rather than only snapshotting
// shape.

export function evaluate(bundle: Bundle): Value {
  // An owner for whatever the root builds outside any instance. Nothing is
  // handed back to drop it with: a mount lasts as long as whoever asked for it,
  // and there is no unmounting this to be the other half of.
  return createRoot(() => evaluateExpr(bundle, bundle.root, []));
}

// A tree instance: what persists on the client. `cells` is the storage the
// entry's `state` declares, allocated fresh per instance, and `children` keys
// nested instances by the `apply` node that created them — the node is the
// child's position, so a re-render reuses the instance instead of resetting its
// cells.
interface Instance {
  readonly bundle: Bundle;
  readonly tree: BundleTree;
  // What the parent handed over, as a signal, because a computation cannot be
  // re-run by hand: handing an instance new arguments is a write, and the
  // content re-runs itself for it. Equal arguments are no write at all, which
  // is the skip an instance gets for being handed nothing new — one comparison
  // and no machinery around it.
  readonly slots: () => Value[];
  readonly setSlots: (slots: Value[]) => void;
  // A cell is a signal, so its storage and who hears about a write are the
  // graph's business rather than ours.
  cells: Map<string, [() => Value, (value: Value) => void]> | null;
  // What this instance draws, recomputed whenever anything it read is written —
  // its slots, or a cell, wherever that cell lives. Read rather than called:
  // asking a stale one brings it up to date first, which is what lets a parent
  // embed a child's element and know it is the current one.
  content: () => Element | null;
  // Everything created under this instance dies when this is called: the
  // instance is the owner, and dropping one drops what it made.
  dispose: () => void;
  // Nested instances, per `apply` node. A keyed apply finds its instance by the
  // key it was given, which is the whole point of a key: a row deleted from the
  // middle leaves every other row with the instance it already had. An unkeyed
  // one falls back to position — how many times that node has been reached in
  // this render — because position is the only identity it has.
  children: Map<BundleApplyTree, Children> | null;
  // How many times each `apply` has been reached in the render under way.
  // Cleared when one starts, so the nth evaluation finds the nth instance again.
  visits: Map<BundleApplyTree, number> | null;
  // The closures this instance's calls produced, per call node and per how many
  // times that node was reached — a call inside a loop makes one per row. A
  // call reached again with the same arguments hands back the same function,
  // because a closure over the same values behaves the same way and being a
  // different object is the only thing that would say otherwise.
  closures: Map<BundleApply, { args: Value[]; value: Value }[]> | null;
  calls: Map<BundleApply, number> | null;
  // The elements this instance has drawn, per element of the bundle and per how
  // many times that one was reached — an element inside a loop is one entry per
  // row. Handing back the same object is what says "this is the thing you
  // already have": a prop is read from it and its children are a signal on it,
  // so an element that persists is a node that persists, down the whole subtree.
  readonly drawing: Drawing;
  // The handle each of this instance's cells is read through, made with the
  // instance because the cells a tree declares are known before it runs. One
  // per cell for its life: a handle is a view onto storage and holds nothing of
  // its own, so a second view of the same cell would only look like a different
  // value to anything comparing them.
  handles: Map<string, Value> | null;
  // Which of its siblings this one is, as the node that applied it said. Held
  // here rather than read off the element, because the element is the content's
  // and the content doesn't know it was keyed — a re-render would otherwise put
  // the content's own key back and the identity would last one pass.
  key: string | number | null;
  element: Element | null;
}

function instantiate(
  bundle: Bundle,
  tree: BundleTree,
  slots: Value[],
  key: string | number | null = null,
): Instance {
  // Equal arguments are not a write, which is the whole of the skip an
  // unchanged instance gets: the content depends on this signal, and a signal
  // that did not change re-runs nothing.
  const [readSlots, setSlots] = createSignal(slots, { equals: same });
  const instance: Instance = {
    bundle,
    tree,
    slots: readSlots,
    setSlots,
    cells: null,
    content: () => null,
    dispose: () => {},
    children: null,
    visits: null,
    closures: null,
    calls: null,
    drawing: newDrawing(),
    handles: null,
    key,
    element: null,
  };
  // Owned: the cells and everything they feed belong to this instance, and
  // dropping it drops them without anything having to be unregistered.
  createRoot((dispose) => {
    instance.dispose = dispose;
    // A cell's initial is evaluated in no instance: it can't read a slot or
    // another cell, so nothing is in scope for it.
    for (const [name, initial] of Object.entries(tree[NodeField.state] ?? {})) {
      (instance.cells ??= new Map()).set(
        name,
        createSignal<Value>(evaluateExpr(bundle, initial, [])),
      );
      (instance.handles ??= new Map()).set(name, cellHandle(instance, name));
    }
    instance.content = createMemo(() => render(instance));
  });
  return instance;
}

// The body of an instance's content computation: what it draws, refreshing the
// element in place so every holder observes the new props. Whatever this reads
// — a slot, a cell of its own, a cell it was handed — it runs again for, and a
// run is the whole instance. Nested instances survive it via `children`.
//
// The prop effects it builds are owned by the run that built them, so an
// element this replaces takes them with it. Only its own: a child instance is
// not re-run by this and keeps watching the cells its props read.
//
// A pass-through component — one whose content is an apply rather than an
// element — renders no element of its own, so evaluating its content yields its
// child's element and the two alias deliberately. An instance whose content is
// null renders nothing.
function render(instance: Instance): Element | null {
  // A fresh count for this pass: an `apply` reached n times last render is
  // reached n times again, so the nth evaluation lines up with the nth instance.
  instance.visits?.clear();
  instance.calls?.clear();
  instance.drawing.made.clear();
  // An instance draws in its own space, whatever space the parent was drawing
  // in when it reached the apply. Without this a child rendered from inside a
  // keyed element would record what it drew under that element, and find it
  // again — or fail to — from there.
  const outerDrawing = drawingIn;
  drawingIn = instance.drawing;
  try {
    const rendered = evaluateExpr(
      instance.bundle,
      instance.tree[NodeField.content],
      instance.slots(),
      null,
      instance,
    ) as Element | null;
    // What this render didn't ask for again is dropped, and dropping an instance
    // means disposing it: an owner that is merely unreachable has still got its
    // effects registered against every cell they read, and a cell outlives the
    // rows that read it. Letting the map go is not enough.
    //
    // An apply this render never reached draws nothing now, so everything under
    // it goes. One it did reach keeps what it claimed, and `left` is by now
    // exactly the rows that were there last time and are not here this time —
    // the middle row of a list, which is the case that never went through the
    // branch above.
    for (const [node, group] of instance.children ?? []) {
      if (instance.visits?.has(node) !== true) {
        instance.children?.delete(node);
        for (const child of group.claimed.values()) child.dispose();
        for (const child of group.left.values()) child.dispose();
        continue;
      }
      for (const child of group.left.values()) child.dispose();
      group.left.clear();
    }
    // The applied key wins over whatever the content named itself: the content is
    // one element among an instance's own, and the key is about the instance.
    if (rendered !== null && instance.key !== null) {
      rendered.key = instance.key;
    }
    instance.element = rendered;
    return rendered;
  } finally {
    drawingIn = outerDrawing;
  }
}

// Whether two argument lists are the same values in the same order. Identity
// rather than equality: two objects that look alike are still two objects, and
// telling them apart is the caller's business, not this.
function same(a: Value[], b: Value[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, at) => value === b[at]);
}

// A cell's handle, as a script reads it: an ordinary object of functions, so it
// is a `Value` like anything else the interpreter hands a script. `read`
// observes the instance's current storage; `write` replaces it and re-renders —
// the two rules per-instance state adds. A handle a handler captured keeps
// working across re-renders because it resolves the cell by name at call time.
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
  // Reading is reading. Whichever computation is running says so by asking —
  // the effect computing a prop, or the content of whichever instance is
  // drawing, which need not be the one that owns the cell. A read from a
  // handler belongs to no computation and depends on nothing.
  const read = () => cell()[0]() ?? null;
  // And writing is writing: every prop that read this cell is recomputed by
  // whoever was reading it, and every content that read it runs again. Both
  // happen before this returns, and nobody is told, because everything that
  // cared was already reading.
  const write = (value: Value): Value => {
    cell()[1](() => value);
    return null;
  };
  const update = (updater: (current: Value) => Value): Value => {
    return write(updater(cell()[0]() ?? null));
  };
  return {
    read,
    write,
    update: update as Value,
  };
}

// The instances one `apply` node has made, under the name each was applied by:
// its key, or — where it has none — which evaluation of the node it was, since
// position is the only identity an unkeyed instance has. `claimed` is what this
// render has asked for and `left` is what the last one ended with; rotating
// them at the first visit is what drops the instances nobody asked for again.
interface Children {
  claimed: Map<string | number, Instance>;
  left: Map<string | number, Instance>;
}

// Where an element is found again. An instance has one for its own render, and
// a keyed element has one of its own — so a row found by its key finds its
// cells by position *within that row*, rather than by position in the table.
// Without that a row that moved would keep its `tr` and rebuild every `td`
// under it, which is keyed by the letter and not in effect.
interface Drawing {
  // The nth drawing of this node in this drawing, and what each of them drew.
  readonly drew: Map<BundleElement, Element[]>;
  readonly made: Map<BundleElement, number>;
  // What a keyed node drew, under the key it was drawn by. `claimed` is what
  // this drawing has asked for and `left` is what the last one ended with;
  // rotating them at the first visit drops whatever nobody asked for again.
  keyed: Map<BundleElement, KeptByKey> | null;
}

interface KeptByKey {
  claimed: Map<string | number, Kept>;
  left: Map<string | number, Kept>;
}

// An element found by its key, with the identity space its own subtree is
// found in.
interface Kept {
  readonly element: Element;
  readonly drawing: Drawing;
}

function newDrawing(): Drawing {
  return { drew: new Map(), made: new Map(), keyed: null };
}

// Which drawing is being made. Per-render mutable state, like the counters it
// holds: a render is one synchronous walk, and a keyed element swaps this for
// its own while its children are worked out.
let drawingIn: Drawing | null = null;

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
// SPIKE: names and values side by side rather than a `Map`. A frame binds one
// or two names — an arrow's parameters, a block's declarations — and a linear
// scan of that beats hashing it, where allocating the `Map` is what a call was
// mostly paying for.
interface Scope {
  parent: Scope | null;
  names: string[];
  values: Value[];
}

function scopeOf(parent: Scope | null): Scope {
  return { parent, names: [], values: [] };
}

function bind(scope: Scope, name: string, value: Value): void {
  const at = scope.names.indexOf(name);
  if (at === -1) {
    scope.names.push(name);
    scope.values.push(value);
    return;
  }
  scope.values[at] = value;
}

function read(scope: Scope, name: string): Value {
  return scope.values[scope.names.indexOf(name)] ?? null;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let at = scope; at !== null; at = at.parent) {
    if (at.names.indexOf(name) !== -1) {
      return at;
    }
  }
  return null;
}

// An entry's function is a pure function of the bundle and the label — the
// tables never change, and an entry closes over nothing else, since its
// captures arrive as its own parameters. So it is built once per bundle rather
// than per reference: a reference reached inside a loop would otherwise
// allocate a closure per iteration. Every invocation still gets its own frame,
// so sharing the closure shares no state.
//
// Keyed weakly, so the table goes when the bundle does.
const functionsByBundle = new WeakMap<
  Bundle,
  Map<FunctionLabel, (...args: Value[]) => Value>
>();
const treesByBundle = new WeakMap<
  Bundle,
  Map<TreeLabel, (...slots: Value[]) => Value>
>();

// A `functions` entry as a function: its arrow, evaluated at the top level.
function getFunction(
  bundle: Bundle,
  label: FunctionLabel,
): (...args: Value[]) => Value {
  let built = functionsByBundle.get(bundle);
  if (built === undefined) {
    built = new Map();
    functionsByBundle.set(bundle, built);
  }
  const existing = built.get(label);
  if (existing !== undefined) {
    return existing;
  }
  const arrow = bundle.functions[label];
  if (arrow === undefined) {
    throw new Error(`unknown function entry ${label}`);
  }
  // Evaluated with no enclosing scope: an entry resolves only against its own
  // parameters, so there is nothing for it to close over.
  const fn = evaluateNode(bundle, arrow, null) as (...args: Value[]) => Value;
  built.set(label, fn);
  return fn;
}

// A `trees` entry as a function: it takes its slot values and instantiates the
// element.
function getTree(
  bundle: Bundle,
  label: TreeLabel,
): (...slots: Value[]) => Value {
  let built = treesByBundle.get(bundle);
  if (built === undefined) {
    built = new Map();
    treesByBundle.set(bundle, built);
  }
  const existing = built.get(label);
  if (existing !== undefined) {
    return existing;
  }
  const tree = bundle.trees[label];
  if (tree === undefined) {
    throw new Error(`unknown tree entry ${label}`);
  }
  // The closure is shared; `instantiate` still runs per call, so each
  // instantiation gets its own instance and its own cells.
  const fn = (...slots: Value[]) => instantiate(bundle, tree, slots).content();
  built.set(label, fn);
  return fn;
}

// A prop is read rather than pushed: the getter evaluates the expression when
// somebody asks for it, so a read inside a computation subscribes to whatever
// the expression touched and a read outside one is an ordinary value. Nothing
// is stored, nothing is notified, and nobody is told to look again.
//
// This is also what tells a prop's reads from a structural one, without a flag
// to say so. Whoever reads a prop is what depends on it — one attribute, which
// they can set — where a cell read while working out an element's children
// decided which elements exist, and is read by the content itself.
//
// No memo. What would cache it is the computation reading it, which re-runs
// only when something the expression read has changed — and there is exactly
// one such reader per prop. A memo here would be a second copy of that, built
// per element per render, which for a thousand rows is the cost the handful of
// props that change would make everyone else pay.
//
// Bound once and kept. Everything the expression resolves against is already
// reactive — the instance's slots, the cells it reads — so there is nothing a
// later render could tell this that it does not hear on its own.
function bindProp(
  bundle: Bundle,
  built: Element,
  prop: string,
  expr: BundleExpr,
  slots: Value[],
  instance: Instance | null,
): void {
  // A literal is already the value it evaluates to, and a getter over one reads
  // the same thing forever. It is also indistinguishable from a script to
  // whoever draws it, so leaving it a getter is what makes a constant attribute
  // cost a computation that watches nothing change.
  if (expr === null || typeof expr !== "object") {
    built.props[prop] = expr;
    return;
  }
  Object.defineProperty(built.props, prop, {
    get: () =>
      evaluateExpr(
        bundle,
        expr,
        instance === null ? slots : instance.slots(),
        null,
        instance,
      ),
    enumerable: true,
    configurable: true,
  });
}

// What an element's children evaluated to last, as a signal, because working
// them out needs the render pass around it — an `apply` reached inside them is
// counted and matched against the instances the last pass left. So the content
// computes them and writes them here, and whoever draws them reads.
//
// A render rebuilds the array even where it drew the same elements into it, so
// the array is never the one from last time and comparing it as one value would
// say everything moved every time. Compared a member at a time instead: an
// element an instance drew again is the same object, so an unchanged list is
// equal and whoever draws it is not asked to look.
//
// Everything under this rests on that. Drawing is one reader per element, and a
// reader that runs takes its whole subtree with it — so a list that says it
// changed when it didn't is a table detaching and reattaching a thousand rows
// to put them back where they were.
const childrenOf = new WeakMap<Element, (children: Value) => void>();

function sameChildren(before: Value, after: Value): boolean {
  if (before === after) {
    return true;
  }
  if (
    !Array.isArray(before) ||
    !Array.isArray(after) ||
    before.length !== after.length
  ) {
    return false;
  }
  return before.every((value, at) => sameChildren(value, after[at] as Value));
}

function setChildren(built: Element, children: Value): void {
  const write = childrenOf.get(built);
  if (write !== undefined) {
    write(children);
    return;
  }
  const [read, set] = createSignal<Value>(children, { equals: sameChildren });
  childrenOf.set(built, set);
  Object.defineProperty(built.props, "children", {
    get: read,
    enumerable: true,
    configurable: true,
  });
}

// An inline element renders in its enclosing instance: it is part of that entry,
// so it reads the same slots and the same cells. Its key and its children are
// the two expressions a render re-evaluates, so both are compiled with it; the
// props are bound once, on the drawing that first builds it.
function compileElement(bundle: Bundle, element: BundleElement): CompiledExpr {
  const id = element[NodeField.id];
  const elementKey = element[NodeField.key];
  // An absent key is no key, exactly as a null one was — the wire omits it
  // rather than spelling it out.
  const key = elementKey === undefined ? null : compileExpr(bundle, elementKey);
  const props = Object.entries(element[NodeField.props] ?? {}).filter(
    ([prop]) => prop !== "children",
  );
  // Children are structure, not an attribute, so they are worked out inside the
  // render, where an `apply` among them can be matched against the instance
  // that drew it last time — and handed over rather than read.
  const children = element[NodeField.props]?.["children"];
  const drawChildren =
    children === undefined ? null : compileExpr(bundle, children);
  return (slots, _env, instance) => {
    const drawn =
      key === null
        ? null
        : (key(slots, null, instance) as string | number | null);
    // The drawing this element belongs to: the enclosing keyed element's, or
    // the instance's own where no keyed element stands between them.
    const drawing = drawingIn ?? instance?.drawing ?? null;
    if (drawing === null) {
      // Nothing to be found again in — outside a render nobody is holding the
      // last one, so this is built fresh.
      const made = new Element(id, drawn, {}, element);
      for (const [prop, expr] of props) {
        bindProp(bundle, made, prop, expr, slots, instance);
      }
      if (drawChildren !== null) {
        setChildren(made, drawChildren(slots, null, instance));
      }
      return made;
    }
    // Which drawing of this element this is — the nth time this drawing has
    // reached it, which for an element inside a loop is the nth row.
    const at = drawing.made.get(element) ?? 0;
    drawing.made.set(element, at + 1);

    let built: Element;
    let under: Drawing;
    if (key === null) {
      let drew = drawing.drew.get(element);
      if (drew === undefined) {
        drew = [];
        drawing.drew.set(element, drew);
      }
      const kept = drew[at];
      // The same element, drawn again. Written into rather than replaced, so
      // everything holding it — the node it was drawn as, the effects reading
      // its props — is holding the current one and nothing has to be told.
      built = kept ?? new Element(id, drawn, {}, element);
      if (kept === undefined) {
        drew[at] = built;
        for (const [prop, expr] of props) {
          // Bound once. The getter resolves against the instance every time it
          // is read, so a second render has nothing to tell it.
          bindProp(bundle, built, prop, expr, slots, instance);
        }
      }
      // An unkeyed element cannot move, so what it draws is found where it is
      // found: in the drawing it belongs to.
      under = drawing;
    } else {
      let byKey = drawing.keyed?.get(element);
      if (byKey === undefined) {
        byKey = { claimed: new Map(), left: new Map() };
        (drawing.keyed ??= new Map()).set(element, byKey);
      }
      // The first visit of a drawing starts a new claim on this node; whatever
      // the last one left and nobody asks for again goes with the map it was
      // in.
      if (at === 0) {
        byKey.left = byKey.claimed;
        byKey.claimed = new Map();
      }
      const name = drawn ?? at;
      let kept = byKey.left.get(name);
      if (kept !== undefined) {
        byKey.left.delete(name);
      } else {
        const made = new Element(id, drawn, {}, element);
        for (const [prop, expr] of props) {
          bindProp(bundle, made, prop, expr, slots, instance);
        }
        // A space of its own: what this element draws is found under it, so a
        // row that moved keeps the cells it drew rather than adopting whichever
        // ones sit where it landed.
        kept = { element: made, drawing: newDrawing() };
      }
      byKey.claimed.set(name, kept);
      built = kept.element;
      under = kept.drawing;
      under.made.clear();
    }
    built.key = drawn;
    if (drawChildren !== null) {
      const outer = drawingIn;
      drawingIn = under;
      try {
        setChildren(built, drawChildren(slots, null, instance));
      } finally {
        drawingIn = outer;
      }
    }
    return built;
  };
}

// A tree expression (also the root): plain JSON carries itself; the
// `#`-discriminated nodes compose. Bundling rejects plain data carrying
// `#` — the bundle's one reserved key — so the node reading is
// unambiguous.
//
// Compiled like a body expression, and for the same reason: what kind of node
// this is was decided when the bundle was parsed, and a prop read or a render
// asking again is asking a question whose answer cannot have changed.
type CompiledExpr = (
  slots: Value[],
  env: Scope | null,
  instance: Instance | null,
) => Value;

const compiledExprs = new WeakMap<object, CompiledExpr>();

function compileExpr(bundle: Bundle, expr: BundleExpr): CompiledExpr {
  if (expr === null || typeof expr !== "object") {
    const literal = expr as Value;
    return () => literal;
  }
  const node = expr as object;
  const already = compiledExprs.get(node);
  if (already !== undefined) {
    return already;
  }
  const made = buildExpr(bundle, expr);
  compiledExprs.set(node, made);
  return made;
}

function evaluateExpr(
  bundle: Bundle,
  expr: BundleExpr,
  slots: Value[],
  env: Scope | null = null,
  // The enclosing instance, when there is one: what `cell` resolves against, and
  // what a nested `apply` keys its child instance under.
  instance: Instance | null = null,
): Value {
  return compileExpr(bundle, expr)(slots, env, instance);
}

// `compileExpr` has already ruled out the literals, so what reaches this is a
// composite: an array, a node, or plain data.
function buildExpr(bundle: Bundle, literal: BundleExpr): CompiledExpr {
  const expr = literal as Extract<BundleExpr, object>;
  if (Array.isArray(expr)) {
    const parts = expr.map((element) => compileExpr(bundle, element));
    return (slots, env, instance) =>
      parts.map((part) => part(slots, env, instance));
  }
  if ("#" in expr) {
    const form = expr as
      | BundleGetSlot
      | BundleGetState
      | BundleIdentifierNode
      | BundleGetFunction
      | BundleApply
      | BundleThunk
      | BundleElement;
    switch (form["#"]) {
      case NodeKind.GetSlot: {
        const index = form[NodeField.index];
        return (slots) => slots[index];
      }
      case NodeKind.GetState: {
        const name = form[NodeField.name];
        return (_slots, _env, instance) => {
          // A cell is declared by the enclosing entry, so it is only meaningful
          // inside an instance of it.
          if (instance === null) {
            throw new Error(`no instance to resolve state cell ${name}`);
          }
          const handle = instance.handles?.get(name);
          if (handle === undefined) {
            throw new Error(`unknown state cell ${name}`);
          }
          return handle;
        };
      }
      case NodeKind.Identifier: {
        // A parameter of an enclosing thunk.
        const name = form[NodeField.text];
        return (_slots, env) => {
          const frame = lookup(env, name);
          if (frame === null) {
            throw new Error(`unknown identifier ${name}`);
          }
          return read(frame, name);
        };
      }
      // An entry named rather than applied: the function it evaluates to, which
      // is what a hole handing over nothing would have called.
      case NodeKind.GetFunction: {
        const label = form[NodeField.label];
        return () => getFunction(bundle, label);
      }
      case NodeKind.ApplyFunction: {
        const label = form[NodeField.label];
        const args = (form[NodeField.arguments] ?? []).map((arg) =>
          compileExpr(bundle, arg),
        );
        return (slots, env, instance) => {
          const supplied = args.map((arg) => arg(slots, env, instance));
          const value = getFunction(bundle, label)(...supplied);
          // Only a closure is held on to. A call that computed anything else may
          // read a cell or an instance's storage, and answering it from last time
          // would be answering a question that wasn't asked.
          if (instance === null || typeof value !== "function") {
            return value;
          }
          const seen = instance.calls?.get(form) ?? 0;
          (instance.calls ??= new Map()).set(form, seen + 1);
          let made = instance.closures?.get(form);
          if (made === undefined) {
            made = [];
            (instance.closures ??= new Map()).set(form, made);
          }
          const previous = made[seen];
          if (previous !== undefined && same(previous.args, supplied)) {
            return previous.value;
          }
          made[seen] = { args: supplied, value };
          return value;
        };
      }
      case NodeKind.ApplyTree: {
        const label = form[NodeField.label];
        const args = (form[NodeField.arguments] ?? []).map((arg) =>
          compileExpr(bundle, arg),
        );
        const applied = form[NodeField.key];
        const key = applied === undefined ? null : compileExpr(bundle, applied);
        return (slots, env, instance) => {
          const supplied = args.map((arg) => arg(slots, env, instance));
          const drawn =
            key === null
              ? null
              : (key(slots, env, instance) as string | number | null);
          const tree = bundle.trees[label];
          if (tree === undefined) {
            throw new Error(`unknown tree entry ${label}`);
          }
          // Outside an instance there is nothing to persist against, so the
          // entry applies as a plain function.
          if (instance === null) {
            return instantiate(bundle, tree, supplied, drawn).content();
          }
          // A nested instance persists across the parent's re-renders. A keyed
          // one is found by its key wherever it moved to; an unkeyed one by which
          // evaluation of this node it was, because a node inside a loop is
          // reached once per iteration and position is all that tells them apart.
          const seen = instance.visits?.get(form) ?? 0;
          (instance.visits ??= new Map()).set(form, seen + 1);
          let siblings = instance.children?.get(form);
          if (siblings === undefined) {
            siblings = { claimed: new Map(), left: new Map() };
            (instance.children ??= new Map()).set(form, siblings);
          }
          // The first visit of a render starts a new claim on this node's
          // instances; whatever the last render left and nobody asks for again is
          // dropped with the map it was in.
          if (seen === 0) {
            siblings.left = siblings.claimed;
            siblings.claimed = new Map();
          }
          const under = drawn ?? seen;
          const child = siblings.left.get(under);
          if (child !== undefined) {
            child.key = drawn;
            // Claimed, so what stays behind in `left` is what nobody asked for
            // again — which is what the render disposes when it finishes.
            siblings.left.delete(under);
            siblings.claimed.set(under, child);
            // Handing it its arguments, which is the only way it is asked to draw
            // again. Equal ones are not a write and it stays exactly as it was —
            // the same element down to the objects, which is what lets a host
            // recognise it and stop there. What it read of somebody else's cell
            // is not this call's business: reading it below is what brings it up
            // to date, whatever made it stale.
            child.setSlots(supplied);
            return child.content();
          }
          const created = instantiate(bundle, tree, supplied, drawn);
          siblings.claimed.set(under, created);
          return created.content();
        };
      }
      case NodeKind.Thunk: {
        const params = form[NodeField.parameters];
        const body = compileExpr(bundle, form[NodeField.expression]);
        if (!params || params.length === 0) {
          return (slots, env, instance) => () => body(slots, env, instance);
        }
        // The hole call supplies the entry-scoped bindings the splice
        // captures, one value per parameter, over the enclosing frame.
        const names = params.map((param) => param[NodeField.name]);
        return (slots, env, instance) =>
          (...args: Value[]) => {
            const frame = scopeOf(env);
            for (let at = 0; at < names.length; at++) {
              bind(frame, names[at], args[at]);
            }
            return body(slots, frame, instance);
          };
      }
      case NodeKind.Element: {
        return compileElement(bundle, form);
      }
    }
  }
  // The index admits `undefined` only so the reserved `#` can be excluded
  // from it (see `BundleData`); parsed JSON never carries one.
  const data = expr as { [key: string]: BundleExpr };
  const keys = Object.keys(data);
  const parts = keys.map((key) => compileExpr(bundle, data[key]));
  return (slots, env, instance) => {
    const object: { [key: string]: Value } = {};
    for (let at = 0; at < keys.length; at++) {
      object[keys[at]] = parts[at](slots, env, instance);
    }
    return object;
  };
}

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
// Bundling rejects plain data carrying `#` — the bundle's one reserved key —
// so the node reading is unambiguous.
function isNode(
  node: BundleStatementNode,
): node is Extract<BundleStatementNode, { "#": NodeKind }> {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node
  );
}

// The statement outcome of a block or one of its statements. `advanced` fell
// through to the next one; the rest are jumps, and every container passes one
// outward until something catches it: a loop catches `break` and `continue`,
// an arrow catches `returned` and answers with `value`.
interface Completion {
  kind: "advanced" | "returned" | "break" | "continue";
  value: Value;
}

const advanced: Completion = { kind: "advanced", value: null };
const broke: Completion = { kind: "break", value: null };
const continued: Completion = { kind: "continue", value: null };

// A bundle is data from elsewhere, and a loop that never ends is the one way it
// can hang the client rather than merely be wrong.
function guardTurns(turns: number, keyword: string): void {
  if (turns > 1_000_000) {
    throw new Error(`A \`${keyword}\` in this bundle ran a million times.`);
  }
}

// SPIKE: a node is compiled once into the closure that evaluates it, and that
// closure is what runs from then on. Deciding what kind of node this is happens
// per node instead of per evaluation — the same walk of the same tree, without
// re-reading a shape that has not changed since the bundle was parsed.
type Compiled = (scope: Scope | null) => Value;
type Executed = (scope: Scope) => Completion;

const compiledNodes = new WeakMap<object, Compiled>();
const compiledStatements = new WeakMap<object, Executed>();

function compileNode(bundle: Bundle, node: BundleExpressionNode): Compiled {
  if (node === null || typeof node !== "object") {
    const literal = node as Value;
    return () => literal;
  }
  const already = compiledNodes.get(node);
  if (already !== undefined) {
    return already;
  }
  const made = buildNode(bundle, node);
  compiledNodes.set(node, made);
  return made;
}

function compileStatement(bundle: Bundle, node: BundleStatementNode): Executed {
  if (node === null || typeof node !== "object") {
    return () => advanced;
  }
  const already = compiledStatements.get(node);
  if (already !== undefined) {
    return already;
  }
  const made = buildStatement(bundle, node);
  compiledStatements.set(node, made);
  return made;
}

function buildStatement(bundle: Bundle, node: BundleStatementNode): Executed {
  if (!isNode(node)) {
    // Plain JSON in statement position is an expression evaluated for its
    // effect.
    const run = compileNode(bundle, node);
    return (scope) => {
      run(scope);
      return advanced;
    };
  }
  switch (node["#"]) {
    case NodeKind.Block: {
      const statements = node[NodeField.statements] ?? [];
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward. Which names
      // those are is a property of the block, so it is found once.
      const declared = statements
        .filter(
          (statement) =>
            isNode(statement) &&
            statement["#"] === NodeKind.VariableDeclaration,
        )
        .map((statement) => (statement as { e: string })[NodeField.name]);
      const body = statements.map((statement) =>
        compileStatement(bundle, statement),
      );
      return (scope) => {
        const frame = scopeOf(scope);
        for (const name of declared) {
          bind(frame, name, null);
        }
        for (const run of body) {
          const completion = run(frame);
          // A jump of any kind leaves the block; what catches it is further out.
          if (completion.kind !== "advanced") {
            return completion;
          }
        }
        return advanced;
      };
    }
    case NodeKind.VariableDeclaration: {
      const name = node[NodeField.name];
      const initializer = compileNode(bundle, node[NodeField.initializer]);
      return (scope) => {
        bind(scope, name, initializer(scope));
        return advanced;
      };
    }
    case NodeKind.IfStatement: {
      const test = compileNode(bundle, node[NodeField.expression]);
      const then = compileStatement(bundle, node[NodeField.thenStatement]);
      const otherwise =
        node[NodeField.elseStatement] === null
          ? null
          : compileStatement(bundle, node[NodeField.elseStatement]);
      return (scope) => {
        if (condition(test(scope), "an `if`")) {
          return then(scope);
        }
        return otherwise === null ? advanced : otherwise(scope);
      };
    }
    case NodeKind.WhileStatement: {
      const test = compileNode(bundle, node[NodeField.expression]);
      const body = compileStatement(bundle, node[NodeField.statement]);
      return (scope) => {
        let turns = 0;
        while (condition(test(scope), "a `while`")) {
          const completion = body(scope);
          if (completion.kind === "returned") {
            return completion;
          }
          if (completion.kind === "break") {
            return advanced;
          }
          // `continue` arrives here too, having nothing left to skip.
          guardTurns((turns += 1), "while");
        }
        return advanced;
      };
    }
    case NodeKind.ForStatement: {
      const init =
        node[NodeField.initializer] === null
          ? null
          : compileStatement(bundle, node[NodeField.initializer]);
      const test =
        node[NodeField.condition] === null
          ? null
          : compileNode(bundle, node[NodeField.condition]);
      const body = compileStatement(bundle, node[NodeField.statement]);
      const update =
        node[NodeField.incrementor] === null
          ? null
          : compileStatement(bundle, node[NodeField.incrementor]);
      return (scope) => {
        // The header binding lives in a scope of the loop's own, so it is gone
        // once the loop is.
        let frame = scopeOf(scope);
        if (init !== null) {
          init(frame);
        }
        let turns = 0;
        for (;;) {
          if (test !== null && !condition(test(frame), "a `for`")) {
            return advanced;
          }
          const completion = body(frame);
          if (completion.kind === "returned") {
            return completion;
          }
          if (completion.kind === "break") {
            return advanced;
          }
          // `continue` lands here, where falling off the end of the body lands:
          // the update runs either way.
          //
          // Each turn gets its own copy of the header scope, taken before the
          // update: an arrow built in one turn keeps that turn's values instead
          // of the ones the loop stopped at.
          frame = {
            parent: scope,
            names: frame.names.slice(),
            values: frame.values.slice(),
          };
          if (update !== null) {
            update(frame);
          }
          guardTurns((turns += 1), "for");
        }
      };
    }
    case NodeKind.BreakStatement: {
      return () => broke;
    }
    case NodeKind.ContinueStatement: {
      return () => continued;
    }
    case NodeKind.ReturnStatement: {
      const value = compileNode(bundle, node[NodeField.expression]);
      return (scope) => ({ kind: "returned", value: value(scope) });
    }
    case NodeKind.ThrowStatement: {
      const thrown = compileNode(bundle, node[NodeField.expression]);
      return (scope) => {
        throw thrown(scope);
      };
    }
    case NodeKind.TryStatement: {
      const attempted = compileStatement(bundle, node[NodeField.tryBlock]);
      const clause = node[NodeField.catchClause];
      const caught = clause[NodeField.variableDeclaration];
      const handler = compileStatement(bundle, clause[NodeField.block]);
      return (scope) => {
        try {
          return attempted(scope);
        } catch (thrown) {
          // The catch binding scopes over the clause's block only, like an
          // arrow parameter over its body.
          const frame = scopeOf(scope);
          if (caught !== null) {
            bind(frame, caught, thrown as Value);
          }
          return handler(frame);
        }
      };
    }
    default: {
      // Every remaining kind is an expression, evaluated for its effect.
      const run = compileNode(bundle, node);
      return (scope) => {
        run(scope);
        return advanced;
      };
    }
  }
}

// A body expression: as in a tree expression, plain JSON carries itself and
// the `#`-discriminated forms compose. Containers recurse as expressions —
// a spliced runtime array can hold entry calls.
function evaluateNode(
  bundle: Bundle,
  node: BundleExpressionNode,
  scope: Scope | null,
): Value {
  return compileNode(bundle, node)(scope);
}

// Whether a list member is `...xs` rather than a value of its own.
function isSpread(
  element: BundleArrayElement,
): element is BundleSpreadElementNode {
  return (
    typeof element === "object" &&
    element !== null &&
    !Array.isArray(element) &&
    "#" in element &&
    element["#"] === NodeKind.SpreadElement
  );
}

// A list that may hold `...xs`: each member answers with one value or with the
// members of an array, and the list is what they add up to. A list with no
// spread in it compiles to the plain map it was before — the flattening is a
// cost only where something is actually spread.
function compileElements(
  bundle: Bundle,
  elements: readonly BundleArrayElement[],
): (scope: Scope | null) => Value[] {
  if (!elements.some(isSpread)) {
    const parts = elements.map((element) =>
      compileNode(bundle, element as BundleExpressionNode),
    );
    return (scope) => parts.map((part) => part(scope));
  }
  const parts = elements.map((element) =>
    isSpread(element)
      ? {
          spread: true,
          read: compileNode(bundle, element[NodeField.expression]),
        }
      : { spread: false, read: compileNode(bundle, element) },
  );
  return (scope) => {
    const out: Value[] = [];
    for (const part of parts) {
      const value = part.read(scope);
      if (!part.spread) {
        out.push(value);
        continue;
      }
      if (!Array.isArray(value)) {
        throw new Error("only an array can be spread");
      }
      for (const member of value) {
        out.push(member);
      }
    }
    return out;
  };
}

function buildNode(bundle: Bundle, node: BundleExpressionNode): Compiled {
  if (!isNode(node)) {
    if (Array.isArray(node)) {
      const elements = compileElements(bundle, node);
      return (scope) => elements(scope);
    }
    const data = node as { [key: string]: BundleExpressionNode };
    const keys = Object.keys(data);
    const parts = keys.map((key) => compileNode(bundle, data[key]));
    return (scope) => {
      const object: { [key: string]: Value } = {};
      for (let at = 0; at < keys.length; at++) {
        object[keys[at]] = parts[at](scope);
      }
      return object;
    };
  }
  switch (node["#"]) {
    case NodeKind.Identifier: {
      const name = node[NodeField.text];
      return (scope) => {
        const frame = lookup(scope, name);
        if (frame === null) {
          throw new Error(`unknown identifier ${name}`);
        }
        return read(frame, name);
      };
    }
    case NodeKind.GetFunction: {
      const label = node[NodeField.label];
      return () => getFunction(bundle, label);
    }
    // A global the format names and the host answers. This host is
    // JavaScript, so these are JavaScript's — which is what the curation is
    // for: every member here means the same thing everywhere.
    case NodeKind.Builtin: {
      const name = node[NodeField.name];
      const value = builtins[name];
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      return () => value;
    }
    case NodeKind.GetTree: {
      const label = node[NodeField.label];
      return () => getTree(bundle, label);
    }
    // A script instantiating a keyed entry. There is no enclosing instance to
    // persist a child against here — a script builds its rows fresh on each
    // read — so this names the element it produces and leaves matching them up
    // to whoever renders them.
    case NodeKind.ApplyTree: {
      const label = node[NodeField.label];
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        compileNode(bundle, arg),
      );
      const applied = node[NodeField.key];
      const key = applied === undefined ? null : compileNode(bundle, applied);
      return (scope) => {
        const tree = bundle.trees[label];
        if (tree === undefined) {
          throw new Error(`unknown tree entry ${label}`);
        }
        return instantiate(
          bundle,
          tree,
          args.map((arg) => arg(scope)),
          key === null ? null : (key(scope) as string | number | null),
        ).content();
      };
    }
    case NodeKind.CallExpression: {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // Which of the two this is, is a property of the callee, so it is
      // decided here rather than on every call.
      const callee = node[NodeField.expression];
      const optionalCall = node[NodeField.questionDotToken];
      const args = compileElements(bundle, node[NodeField.arguments] ?? []);
      if (isNode(callee) && callee["#"] === NodeKind.PropertyAccessExpression) {
        const receiver = compileNode(bundle, callee[NodeField.expression]);
        const member = callee[NodeField.name];
        const optionalReceiver = callee[NodeField.questionDotToken];
        return (scope) => {
          // The receiver evaluates before the arguments; an optional receiver
          // (`a?.b(…)`) short-circuits a null object to null, arguments
          // unevaluated.
          const object = receiver(scope) as { [name: string]: Value };
          if (optionalReceiver && object === null) {
            return null;
          }
          const method = object[member];
          // An optional call (`a.b?.(…)`) short-circuits a null method the
          // same way, arguments unevaluated.
          if (optionalCall && method === null) {
            return null;
          }
          if (typeof method !== "function") {
            throw new Error(`${member} is not a function`);
          }
          return method.apply(object, args(scope));
        };
      }
      const target = compileNode(bundle, callee);
      return (scope) => {
        // The callee evaluates before the arguments; an optional call
        // (`cb?.(…)`) short-circuits a null callee to null, arguments
        // unevaluated.
        const value = target(scope);
        if (optionalCall && value === null) {
          return null;
        }
        if (typeof value !== "function") {
          throw new Error("callee is not a function");
        }
        return value(...args(scope));
      };
    }
    case NodeKind.PropertyAccessExpression: {
      const target = compileNode(bundle, node[NodeField.expression]);
      const member = node[NodeField.name];
      const optional = node[NodeField.questionDotToken];
      return (scope) => {
        const object = target(scope) as { [name: string]: Value };
        if (optional && object === null) {
          return null;
        }
        // An absent member reads as null — the language's absent value;
        // `undefined` never arises.
        return object[member] ?? null;
      };
    }
    case NodeKind.ElementAccessExpression: {
      const target = compileNode(bundle, node[NodeField.expression]);
      const argument = compileNode(bundle, node[NodeField.argumentExpression]);
      return (scope) => {
        const reached = target(scope);
        const key = argument(scope);
        if (Array.isArray(reached)) {
          // An array is reached by whole numbers in range; everything else
          // about it — a fractional key, a string one, one past either end —
          // is a place the array has nothing, which reads as null.
          return typeof key === "number" &&
            Number.isInteger(key) &&
            key >= 0 &&
            key < reached.length
            ? (reached[key] ?? null)
            : null;
        }
        // An object is reached by the names it holds itself: an inherited one
        // (`toString`) is not a member of the value, so it reads as absent
        // rather than handing back something from the host's prototypes.
        if (reached !== null && typeof reached === "object") {
          return typeof key === "string" &&
            Object.prototype.hasOwnProperty.call(reached, key)
            ? ((reached as { [name: string]: Value })[key] ?? null)
            : null;
        }
        return null;
      };
    }
    case NodeKind.BinaryExpression: {
      if (isAssignment(node)) {
        // An assignment, which is a binary expression here as it is in
        // TypeScript. The left is a name to bind, never a value to read, so it
        // is the one operand that isn't evaluated.
        const name = node[NodeField.left][NodeField.text];
        const right = compileNode(bundle, node[NodeField.right]);
        return (scope) => {
          const value = right(scope);
          const frame = lookup(scope, name);
          if (frame === null) {
            throw new Error(`unknown assignment target ${name}`);
          }
          bind(frame, name, value);
          // An assignment evaluates to the value assigned, as in JavaScript; in
          // statement position nothing reads it.
          return value;
        };
      }
      return compileBinop(
        node[NodeField.operatorToken],
        compileNode(bundle, node[NodeField.left]),
        compileNode(bundle, node[NodeField.right]),
      );
    }
    case NodeKind.PrefixUnaryExpression: {
      const operand = compileNode(bundle, node[NodeField.operand]);
      // A `!` operand is boolean, as a tested position always is, so this
      // negates rather than deciding what counts as true. A `-` operand is a
      // number, checked by the compiler as arithmetic everywhere else is.
      if (node[NodeField.operator] === "-") {
        return (scope) => -(operand(scope) as number);
      }
      return (scope) => !condition(operand(scope), "the operand of `!`");
    }
    case NodeKind.ConditionalExpression: {
      const test = compileNode(bundle, node[NodeField.condition]);
      const whenTrue = compileNode(bundle, node[NodeField.whenTrue]);
      const whenFalse = compileNode(bundle, node[NodeField.whenFalse]);
      // Only the taken branch evaluates.
      return (scope) =>
        condition(test(scope), "a ternary condition")
          ? whenTrue(scope)
          : whenFalse(scope);
    }
    case NodeKind.ArrowFunction: {
      const parameters = (node[NodeField.parameters] ?? []).map(
        (param) => param[NodeField.name],
      );
      const body = node[NodeField.body];
      const block =
        isNode(body) && body["#"] === NodeKind.Block
          ? compileStatement(bundle, body)
          : null;
      // A non-block body is an expression, implicitly returned.
      const expression =
        block === null
          ? compileNode(bundle, body as BundleExpressionNode)
          : null;
      return (scope) =>
        (...args: Value[]) => {
          const frame = scopeOf(scope);
          // A missing argument binds as null — the language's absent value;
          // `undefined` never arises (an omitted optional parameter reads
          // as null).
          for (let at = 0; at < parameters.length; at++) {
            bind(frame, parameters[at], at < args.length ? args[at] : null);
          }
          if (block === null) {
            return (expression as Compiled)(frame);
          }
          const completion = block(frame);
          if (completion.kind === "break" || completion.kind === "continue") {
            // The compiler rejects a jump with no loop to catch it, so one
            // reaching here means the bundle was not written by it.
            throw new Error(
              `A \`${completion.kind}\` in this bundle escaped its loop.`,
            );
          }
          return completion.kind === "returned" ? completion.value : null;
        };
    }
  }
}

// `Math`, as `ClientMath` fixes it. Written out rather than handed the host's
// own object, so what a bundle can reach is a list somebody chose and a member
// left out stays left out.
// The globals a script may reach, as `ClientMath` and `ClientArrayStatics` fix
// them. Written out rather than handed the host's own objects, so what a bundle
// can reach is a list somebody chose and a member left out stays left out —
// which is what keeps this client, the one the format is specified against,
// from accepting more than the format defines.
const builtins: { [name: string]: Value } = {
  Array: {
    // Not the host's `Array.from`: the mapper is required where the standard
    // library's is optional, and its first argument is `null` where the
    // standard library passes `undefined`.
    from: (source: Value, map: Value) => {
      const length =
        typeof source === "object" && source !== null && !Array.isArray(source)
          ? (source as { length?: Value }).length
          : null;
      if (typeof length !== "number") {
        throw new Error("`Array.from` builds from `{ length }`");
      }
      if (typeof map !== "function") {
        throw new Error("`Array.from` needs a mapper");
      }
      // Grown rather than sized. `new Array(n)` hands back an array the host
      // marks holey for the rest of its life, and everything derived from it
      // inherits that — the rows, the children, and whoever walks them.
      const made: Value[] = [];
      for (let at = 0; at < length; at++) {
        made.push(map(null, at));
      }
      return made;
    },
  },
  Math: {
    PI: Math.PI,
    E: Math.E,
    abs: (x: Value) => Math.abs(x as number),
    ceil: (x: Value) => Math.ceil(x as number),
    floor: (x: Value) => Math.floor(x as number),
    fround: (x: Value) => Math.fround(x as number),
    max: (...values: Value[]) => Math.max(...(values as number[])),
    min: (...values: Value[]) => Math.min(...(values as number[])),
    random: () => Math.random(),
    round: (x: Value) => Math.round(x as number),
    sign: (x: Value) => Math.sign(x as number),
    sqrt: (x: Value) => Math.sqrt(x as number),
    trunc: (x: Value) => Math.trunc(x as number),
  },
};

// Reads a value the language guarantees is boolean: a condition, or an operand
// of `&&`/`||`. The compiler rejects anything else — `cs.condition` exists to
// remove truthiness, and `non-boolean-condition`, `non-boolean-operand`,
// `nested-non-boolean-operand` and `ternary-condition` pin it — so this fires
// only on a bundle no toolchain produced.
//
// It is the interpreter's one runtime type check, and the one thing `load`
// could never take over: whether an operand is boolean is a property of what an
// expression evaluated to, not of the bundle's shape. Checking beats borrowing
// JavaScript's falsiness, which would quietly accept `0` and `""` and give a
// reference implementation the wrong rule to port.
function condition(value: Value, what: string): boolean {
  if (value === true || value === false) {
    return value;
  }
  throw new Error(
    `${what} must be \`true\` or \`false\`: this language has no truthiness, ` +
      `and this bundle produced ${JSON.stringify(value) ?? typeof value}.`,
  );
}

// The `=` half of `BundleBinaryExpressionNode`, whose left is an identifier. A predicate
// rather than a comparison at the use site: the field is reached by a computed
// key, which TypeScript won't narrow a union through on its own.
function isAssignment(
  node: BundleBinaryExpressionNode,
): node is Extract<
  BundleBinaryExpressionNode,
  { [NodeField.operatorToken]: "=" }
> {
  return node[NodeField.operatorToken] === "=";
}

function compileBinop(
  // Every operator but `=`, which assigns rather than combining two values and
  // is answered where the node is read.
  operator: Exclude<BundleBinaryOperator, "=">,
  left: Compiled,
  right: Compiled,
): Compiled {
  // The logical operators evaluate their right operand lazily, and both
  // operands are boolean — so `&&` and `||` yield one. Checking only the left
  // would still branch correctly and then return whatever the right side was,
  // letting a non-boolean leak out as the result.
  //
  // `??` is the exception at both ends: it asks whether a value is absent, not
  // whether it is false, so either side may be any value.
  switch (operator) {
    case "&&":
      return (scope) =>
        condition(left(scope), "the left operand of `&&`")
          ? condition(right(scope), "the right operand of `&&`")
          : false;
    case "||":
      return (scope) =>
        condition(left(scope), "the left operand of `||`")
          ? true
          : condition(right(scope), "the right operand of `||`");
    case "??":
      return (scope) => {
        const value = left(scope);
        return value !== null ? value : right(scope);
      };
    case "+":
      // Two numbers add; a string on either side concatenates. Written out
      // because the cast the other arithmetic uses would be a lie here: it
      // erases, and JavaScript's `+` then does whichever the operands imply.
      // A client not written in JavaScript has to make the same choice, so the
      // choice belongs in the open.
      return (scope) => {
        const a = left(scope);
        const b = right(scope);
        if (typeof a === "number" && typeof b === "number") {
          return a + b;
        }
        if (typeof a === "string" || typeof b === "string") {
          return `${a as string | number}${b as string | number}`;
        }
        throw new Error(
          "`+` adds two numbers or concatenates with a string; this bundle " +
            `produced ${typeof a} + ${typeof b}.`,
        );
      };
    case "-":
      return (scope) => (left(scope) as number) - (right(scope) as number);
    case "*":
      return (scope) => (left(scope) as number) * (right(scope) as number);
    case "/":
      return (scope) => (left(scope) as number) / (right(scope) as number);
    case "%":
      return (scope) => (left(scope) as number) % (right(scope) as number);
    case "===":
      return (scope) => left(scope) === right(scope);
    case "!==":
      return (scope) => left(scope) !== right(scope);
    case "<":
      return (scope) => (left(scope) as number) < (right(scope) as number);
    case "<=":
      return (scope) => (left(scope) as number) <= (right(scope) as number);
    case ">":
      return (scope) => (left(scope) as number) > (right(scope) as number);
    case ">=":
      return (scope) => (left(scope) as number) >= (right(scope) as number);
  }
  // No `default`: the switch covers `BundleBinaryOperator`, so adding an
  // operator to the format is a compile error here rather than a throw at
  // evaluation.
  operator satisfies never;
  throw new Error(`unknown operator ${operator as string}`);
}
