// The wire tags only. `@backtickjs/core` re-exports these, but reaching them
// that way pulls the bundler and `node:async_hooks` into the graph, which a
// browser cannot load. This subpath is the format module alone, and it
// imports nothing.
import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleApply,
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
import {
  createMemo,
  createRenderEffect,
  createRoot,
  createSignal,
} from "solid-js/dist/solid.js";
import { Element } from "./Element.js";
import type { Value } from "./Value.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's
// `root` against its `functions` and `trees` tables and returns the resulting
// JavaScript value — an `Element` tree for a JSX client — so a host can render
// it, and tests can observe runtime behavior rather than only snapshotting
// shape.

/**
 * What a write did, as the host is told about it.
 *
 * `shape` says the tree is not the shape it was — read it again and draw the
 * difference. `prop` says one value on one element is different and nothing
 * else is, which a host can answer with one attribute rather than a walk.
 *
 * One channel rather than two, because a client that can only redraw stays
 * correct by redrawing on everything, and one that can do better needs nothing
 * beyond this to know when.
 */
export type Change =
  | { readonly kind: "shape" }
  | {
      readonly kind: "prop";
      readonly element: Element;
      readonly prop: string;
      readonly value: Value;
    };

// Who to tell — set while an evaluation or a re-render is in flight, and
// captured by each instance created during it, so two mounts in one process
// tell their own hosts rather than the last one to start. Ambient rather than
// threaded because every instance is created deep inside the evaluation, and
// only this one thing needs to reach them.
let notifying: ((change: Change) => void) | null = null;

// The hosts to tell that something moved, while a write is landing.
//
// A write is one change as far as a host is concerned: it re-reads the tree and
// draws the difference, and the difference is the same however many contents
// ran to produce it. The graph re-runs each reader on its own — which is the
// point of it, and why a cell a hundred instances read is a hundred re-runs
// rather than one re-render of their parent — so what the host is told is
// gathered here and said once at the end.
let moved: Set<(change: Change) => void> | null = null;

function whileNotifying<T>(
  notify: ((change: Change) => void) | null,
  run: () => T,
): T {
  const previous = notifying;
  notifying = notify;
  try {
    return run();
  } finally {
    notifying = previous;
  }
}

export function evaluate(
  bundle: Bundle,
  onChange?: (change: Change) => void,
): Value {
  // An owner for whatever the root builds outside any instance — an element at
  // the root has props like any other, and each is an effect. Nothing is
  // handed back to drop it with: a mount lasts as long as whoever asked for it,
  // and there is no unmounting this to be the other half of.
  return createRoot(() =>
    whileNotifying(onChange ?? null, () =>
      evaluateExpr(bundle, bundle.root, []),
    ),
  );
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
  readonly cells: Map<string, [() => Value, (value: Value) => void]>;
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
  readonly children: Map<BundleApplyTree, Children>;
  // How many times each `apply` has been reached in the render under way.
  // Cleared when one starts, so the nth evaluation finds the nth instance again.
  readonly visits: Map<BundleApplyTree, number>;
  // The host that mounted this instance, captured when it was created — a
  // child created during a later re-render inherits it the same way.
  readonly notify: ((change: Change) => void) | null;
  // The closures this instance's calls produced, per call node and per how many
  // times that node was reached — a call inside a loop makes one per row. A
  // call reached again with the same arguments hands back the same function,
  // because a closure over the same values behaves the same way and being a
  // different object is the only thing that would say otherwise.
  readonly closures: Map<BundleApply, { args: Value[]; value: Value }[]>;
  readonly calls: Map<BundleApply, number>;
  // The handle each of this instance's cells is read through, made with the
  // instance because the cells a tree declares are known before it runs. One
  // per cell for its life: a handle is a view onto storage and holds nothing of
  // its own, so a second view of the same cell would only look like a different
  // value to anything comparing them.
  readonly handles: Map<string, Value>;
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
    cells: new Map(),
    content: () => null,
    dispose: () => {},
    children: new Map(),
    visits: new Map(),
    notify: notifying,
    closures: new Map(),
    calls: new Map(),
    handles: new Map(),
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
      instance.cells.set(
        name,
        createSignal<Value>(evaluateExpr(bundle, initial, [])),
      );
      instance.handles.set(name, cellHandle(instance, name));
    }
    instance.content = createMemo<Element | null, undefined>((previous) => {
      const rendered = render(instance);
      // The first run is this instance being built, and nobody has been handed
      // it to be told about. Every run after is a structural change by
      // definition — the content re-ran, so what it draws is not what it drew.
      if (previous !== undefined && instance.notify !== null) {
        moved?.add(instance.notify);
      }
      return rendered;
    }, undefined);
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
  instance.visits.clear();
  instance.calls.clear();
  // Under this instance's host, so a child instantiated for the first time
  // during a re-render notifies the same one rather than nothing.
  const rendered = whileNotifying(
    instance.notify,
    () =>
      evaluateExpr(
        instance.bundle,
        instance.tree[NodeField.content],
        instance.slots(),
        null,
        instance,
        instance.element,
      ) as Element | null,
  );
  // An apply this render never reached draws nothing now, so the instances it
  // was holding are dropped. Rotating them only on a visit would keep a
  // thousand rows alive through a table that was cleared, and pay for them
  // again on every render after that.
  for (const [node, group] of instance.children) {
    if (!instance.visits.has(node)) {
      instance.children.delete(node);
      for (const child of group.claimed.values()) child.dispose();
      for (const child of group.left.values()) child.dispose();
    }
  }
  // The applied key wins over whatever the content named itself: the content is
  // one element among an instance's own, and the key is about the instance.
  if (rendered !== null && instance.key !== null) {
    rendered.key = instance.key;
  }
  instance.element = rendered;
  return rendered;
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
    const held = instance.cells.get(name);
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
  // And writing is writing: every prop that read this cell recomputes here and
  // says so as one attribute, every content that read it runs again and says so
  // as one tree to re-read. Both happen before this returns. A write inside a
  // write — a handler that sets two cells — is still the one change, told at
  // the end of the outermost.
  const write = (value: Value): Value => {
    const outer = moved;
    const told = outer ?? new Set<(change: Change) => void>();
    moved = told;
    try {
      cell()[1](() => value);
    } finally {
      moved = outer;
    }
    if (outer === null) {
      for (const notify of told) {
        notify({ kind: "shape" });
      }
    }
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

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
interface Scope {
  parent: Scope | null;
  bindings: Map<string, Value>;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let frame = scope; frame !== null; frame = frame.parent) {
    if (frame.bindings.has(name)) {
      return frame;
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

// Computes one prop of one element, and recomputes it whenever a cell it read
// is written — the whole of what a prop depends on, declared by reading it and
// written down nowhere. Nested inside the content that built it, so this is
// also what tells a prop's reads from a structural one: a cell read here has an
// attribute to change into its new value, and a cell read by the content
// decided which elements exist, and only the second re-runs a render.
//
// The first run only stores, because the element is being built and nobody has
// been handed it to be told about. Every run after is a write landing, and says
// so only where the value is actually different.
function bindProp(
  bundle: Bundle,
  built: Element,
  prop: string,
  expr: BundleExpr,
  slots: Value[],
  instance: Instance | null,
): void {
  createRenderEffect((first: boolean) => {
    const value = evaluateExpr(bundle, expr, slots, null, instance);
    if (first) {
      built.props[prop] = value;
      return false;
    }
    if (built.props[prop] === value) {
      return false;
    }
    built.props[prop] = value;
    instance?.notify?.({ kind: "prop", element: built, prop, value });
    return false;
  }, true);
}

// An inline element renders in its enclosing instance: it is part of that entry,
// so it reads the same slots and the same cells.
function evaluateElement(
  bundle: Bundle,
  element: BundleElement,
  slots: Value[],
  instance: Instance | null = null,
  reuse: Element | null = null,
): Element {
  // An absent key is no key, exactly as a null one was — the wire omits it
  // rather than spelling it out.
  const elementKey = element[NodeField.key];
  const key =
    elementKey === undefined
      ? null
      : (evaluateExpr(bundle, elementKey, slots, null, instance) as
          | string
          | number
          | null);
  const props: { [prop: string]: Value } = {};
  // The same element, rendering again — recognised by having come from this
  // same part of the bundle. Written into rather than replaced, so everything
  // holding it sees the new values and nothing has to be told that the one it
  // holds was swapped for another.
  const again = reuse !== null && reuse.shape === element;
  const built = again
    ? reuse
    : new Element(element[NodeField.id], key, props, element);
  built.key = key;
  // Before the props are computed, because each is computed by an effect that
  // writes where it belongs — and where it belongs is this element's props,
  // whichever object those are now.
  built.props = props;
  for (const [prop, expr] of Object.entries(element[NodeField.props] ?? {})) {
    // Children are structure, not an attribute. A cell read while working out
    // what an element contains decides which elements exist, and no amount of
    // recomputing one value can express that — so it is read outside a prop,
    // which marks the cell as one a write has to re-render.
    if (prop === "children") {
      props[prop] = evaluateExpr(bundle, expr, slots, null, instance);
      continue;
    }
    bindProp(bundle, built, prop, expr, slots, instance);
  }
  return built;
}

// A tree expression (also the root): plain JSON carries itself; the
// `#`-discriminated nodes compose. Bundling rejects plain data carrying
// `#` — the bundle's one reserved key — so the node reading is
// unambiguous.
function evaluateExpr(
  bundle: Bundle,
  expr: BundleExpr,
  slots: Value[],
  env: Scope | null = null,
  // The enclosing instance, when there is one: what `cell` resolves against, and
  // what a nested `apply` keys its child instance under.
  instance: Instance | null = null,
  // The element to render into, where this is an instance rendering again. Only
  // its own content reaches this: everything nested is evaluated afresh, which
  // is why it is not threaded any further down.
  reuse: Element | null = null,
): Value {
  if (expr === null || typeof expr !== "object") {
    return expr;
  }
  if (Array.isArray(expr)) {
    return expr.map((element) =>
      evaluateExpr(bundle, element, slots, env, instance),
    );
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
        return slots[form[NodeField.index]];
      }
      case NodeKind.GetState: {
        // A cell is declared by the enclosing entry, so it is only meaningful
        // inside an instance of it.
        if (instance === null) {
          throw new Error(
            `no instance to resolve state cell ${form[NodeField.name]}`,
          );
        }
        const handle = instance.handles.get(form[NodeField.name]);
        if (handle === undefined) {
          throw new Error(`unknown state cell ${form[NodeField.name]}`);
        }
        return handle;
      }
      case NodeKind.Identifier: {
        // A parameter of an enclosing thunk.
        const frame = lookup(env, form[NodeField.text]);
        if (frame === null) {
          throw new Error(`unknown identifier ${form[NodeField.name]}`);
        }
        return frame.bindings.get(form[NodeField.name]) ?? null;
      }
      // An entry named rather than applied: the function it evaluates to, which
      // is what a hole handing over nothing would have called.
      case NodeKind.GetFunction: {
        return getFunction(bundle, form[NodeField.label]);
      }
      case NodeKind.ApplyFunction: {
        const args = (form[NodeField.arguments] ?? []).map((arg) =>
          evaluateExpr(bundle, arg, slots, env, instance),
        );
        const value = getFunction(bundle, form[NodeField.label])(...args);
        // Only a closure is held on to. A call that computed anything else may
        // read a cell or an instance's storage, and answering it from last time
        // would be answering a question that wasn't asked.
        if (instance === null || typeof value !== "function") {
          return value;
        }
        const seen = instance.calls.get(form) ?? 0;
        instance.calls.set(form, seen + 1);
        let made = instance.closures.get(form);
        if (made === undefined) {
          made = [];
          instance.closures.set(form, made);
        }
        const previous = made[seen];
        if (previous !== undefined && same(previous.args, args)) {
          return previous.value;
        }
        made[seen] = { args, value };
        return value;
      }
      case NodeKind.ApplyTree: {
        const label = form[NodeField.label];
        const args = (form[NodeField.arguments] ?? []).map((arg) =>
          evaluateExpr(bundle, arg, slots, env, instance),
        );
        const applied = form[NodeField.key];
        const key =
          applied === undefined
            ? null
            : (evaluateExpr(bundle, applied, slots, env, instance) as
                | string
                | number
                | null);
        // Outside an instance there is nothing to persist against, so the
        // entry applies as a plain function.
        if (instance === null) {
          const tree = bundle.trees[label];
          if (tree === undefined) {
            throw new Error(`unknown tree entry ${label}`);
          }
          return instantiate(bundle, tree, args, key).content();
        }
        const tree = bundle.trees[label];
        if (tree === undefined) {
          throw new Error(`unknown tree entry ${label}`);
        }
        // A nested instance persists across the parent's re-renders. A keyed
        // one is found by its key wherever it moved to; an unkeyed one by which
        // evaluation of this node it was, because a node inside a loop is
        // reached once per iteration and position is all that tells them apart.
        const seen = instance.visits.get(form) ?? 0;
        instance.visits.set(form, seen + 1);
        let siblings = instance.children.get(form);
        if (siblings === undefined) {
          siblings = { claimed: new Map(), left: new Map() };
          instance.children.set(form, siblings);
        }
        // The first visit of a render starts a new claim on this node's
        // instances; whatever the last render left and nobody asks for again is
        // dropped with the map it was in.
        if (seen === 0) {
          siblings.left = siblings.claimed;
          siblings.claimed = new Map();
        }
        const under = key ?? seen;
        const child = siblings.left.get(under);
        if (child !== undefined) {
          child.key = key;
          siblings.claimed.set(under, child);
          // Handing it its arguments, which is the only way it is asked to draw
          // again. Equal ones are not a write and it stays exactly as it was —
          // the same element down to the objects, which is what lets a host
          // recognise it and stop there. What it read of somebody else's cell
          // is not this call's business: reading it below is what brings it up
          // to date, whatever made it stale.
          child.setSlots(args);
          return child.content();
        }
        const created = instantiate(bundle, tree, args, key);
        siblings.claimed.set(under, created);
        return created.content();
      }
      case NodeKind.Thunk: {
        const params = form[NodeField.parameters];
        if (!params || params.length === 0) {
          return () =>
            evaluateExpr(
              bundle,
              form[NodeField.expression],
              slots,
              env,
              instance,
            );
        }
        // The hole call supplies the entry-scoped bindings the splice
        // captures, one value per parameter, over the enclosing frame.
        return (...args: Value[]) => {
          const frame: Scope = { parent: env, bindings: new Map() };
          params.forEach((param, index) => {
            frame.bindings.set(param[NodeField.name], args[index]);
          });
          return evaluateExpr(
            bundle,
            form[NodeField.expression],
            slots,
            frame,
            instance,
          );
        };
      }
      case NodeKind.Element: {
        return evaluateElement(bundle, form, slots, instance, reuse);
      }
    }
  }
  const object: { [key: string]: Value } = {};
  for (const [key, value] of Object.entries(expr)) {
    // The index admits `undefined` only so the reserved `#` can be excluded
    // from it (see `BundleData`); parsed JSON never carries one.
    object[key] = evaluateExpr(
      bundle,
      value as BundleExpr,
      slots,
      env,
      instance,
    );
  }
  return object;
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

function executeStatement(
  bundle: Bundle,
  node: BundleStatementNode,
  scope: Scope,
): Completion {
  if (!isNode(node)) {
    // Plain JSON in statement position is an expression evaluated for its
    // effect.
    evaluateNode(bundle, node, scope);
    return advanced;
  }
  switch (node["#"]) {
    case NodeKind.Block: {
      const frame: Scope = { parent: scope, bindings: new Map() };
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward.
      for (const statement of node[NodeField.statements] ?? []) {
        if (
          isNode(statement) &&
          statement["#"] === NodeKind.VariableDeclaration
        ) {
          frame.bindings.set(statement[NodeField.name], null);
        }
      }
      for (const statement of node[NodeField.statements] ?? []) {
        const completion = executeStatement(bundle, statement, frame);
        // A jump of any kind leaves the block; what catches it is further out.
        if (completion.kind !== "advanced") {
          return completion;
        }
      }
      return advanced;
    }
    case NodeKind.VariableDeclaration: {
      scope.bindings.set(
        node[NodeField.name],
        evaluateNode(bundle, node[NodeField.initializer], scope),
      );
      return advanced;
    }
    case NodeKind.IfStatement: {
      if (
        condition(
          evaluateNode(bundle, node[NodeField.expression], scope),
          "an `if`",
        )
      ) {
        return executeStatement(bundle, node[NodeField.thenStatement], scope);
      }
      if (node[NodeField.elseStatement] !== null) {
        return executeStatement(bundle, node[NodeField.elseStatement], scope);
      }
      return advanced;
    }
    case NodeKind.WhileStatement: {
      let turns = 0;
      while (
        condition(
          evaluateNode(bundle, node[NodeField.expression], scope),
          "a `while`",
        )
      ) {
        const completion = executeStatement(
          bundle,
          node[NodeField.statement],
          scope,
        );
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
    }
    case NodeKind.ForStatement: {
      // The header binding lives in a scope of the loop's own, so it is gone
      // once the loop is.
      let frame: Scope = { parent: scope, bindings: new Map() };
      const init = node[NodeField.initializer];
      if (init !== null) {
        executeStatement(bundle, init, frame);
      }
      let turns = 0;
      for (;;) {
        const test = node[NodeField.condition];
        if (
          test !== null &&
          !condition(evaluateNode(bundle, test, frame), "a `for`")
        ) {
          return advanced;
        }
        const completion = executeStatement(
          bundle,
          node[NodeField.statement],
          frame,
        );
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
        frame = { parent: scope, bindings: new Map(frame.bindings) };
        const update = node[NodeField.incrementor];
        if (update !== null) {
          executeStatement(bundle, update, frame);
        }
        guardTurns((turns += 1), "for");
      }
    }
    case NodeKind.BreakStatement: {
      return broke;
    }
    case NodeKind.ContinueStatement: {
      return continued;
    }
    case NodeKind.ReturnStatement: {
      return {
        kind: "returned",
        value: evaluateNode(bundle, node[NodeField.expression], scope),
      };
    }
    case NodeKind.ThrowStatement: {
      throw evaluateNode(bundle, node[NodeField.expression], scope);
    }
    case NodeKind.TryStatement: {
      try {
        return executeStatement(bundle, node[NodeField.tryBlock], scope);
      } catch (thrown) {
        // The catch binding scopes over the clause's block only, like an arrow
        // parameter over its body.
        const clause = node[NodeField.catchClause];
        const frame: Scope = { parent: scope, bindings: new Map() };
        const caught = clause[NodeField.variableDeclaration];
        if (caught !== null) {
          frame.bindings.set(caught, thrown as Value);
        }
        return executeStatement(bundle, clause[NodeField.block], frame);
      }
    }
    default: {
      // Every remaining kind is an expression, evaluated for its effect.
      evaluateNode(bundle, node, scope);
      return advanced;
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
  if (!isNode(node)) {
    if (node === null || typeof node !== "object") {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((element) => evaluateNode(bundle, element, scope));
    }
    const object: { [key: string]: Value } = {};
    for (const [key, value] of Object.entries(node)) {
      object[key] = evaluateNode(bundle, value as BundleExpressionNode, scope);
    }
    return object;
  }
  switch (node["#"]) {
    case NodeKind.Identifier: {
      const frame = lookup(scope, node[NodeField.text]);
      if (frame === null) {
        throw new Error(`unknown identifier ${node[NodeField.text]}`);
      }
      return frame.bindings.get(node[NodeField.name]) ?? null;
    }
    case NodeKind.GetFunction: {
      return getFunction(bundle, node[NodeField.label]);
    }
    case NodeKind.GetTree: {
      return getTree(bundle, node[NodeField.label]);
    }
    // A script instantiating a keyed entry. There is no enclosing instance to
    // persist a child against here — a script builds its rows fresh on each
    // read — so this names the element it produces and leaves matching them up
    // to whoever renders them.
    case NodeKind.ApplyTree: {
      const label = node[NodeField.label];
      const tree = bundle.trees[label];
      if (tree === undefined) {
        throw new Error(`unknown tree entry ${label}`);
      }
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        evaluateNode(bundle, arg, scope),
      );
      const applied = node[NodeField.key];
      const key =
        applied === undefined
          ? null
          : (evaluateNode(bundle, applied, scope) as string | number | null);
      return instantiate(bundle, tree, args, key).content();
    }
    case NodeKind.CallExpression: {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // The receiver evaluates before the arguments; an optional receiver
      // (`a?.b(…)`) short-circuits a null object to null, arguments
      // unevaluated.
      const callee = node[NodeField.expression];
      if (isNode(callee) && callee["#"] === NodeKind.PropertyAccessExpression) {
        const object = evaluateNode(
          bundle,
          callee[NodeField.expression],
          scope,
        ) as {
          [name: string]: Value;
        };
        if (callee[NodeField.questionDotToken] && object === null) {
          return null;
        }
        const method = object[callee[NodeField.name]];
        // An optional call (`a.b?.(…)`) short-circuits a null method the
        // same way, arguments unevaluated.
        if (node[NodeField.questionDotToken] && method === null) {
          return null;
        }
        if (typeof method !== "function") {
          throw new Error(`${callee[NodeField.name]} is not a function`);
        }
        const args = (node[NodeField.arguments] ?? []).map((arg) =>
          evaluateNode(bundle, arg, scope),
        );
        return method.apply(object, args);
      }
      // The callee evaluates before the arguments; an optional call
      // (`cb?.(…)`) short-circuits a null callee to null, arguments
      // unevaluated.
      const value = evaluateNode(bundle, callee, scope);
      if (node[NodeField.questionDotToken] && value === null) {
        return null;
      }
      if (typeof value !== "function") {
        throw new Error("callee is not a function");
      }
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        evaluateNode(bundle, arg, scope),
      );
      return value(...args);
    }
    case NodeKind.PropertyAccessExpression: {
      const object = evaluateNode(
        bundle,
        node[NodeField.expression],
        scope,
      ) as {
        [name: string]: Value;
      };
      if (node[NodeField.questionDotToken] && object === null) {
        return null;
      }
      // An absent member reads as null — the language's absent value;
      // `undefined` never arises.
      return object[node[NodeField.name]] ?? null;
    }
    case NodeKind.ElementAccessExpression: {
      const target = evaluateNode(bundle, node[NodeField.expression], scope);
      const key = evaluateNode(
        bundle,
        node[NodeField.argumentExpression],
        scope,
      );
      if (Array.isArray(target)) {
        // An array is reached by whole numbers in range; everything else about
        // it — a fractional key, a string one, one past either end — is a place
        // the array has nothing, which reads as null.
        return typeof key === "number" &&
          Number.isInteger(key) &&
          key >= 0 &&
          key < target.length
          ? (target[key] ?? null)
          : null;
      }
      // An object is reached by the names it holds itself: an inherited one
      // (`toString`) is not a member of the value, so it reads as absent
      // rather than handing back something from the host's prototypes.
      if (target !== null && typeof target === "object") {
        return typeof key === "string" &&
          Object.prototype.hasOwnProperty.call(target, key)
          ? ((target as { [name: string]: Value })[key] ?? null)
          : null;
      }
      return null;
    }
    case NodeKind.BinaryExpression: {
      if (isAssignment(node)) {
        // An assignment, which is a binary expression here as it is in
        // TypeScript. The left is a name to bind, never a value to read, so it
        // is the one operand that isn't evaluated.
        const name = node[NodeField.left][NodeField.text];
        const value = evaluateNode(bundle, node[NodeField.right], scope);
        const frame = lookup(scope, name);
        if (frame === null) {
          throw new Error(`unknown assignment target ${name}`);
        }
        frame.bindings.set(name, value);
        // An assignment evaluates to the value assigned, as in JavaScript; in
        // statement position nothing reads it.
        return value;
      }
      return evaluateBinop(
        bundle,
        node[NodeField.operatorToken],
        node[NodeField.left],
        node[NodeField.right],
        scope,
      );
    }
    case NodeKind.PrefixUnaryExpression: {
      const operand = evaluateNode(bundle, node[NodeField.operand], scope);
      // A `!` operand is boolean, as a tested position always is, so this
      // negates rather than deciding what counts as true. A `-` operand is a
      // number, checked by the compiler as arithmetic everywhere else is.
      return node[NodeField.operator] === "-"
        ? -(operand as number)
        : !condition(operand, "the operand of `!`");
    }
    case NodeKind.ConditionalExpression: {
      // Only the taken branch evaluates.
      const taken = condition(
        evaluateNode(bundle, node[NodeField.condition], scope),
        "a ternary condition",
      );
      if (taken) {
        return evaluateNode(bundle, node[NodeField.whenTrue], scope);
      }
      return evaluateNode(bundle, node[NodeField.whenFalse], scope);
    }
    case NodeKind.ArrowFunction: {
      return (...args: Value[]) => {
        const frame: Scope = { parent: scope, bindings: new Map() };
        // A missing argument binds as null — the language's absent value;
        // `undefined` never arises (an omitted optional parameter reads
        // as null).
        (node[NodeField.parameters] ?? []).forEach((param, index) => {
          frame.bindings.set(
            param[NodeField.name],
            index < args.length ? args[index] : null,
          );
        });
        const body = node[NodeField.body];
        if (isNode(body) && body["#"] === NodeKind.Block) {
          const completion = executeStatement(bundle, body, frame);
          if (completion.kind === "break" || completion.kind === "continue") {
            // The compiler rejects a jump with no loop to catch it, so one
            // reaching here means the bundle was not written by it.
            throw new Error(
              `A \`${completion.kind}\` in this bundle escaped its loop.`,
            );
          }
          return completion.kind === "returned" ? completion.value : null;
        }
        // A non-block body is an expression, implicitly returned.
        return evaluateNode(bundle, body as BundleExpressionNode, frame);
      };
    }
  }
}

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

function evaluateBinop(
  bundle: Bundle,
  // Every operator but `=`, which assigns rather than combining two values and
  // is answered where the node is read.
  operator: Exclude<BundleBinaryOperator, "=">,
  leftNode: BundleExpressionNode,
  rightNode: BundleExpressionNode,
  scope: Scope | null,
): Value {
  const left = evaluateNode(bundle, leftNode, scope);
  // The logical operators evaluate their right operand lazily, and both
  // operands are boolean — so `&&` and `||` yield one. Checking only the left
  // would still branch correctly and then return whatever the right side was,
  // letting a non-boolean leak out as the result.
  //
  // `??` is the exception at both ends: it asks whether a value is absent, not
  // whether it is false, so either side may be any value.
  switch (operator) {
    case "&&": {
      if (!condition(left, "the left operand of `&&`")) {
        return false;
      }
      const right = evaluateNode(bundle, rightNode, scope);
      return condition(right, "the right operand of `&&`");
    }
    case "||": {
      if (condition(left, "the left operand of `||`")) {
        return true;
      }
      const right = evaluateNode(bundle, rightNode, scope);
      return condition(right, "the right operand of `||`");
    }
    case "??": {
      if (left !== null) {
        return left;
      }
      return evaluateNode(bundle, rightNode, scope);
    }
    default:
      break;
  }
  const right = evaluateNode(bundle, rightNode, scope);
  switch (operator) {
    case "+": {
      // Two numbers add; a string on either side concatenates. Written out
      // because the cast the other arithmetic uses would be a lie here: it
      // erases, and JavaScript's `+` then does whichever the operands imply.
      // A client not written in JavaScript has to make the same choice, so the
      // choice belongs in the open.
      if (typeof left === "number" && typeof right === "number") {
        return left + right;
      }
      if (typeof left === "string" || typeof right === "string") {
        return `${left as string | number}${right as string | number}`;
      }
      throw new Error(
        "`+` adds two numbers or concatenates with a string; this bundle " +
          `produced ${typeof left} + ${typeof right}.`,
      );
    }
    case "-":
      return (left as number) - (right as number);
    case "*":
      return (left as number) * (right as number);
    case "/":
      return (left as number) / (right as number);
    case "%":
      return (left as number) % (right as number);
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    case "<":
      return (left as number) < (right as number);
    case "<=":
      return (left as number) <= (right as number);
    case ">":
      return (left as number) > (right as number);
    case ">=":
      return (left as number) >= (right as number);
  }
  // No `default`: the switch covers `BundleBinaryOperator`, so adding an
  // operator to the format is a compile error here rather than a throw at
  // evaluation.
  operator satisfies never;
}
